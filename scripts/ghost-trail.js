import { SmartFinder } from "./pathfinding.js";

export class GhostTrail {
    constructor() {
        this.modId = "phils-pf2e-action-colours";
        // Store state by Token ID to survive Token redraws
        // Map<string, { history: Array, graphics: PIXI.Graphics, timer: number, decayInterval: number }>
        this.states = new Map();

        // Track tokens currently moving via Ruler to prevent double-recording in hooks
        this.activeRulerMoves = new Set();
    }

    init() {
        const wrapperId = this.modId;

        // Expose API for the wrapper to call
        game.modules.get(this.modId).api = this;

        // 1. Socket Listener (Sync)
        game.socket.on(`module.${this.modId}`, (data) => {
            if (data.type === "trail" && data.tokenId && data.path) {
                const token = canvas.tokens.get(data.tokenId);
                if (token) {
                    this._addToHistory(token, data.path, false);
                    // Remote trails are drawn immediately (no animation to wait for)
                    this._drawGhost(token);
                    this._resetTimeout(token);
                }
            }
        });

        // 2. Hooks
        Hooks.on("preUpdateToken", this._onPreUpdateToken.bind(this));
        Hooks.on("updateToken", this._onUpdateToken.bind(this)); // Added

        // Combat management
        Hooks.on("updateCombat", this._onUpdateCombat.bind(this));
        Hooks.on("deleteCombat", this._onDeleteCombat.bind(this));

        // Hover
        Hooks.on("hoverToken", this._onHoverToken.bind(this));
        // Control (Select)
        Hooks.on("controlToken", (token, controlled) => {
            this._refreshGhost(token);
        });

        // Clean up when token is deleted
        Hooks.on("deleteToken", (doc) => {
            this._clearTokenData(doc.id);
        });

        // 3. Wrappers
        if (game.modules.get("lib-wrapper")?.active) {
            // A. Ruler Wrapper (Measurement)
            const RulerClass = CONFIG.Canvas.rulerClass;
            if (RulerClass && RulerClass.prototype && RulerClass.prototype.moveToken) {
                try {
                    libWrapper.register(wrapperId, "CONFIG.Canvas.rulerClass.prototype.moveToken", this._wrapRulerMoveToken, "WRAPPER");
                } catch (e) { console.error("GhostTrail: Ruler wrapper failed", e); }
            }
        }

        // Mark as active since we use polling now, fallback logic is redundant but safe
        this.deferredVisibilityActive = true;
    }

    // --- STATE MANAGEMENT ---
    _getState(tokenId) {
        if (!this.states.has(tokenId)) {
            this.states.set(tokenId, {
                history: [],
                graphics: null,
                timer: null,
                decayInterval: null
            });
        }
        return this.states.get(tokenId);
    }

    _clearTokenData(tokenId) {
        if (this.states.has(tokenId)) {
            const state = this.states.get(tokenId);
            if (state.timer) clearTimeout(state.timer);
            if (state.decayInterval) clearInterval(state.decayInterval);
            if (state.graphics) {
                state.graphics.clear();
                state.graphics.destroy();
            }
            this.states.delete(tokenId);
        }
    }

    _onUpdateToken(tokenDoc, changes, context, userId) {
        if (!changes.x && !changes.y) return;
        const token = tokenDoc.object;
        if (!token) return;

        // Wait for animation to finish then trigger "Arrival"
        this._waitForArrival(token);
    }

    async _waitForArrival(token) {
        // Simple poll for isAnimating
        // We wait up to 10s.
        const start = Date.now();
        while (token.isAnimating && (Date.now() - start < 10000)) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        this._onMovementEnd(token);
    }

    /**
     * Called when a token finishes moving (arrival).
     */
    _onMovementEnd(token) {
        if (!this._shouldRecord()) return;

        const state = this._getState(token.id);

        // 1. Make visible
        if (state.history.length > 0) {
            this._drawGhost(token);
        }

        // 2. Broadcast pending segments
        if (game.settings.get(this.modId, "ghostTrailShare")) {
            // We can broadcast the whole history or just new parts. 
            // Simplest: Broadcast everything that hasn't been sent? 
            // Actually, `_addToHistory` was refactored to broadcast immediately in my previous code.
            // I need to update `_addToHistory` to NOT broadcast yet.

            // For now, let's just emit the full current history as a sync package on arrival.
            // It's slightly more data but robust.
            game.socket.emit(`module.${this.modId}`, {
                type: "trail",
                tokenId: token.id,
                path: state.history
            });
        }

        // 3. Start Timeout (if applicable)
        this._resetTimeout(token);
    }

    /**
     * Wrap Ruler.moveToken to capture "Measured" moves.
     * context 'this' is the Ruler instance.
     */
    async _wrapRulerMoveToken(wrapped, ...args) {
        const api = game.modules.get("phils-pf2e-action-colours")?.api;

        // If API is missing or recording disabled, just pass through
        if (!api || !api._shouldRecord()) {
            return wrapped.apply(this, args);
        }

        // CAPTURE WAYPOINTS ROBUSTLY (Segments Backup)
        let capturedWaypoints = [];

        // 1. Try to reconstruct from visual segments (Most accurate to what user sees)
        if (this.segments && this.segments.length > 0) {
            // START point
            capturedWaypoints.push({ x: this.segments[0].ray.A.x, y: this.segments[0].ray.A.y });
            // ALL intermediate points
            for (const seg of this.segments) {
                capturedWaypoints.push({ x: seg.ray.B.x, y: seg.ray.B.y });
            }
        }

        // 2. Fallback to this.waypoints if segments missing
        if (capturedWaypoints.length < 2) {
            const raw = this.waypoints || [];
            capturedWaypoints = raw.map(w => ({ x: w.x, y: w.y }));
        }

        // 3. Fallback to args if all else fails
        if (capturedWaypoints.length < 2 && Array.isArray(args[0]) && args[0].length > 1) {
            capturedWaypoints = args[0].map(w => ({ x: w.x, y: w.y }));
        }

        let result;
        try {
            // Flag tokens to prevent _onPreUpdateToken from interfering (Redundant Double Check)
            const movingTokens = this.token ? [this.token] : canvas.tokens.controlled;
            movingTokens.forEach(t => {
                api.activeRulerMoves.add(t.id);
                t._ghostTrailBlocking = true;
            });

            // 1. Execute the move first!
            result = await wrapped.apply(this, args);

            // Unflag 
            movingTokens.forEach(t => {
                api.activeRulerMoves.delete(t.id);
                delete t._ghostTrailBlocking;
            });

            // 2. Compute the actual path taken
            // (movingTokens is already defined above)

            // Use CAPTURED waypoints
            if (capturedWaypoints.length > 1) {
                for (const token of movingTokens) {
                    // ALWAYS calculate the Smart Path if possible.
                    // This ensures we show the "Walked" path (Grid/A*) rather than the "Ruler" path (Straight Lines).
                    // This fixes the "Luftlinie" issue where users expected to see their token's steps.
                    const smartPath = api._getSmartPathFromWaypoints(capturedWaypoints, token);

                    if (smartPath && smartPath.length > 0) {
                        // OVERWRITE existing history (clears any "Straight Line" fallback added by _onPreUpdateToken)
                        // OVERWRITE existing history (clears any "Straight Line" fallback added by _onPreUpdateToken)
                        api._addToHistory(token, smartPath, true);
                    } else {
                        // Fallback: Use captured straight lines if Smart Finder fails
                        api._addToHistory(token, capturedWaypoints, true);
                    }

                    // FORCE DRAW: Since we blocked _onPreUpdateToken, the history logic was skipped during animation.
                    // We must manually trigger the "Arrival" logic now.
                    api._onMovementEnd(token);
                }
            }
        } catch (e) {
            console.error("GhostTrail: Wrapper error", e);
            // Ensure flag is cleared on error
            const errorTokens = this.token ? [this.token] : canvas.tokens.controlled;
            errorTokens.forEach(t => api.activeRulerMoves.delete(t.id));
        }
        return result;
    }

    /**
     * Calculates the full granular path between all waypoints using SmartFinder.
     * This creates a "Step-by-Step" trail instead of straight lines.
     */
    _getSmartPathFromWaypoints(waypoints, token) {
        if (!waypoints || waypoints.length < 2) return [];

        // Respect setting: If Smart Routing is disabled, return null (fallback to straight lines)
        const smartEnabled = game.settings.get("phils-pf2e-action-colours", "smartRouting");
        if (!smartEnabled) return null;

        const fullPath = [];
        // Add start
        fullPath.push({ x: waypoints[0].x, y: waypoints[0].y });

        const finder = new SmartFinder(token);

        for (let i = 0; i < waypoints.length - 1; i++) {
            const start = waypoints[i];
            const end = waypoints[i + 1];

            // If start and end are same, skip
            if (Math.hypot(start.x - end.x, start.y - end.y) < 1) continue;

            try {
                // Calculate A* path for this segment
                const segmentPath = finder.findPath({ x: start.x, y: start.y }, { x: end.x, y: end.y });

                if (segmentPath && segmentPath.length > 0) {
                    for (const p of segmentPath) {
                        fullPath.push({ x: p.x, y: p.y });
                    }
                } else {
                    // Segment failed? Just push end point (Straight line segment)
                    fullPath.push({ x: end.x, y: end.y });
                }
            } catch (e) {
                console.warn("GhostTrail: SmartFinder failed for segment", e);
                fullPath.push({ x: end.x, y: end.y });
            }
        }

        return fullPath;
    }

    /**
     * Traces the intended path segments. If a wall blocks movement between waypoints,
     * stops there and uses A* to find a valid path to the token's actual final position.
     */
    _getBlockedPath(waypoints, token) {
        if (!waypoints || waypoints.length < 2) return [{ x: token.x, y: token.y }];

        const newPath = [];
        // Always add start
        newPath.push({ x: waypoints[0].x, y: waypoints[0].y });

        const halfW = (token.w || 0) / 2;
        const halfH = (token.h || 0) / 2;

        let blockedAt = null;

        for (let i = 0; i < waypoints.length - 1; i++) {
            const A = waypoints[i];
            const B = waypoints[i + 1];

            const origin = { x: A.x + halfW, y: A.y + halfH };
            const dest = { x: B.x + halfW, y: B.y + halfH };

            const hasCollision = this._checkCollision(origin, dest);

            if (hasCollision) {
                // Collision! We stop at A.
                blockedAt = A;
                break;
            } else {
                // Path clear to B
                newPath.push({ x: B.x, y: B.y });
            }
        }

        // If we were blocked, bridge the gap with A*
        if (blockedAt) {
            // Start finding path from Last Valid Waypoint (blockedAt) to Token Final Pos
            const finder = new SmartFinder(token);
            // We use centers for simpler A* usually, but SmartFinder handles pixels
            const path = finder.findPath({ x: blockedAt.x, y: blockedAt.y }, { x: token.x, y: token.y });

            if (path && path.length > 0) {
                // Append the calculated path
                for (const p of path) {
                    newPath.push({ x: p.x, y: p.y });
                }
            } else {
                // Fallback: If A* fails, just connect to the token (rare)
                newPath.push({ x: token.x, y: token.y });
            }
        } else {
            // No block, just append final check
            const last = newPath[newPath.length - 1];
            if (Math.hypot(token.x - last.x, token.y - last.y) > 1) {
                newPath.push({ x: token.x, y: token.y });
            }
        }

        return newPath;
    }

    _checkCollision(p1, p2) {
        // Safe wrapper for collision
        if (typeof canvas === 'undefined' || !canvas.ready) return false;

        // V11/V12 Standard
        if (CONFIG.Canvas.polygonClass && CONFIG.Canvas.polygonClass.testCollision) {
            return CONFIG.Canvas.polygonClass.testCollision(p1, p2, { type: "move", mode: "any" });
        }
        // Fallback
        if (canvas.walls && canvas.walls.checkCollision) {
            return canvas.walls.checkCollision(new Ray(p1, p2), { type: "move", mode: "any" });
        }
        return false;
    }

    _onPreUpdateToken(tokenDoc, changes, context, userId) {
        if (!this._shouldRecord()) return;
        if (changes.x === undefined && changes.y === undefined) return;

        const token = tokenDoc.object;
        if (!token) return;

        if (token._ghostTrailBlocking) return;

        // Check 2: Centralized Set (if api available)
        if (this.activeRulerMoves.has(token.id)) return;

        // COOLDOWN CHECK (Global for this token)
        const state = this._getState(token.id);
        if (state.smartPathCooldown) {
            const now = Date.now();
            if (now < state.smartPathCooldown) {
                return;
            } else {
                // Clean up expired
                delete state.smartPathCooldown;
            }
        }

        // 1. Smart Routing Path (Drag & Drop Handling)
        if (token._lastSmartPath) {
            // Set Cooldown to prevent Fallback logic from polluting this move
            state.smartPathCooldown = Date.now() + 2000;

            // FORCE OVERWRITE to clear any prior garbage
            this._addToHistory(token, token._lastSmartPath, true);
            delete token._lastSmartPath;
            return;
        }

        // 2. CHECK EXISTING HISTORY
        if (state.history.length > 0) {
            const last = state.history[state.history.length - 1];
            const destX = changes.x ?? token.x;
            const destY = changes.y ?? token.y;

            if (Math.hypot(destX - last.x, destY - last.y) < 50) {
                return;
            }
        }

        // 3. FALLBACK: Straight line
        // CRITICAL CHECK: Are we cooling down from a Smart Path insertion?
        if (state.smartPathCooldown && Date.now() < state.smartPathCooldown) {
            return;
        }

        const start = { x: token.x, y: token.y };
        this._addToHistory(token, [start]);
    }

    _shouldRecord() {
        if (!game.settings.get(this.modId, "ghostTrail")) return false;
        const mode = game.settings.get(this.modId, "ghostTrailMode");
        if (mode === "combat" && !game.combat?.started) return false;
        return true;
    }

    _addToHistory(token, newPath, overwrite = false) {
        const state = this._getState(token.id);

        if (overwrite) {
            // Use length=0 to clear in-place, preserving references
            state.history.length = 0;
        }

        for (const p of newPath) {
            if (state.history.length > 0) {
                const last = state.history[state.history.length - 1];
                if (Math.hypot(p.x - last.x, p.y - last.y) < 10) continue;
            }
            const point = { x: p.x, y: p.y, alpha: 1.0 };
            state.history.push(point);
        }

        // CHECK: Is the Deferred Visibility wrapper active?
        // We use our internal flag set during init()
        const deferredActive = this.deferredVisibilityActive;

        // If Deferred Visibility is NOT active (or failed), we must draw/broadcast immediately 
        // to prevent invisible trails.
        if (!deferredActive) {
            this._drawGhost(token);
            this._resetTimeout(token);

            // Sync
            if (game.settings.get(this.modId, "ghostTrailShare")) {
                game.socket.emit(`module.${this.modId}`, {
                    type: "trail",
                    tokenId: token.id,
                    path: state.history
                });
            }
        }

        // Note: We DO NOT draw or broadcast here anymore. 
        // We wait for _onMovementEnd.
    }

    // --- TIMEOUT LOGIC ---
    _resetTimeout(token) {
        const state = this._getState(token.id);

        // Stop active decay/timer
        if (state.decayInterval) {
            clearInterval(state.decayInterval);
            state.decayInterval = null;
        }
        if (state.timer) {
            clearTimeout(state.timer);
            state.timer = null;
        }

        // Restore visibility (in case we were fading)
        if (state.history.length > 0) {
            state.history.forEach(p => p.alpha = 1.0);
            // Note: If we are moving, we might not want to draw yet?
            // But _resetTimeout is called on arrival. So yes, draw.
            this._drawGhost(token);
        }

        // COMBAT LOGIC: If in combat, DO NOT start timeout.
        const inCombat = game.combat?.started;
        const timeoutSec = Number(game.settings.get(this.modId, "ghostTrailTimeout"));

        if (inCombat) {
            // Keep trail indefinitely (until next turn)
            return;
        }

        // Out of combat: Use timeout
        if (timeoutSec > 0) {
            state.timer = setTimeout(() => {
                this._startDecay(token);
            }, timeoutSec * 1000);
        }
    }

    _startDecay(token) {
        const state = this._getState(token.id);
        if (state.decayInterval) clearInterval(state.decayInterval);
        state.decayInterval = null;

        const burnRate = 0.05;
        const context = 3;

        state.decayInterval = setInterval(() => {
            if (!this.states.has(token.id) || state.history.length === 0) {
                this._clearTokenData(token.id);
                return;
            }

            for (let i = 0; i < Math.min(context, state.history.length); i++) {
                state.history[i].alpha -= burnRate;
            }

            while (state.history.length > 0 && state.history[0].alpha <= 0) {
                state.history.shift();
            }

            if (state.history.length > 0) {
                this._drawGhost(token);
            } else {
                this._clearTokenData(token.id);
            }
        }, 50);
    }

    _onUpdateCombat(combat, updateData, context, userId) {
        if (!this._shouldRecord()) return;

        // Turn Management: Clear trail when a token starts its NEW turn.
        // We look at combat.combatant (the current turn taker).
        const combatant = combat.combatant;
        if (!combatant) return;

        const token = combatant.token?.object;
        if (token) {
            // If this token has a trail, it's from the PREVIOUS round/turn.
            // Clear it now so they have a fresh slate for this turn's move.
            this._clearTokenData(token.id);
        }
    }

    _onDeleteCombat() {
        // Clear all trails when combat ends
        for (const id of this.states.keys()) {
            this._clearTokenData(id);
        }
    }

    _onHoverToken(token, hovered) {
        if (!game.settings.get(this.modId, "ghostTrail")) return;

        // Only draw if we have history. 
        // Logic check: If in motion, history exists but is hidden.
        // But hover shouldn't reveal it prematurely? 
        // Token.animateMovement locks interaction often, so hover might not trigger.
        // Safe to just draw if state exists.
        if (hovered) this._drawGhost(token);
        else this._clearGhost(token);
    }


    _drawGhost(token) {
        // STRICT VISIBILITY: Only if Hovered OR Selected
        if (!token.hover && !token.controlled) {
            this._clearGhost(token);
            return;
        }

        const state = this._getState(token.id);
        if (!state || state.history.length === 0) return;

        const getCenter = (x, y) => {
            return {
                x: x + (token.w / 2),
                y: y + (token.h / 2)
            };
        };

        if (!state.graphics || state.graphics.destroyed) {
            state.graphics = new PIXI.Graphics();
            canvas.controls.addChild(state.graphics);
        }

        const g = state.graphics;
        g.clear();
        g.parentLayer = canvas.controls; // ensure layer

        const history = state.history;

        // Color support
        const speed = this._getActorSpeed(token) || 30;
        let cumulativeDist = 0;

        if (history.length > 0) {
            let prev = getCenter(history[0].x, history[0].y);

            for (let i = 1; i < history.length; i++) {
                const p = history[i];
                const curr = getCenter(p.x, p.y);

                // Calculate segment distance in game units (ft)
                const measurement = canvas.grid.measurePath([
                    { x: history[i - 1].x, y: history[i - 1].y },
                    { x: p.x, y: p.y }
                ]);
                const gridDist = measurement.distance;
                cumulativeDist += gridDist;

                const colorHex = this._pickColor(cumulativeDist, speed);
                const color = parseInt(colorHex.replace("#", ""), 16);

                const alpha1 = history[i - 1].alpha ?? 1.0;
                const alpha2 = p.alpha ?? 1.0;
                const segAlpha = Math.min(alpha1, alpha2) * 0.4;

                if (segAlpha > 0.01) {
                    g.lineStyle(4, color, segAlpha);
                    g.moveTo(prev.x, prev.y);
                    g.lineTo(curr.x, curr.y);
                }
                prev = curr;
            }

            const current = getCenter(token.x, token.y);
            const lastP = history[history.length - 1];
            if (lastP) {
                // Distance to current
                const measurement = canvas.grid.measurePath([
                    { x: lastP.x, y: lastP.y },
                    { x: token.x, y: token.y }
                ]);
                const finalDist = cumulativeDist + measurement.distance; // Speculative distance for the last segment

                const colorHex = this._pickColor(finalDist, speed);
                const color = parseInt(colorHex.replace("#", ""), 16);

                const lastAlpha = lastP.alpha ?? 1.0;
                const segAlpha = lastAlpha * 0.4;
                if (segAlpha > 0.01) {
                    g.lineStyle(4, color, segAlpha);
                    g.moveTo(prev.x, prev.y);
                    g.lineTo(current.x, current.y);
                }
            }

            g.lineStyle(0);

            // Re-calculate dist for dots to match lines
            let dotDist = 0;
            if (history.length > 0) {
                // First dot at 0
                const c = getCenter(history[0].x, history[0].y);
                const cHex = this._pickColor(0, speed);
                g.beginFill(parseInt(cHex.replace("#", ""), 16), (history[0].alpha ?? 1) * 0.4);
                g.drawCircle(c.x, c.y, 3);
                g.endFill();
            }

            for (let i = 1; i < history.length; i++) {
                const p = history[i];
                const m = canvas.grid.measurePath([
                    { x: history[i - 1].x, y: history[i - 1].y },
                    { x: p.x, y: p.y }
                ]);
                dotDist += m.distance;

                const pAlpha = p.alpha ?? 1.0;
                if (pAlpha > 0.01) {
                    const c = getCenter(p.x, p.y);
                    const cHex = this._pickColor(dotDist, speed);
                    g.beginFill(parseInt(cHex.replace("#", ""), 16), pAlpha * 0.4);
                    g.drawCircle(c.x, c.y, 3);
                    g.endFill();
                }
            }
            // Dot at current
            const m = canvas.grid.measurePath([
                { x: lastP.x, y: lastP.y },
                { x: token.x, y: token.y }
            ]);
            const cHex = this._pickColor(cumulativeDist + m.distance, speed);
            g.beginFill(parseInt(cHex.replace("#", ""), 16), 0.4);
            g.drawCircle(current.x, current.y, 3);
            g.endFill();
        }
    }

    _getActorSpeed(token) {
        const actor = token.actor;
        if (!actor) return null;
        const path = String(game.settings.get(this.modId, "speedAttribute") || "");
        let v = foundry.utils.getProperty(actor, path);
        if (typeof v === "number") return v;
        if (v && typeof v.total === "number") return v.total;
        if (v && typeof v.value === "number") return v.value;
        if (typeof v === "string") {
            const m = v.match(/-?\d+(\.\d+)?/);
            if (m) return Number(m[0]);
        }
        return null;
    }

    _pickColor(distance, baseSpeed) {
        const m = Number(game.settings.get(this.modId, "dashMultiplier")) || 0;
        const walk = Number(baseSpeed) || 0;
        const walkColor = String(game.settings.get(this.modId, "walkColor") || "#00ff00");
        const dashColor = String(game.settings.get(this.modId, "dashColor") || "#ffff00");
        const dashColor2 = String(game.settings.get(this.modId, "dashColor2") || "#FFA500");
        const unreachableColor = String(game.settings.get(this.modId, "unreachableColor") || "#ff0000");

        if (walk <= 0) return unreachableColor;
        const eps = 1e-6;
        if (distance <= walk + eps) return walkColor;
        if (m >= 2 && distance <= (walk * 2) + eps) return dashColor;
        if (m >= 3 && distance <= (walk * 3) + eps) return dashColor2;
        if (m > 1 && distance <= (walk * m) + eps) return dashColor2;
        return unreachableColor;
    }

    _clearGhost(token) {
        if (this.states.has(token.id)) {
            const state = this.states.get(token.id);
            if (state.graphics) {
                state.graphics.clear();
                if (state.graphics.parent) {
                    state.graphics.parent.removeChild(state.graphics);
                }
                state.graphics.destroy();
                state.graphics = null;
            }
        }
    }

    _refreshGhost(token) {
        if (token.hover || token.controlled) this._drawGhost(token);
        else this._clearGhost(token);
    }
}
