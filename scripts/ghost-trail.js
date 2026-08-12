import { SmartFinder, testCollision } from "./pathfinding.js";

export class GhostTrail {
    constructor() {
        this.modId = "phils-pf2e-action-colours";
        this.states = new Map();
        this.activeRulerMoves = new Set();
    }

    init() {
        game.modules.get(this.modId).api = this;

        game.socket.on(`module.${this.modId}`, (data) => {
            if (data.type === "trail" && data.tokenId && data.path) {
                const token = canvas.tokens.get(data.tokenId);
                if (token) {
                    this._addToHistory(token, data.path, false);
                    this._drawGhost(token);
                    this._resetTimeout(token);
                }
            }
        });

        Hooks.on("preUpdateToken", this._onPreUpdateToken.bind(this));
        Hooks.on("updateToken", this._onUpdateToken.bind(this));
        Hooks.on("updateCombat", this._onUpdateCombat.bind(this));
        Hooks.on("deleteCombat", this._onDeleteCombat.bind(this));
        Hooks.on("hoverToken", this._onHoverToken.bind(this));
        Hooks.on("controlToken", (token) => {
            this._refreshGhost(token);
        });
        Hooks.on("deleteToken", (doc) => {
            this._clearTokenData(doc.id);
        });

        if (game.modules.get("lib-wrapper")?.active) {
            const RulerClass = CONFIG.Canvas.rulerClass;
            if (RulerClass?.prototype?.moveToken) {
                try {
                    libWrapper.register(this.modId, "CONFIG.Canvas.rulerClass.prototype.moveToken", this._wrapRulerMoveToken, "WRAPPER");
                } catch (e) {
                    console.error("GhostTrail: Ruler wrapper failed", e);
                }
            }
        }
    }

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

    _onUpdateToken(tokenDoc, changes) {
        if (!this._shouldRecord()) return;
        if (!changes.x && !changes.y) return;
        const token = tokenDoc.object;
        if (!token) return;

        if (token._ghostTrailBlocking || this.activeRulerMoves.has(token.id)) return;

        this._waitForArrival(token);
    }

    async _waitForArrival(token) {
        const state = this._getState(token.id);
        if (state.isWaitingForArrival) return;
        state.isWaitingForArrival = true;

        try {
            const start = Date.now();
            while (token.isAnimating && (Date.now() - start < 10000)) {
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            this._onMovementEnd(token);
        } finally {
            state.isWaitingForArrival = false;
        }
    }

    _onMovementEnd(token) {
        if (!this._shouldRecord()) return;

        const state = this._getState(token.id);

        if (token._pendingGhostPath && token._pendingGhostPath.length > 0) {
            const clippedPath = this._clipPathToToken(token._pendingGhostPath, token);
            this._addToHistory(token, clippedPath, true);
            delete token._pendingGhostPath;
        }

        if (state.history.length > 0) {
            this._requestDrawGhost(token);
        }

        if (game.settings.get(this.modId, "ghostTrailShare")) {
            game.socket.emit(`module.${this.modId}`, {
                type: "trail",
                tokenId: token.id,
                path: state.history
            });
        }

        this._resetTimeout(token);
    }

    async _wrapRulerMoveToken(wrapped, ...args) {
        const api = game.modules.get("phils-pf2e-action-colours")?.api;
        if (!api || !api._shouldRecord()) {
            return wrapped.apply(this, args);
        }

        let capturedWaypoints = [];

        if (this.segments && this.segments.length > 0) {
            capturedWaypoints.push({ x: this.segments[0].ray.A.x, y: this.segments[0].ray.A.y });
            for (const seg of this.segments) {
                capturedWaypoints.push({ x: seg.ray.B.x, y: seg.ray.B.y });
            }
        }

        if (capturedWaypoints.length < 2) {
            const raw = this.waypoints || [];
            capturedWaypoints = raw.map(w => ({ x: w.x, y: w.y }));
        }

        if (capturedWaypoints.length < 2 && Array.isArray(args[0]) && args[0].length > 1) {
            capturedWaypoints = args[0].map(w => ({ x: w.x, y: w.y }));
        }

        let result;
        try {
            const movingTokens = this.token ? [this.token] : canvas.tokens.controlled;
            movingTokens.forEach(t => {
                api.activeRulerMoves.add(t.id);
                t._ghostTrailBlocking = true;
            });

            result = await wrapped.apply(this, args);

            movingTokens.forEach(t => {
                api.activeRulerMoves.delete(t.id);
                delete t._ghostTrailBlocking;
            });

            if (capturedWaypoints.length > 1) {
                for (const token of movingTokens) {
                    let finalPath = null;

                    if (token._lastSmartPath && token._lastSmartPath.length > 0) {
                        finalPath = [...token._lastSmartPath];
                        delete token._lastSmartPath;
                    } else {
                        const smartPath = api._getSmartPathFromWaypoints(capturedWaypoints, token);
                        finalPath = (smartPath && smartPath.length > 0)
                            ? smartPath
                            : capturedWaypoints.map(w => ({ x: w.x, y: w.y }));
                    }

                    if (finalPath) {
                        finalPath = api._clipPathToToken(finalPath, token);
                        api._addToHistory(token, finalPath, true);
                    }

                    api._onMovementEnd(token);
                }
            }
        } catch (e) {
            console.error("GhostTrail: Wrapper error", e);
            const errorTokens = this.token ? [this.token] : canvas.tokens.controlled;
            errorTokens.forEach(t => api.activeRulerMoves.delete(t.id));
        }
        return result;
    }

    _clipPathToToken(path, token) {
        if (!path || path.length < 2) return path;

        const tx = token.x;
        const ty = token.y;

        const lastP = path[path.length - 1];
        if (Math.hypot(lastP.x - tx, lastP.y - ty) < 5) {
            return path;
        }

        function getClosest(Ax, Ay, Bx, By, Px, Py) {
            const dx = Bx - Ax;
            const dy = By - Ay;
            if (dx === 0 && dy === 0) {
                return { distSq: (Px - Ax) ** 2 + (Py - Ay) ** 2, x: Ax, y: Ay, t: 0 };
            }
            const t = ((Px - Ax) * dx + (Py - Ay) * dy) / (dx * dx + dy * dy);
            const clampedT = Math.max(0, Math.min(1, t));
            const x = Ax + clampedT * dx;
            const y = Ay + clampedT * dy;
            return { distSq: (Px - x) ** 2 + (Py - y) ** 2, x, y, t: clampedT };
        }

        const TOLERANCE_SQ = 25;

        for (let i = path.length - 2; i >= 0; i--) {
            const p1 = path[i];
            const p2 = path[i + 1];
            const result = getClosest(p1.x, p1.y, p2.x, p2.y, tx, ty);

            if (result.distSq <= TOLERANCE_SQ) {
                const newPath = path.slice(0, i + 1);
                if (result.t > 0.01) newPath.push({ x: result.x, y: result.y });
                return newPath;
            }
        }

        return [...path.slice(0, path.length - 1), { x: tx, y: ty }];
    }

    _getSmartPathFromWaypoints(waypoints, token) {
        if (!waypoints || waypoints.length < 2) return [];

        const smartEnabled = game.settings.get("phils-pf2e-action-colours", "smartRouting");
        if (!smartEnabled) return null;

        const fullPath = [{ x: waypoints[0].x, y: waypoints[0].y }];
        const finder = new SmartFinder(token);

        for (let i = 0; i < waypoints.length - 1; i++) {
            const start = waypoints[i];
            const end = waypoints[i + 1];

            if (Math.hypot(start.x - end.x, start.y - end.y) < 1) continue;

            try {
                const segmentPath = finder.findPath({ x: start.x, y: start.y }, { x: end.x, y: end.y });
                if (segmentPath && segmentPath.length > 0) {
                    for (const p of segmentPath) {
                        fullPath.push({ x: p.x, y: p.y });
                    }
                } else {
                    fullPath.push({ x: end.x, y: end.y });
                }
            } catch (e) {
                console.warn("GhostTrail: SmartFinder failed for segment", e);
                fullPath.push({ x: end.x, y: end.y });
            }
        }

        return fullPath;
    }

    _onPreUpdateToken(tokenDoc, changes) {
        if (!this._shouldRecord()) return;
        if (changes.x === undefined && changes.y === undefined) return;

        const token = tokenDoc.object;
        if (!token || token._ghostTrailBlocking || this.activeRulerMoves.has(token.id)) return;

        const state = this._getState(token.id);
        if (state.smartPathCooldown) {
            if (Date.now() < state.smartPathCooldown) return;
            delete state.smartPathCooldown;
        }

        let intendedPath = [];

        if (token._lastSmartPath) {
            state.smartPathCooldown = Date.now() + 2000;
            intendedPath = [...token._lastSmartPath];
            delete token._lastSmartPath;
        } else if (state.history.length > 0) {
            const last = state.history[state.history.length - 1];
            const destX = changes.x ?? token.x;
            const destY = changes.y ?? token.y;

            if (Math.hypot(destX - last.x, destY - last.y) < 50) return;
            intendedPath = [{ x: token.x, y: token.y }];
        } else {
            intendedPath = [{ x: token.x, y: token.y }];
        }

        if (intendedPath.length > 0) {
            token._pendingGhostPath = intendedPath;
        }
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
            state.history.length = 0;
        }

        for (const p of newPath) {
            if (state.history.length > 0) {
                const last = state.history[state.history.length - 1];
                if (Math.hypot(p.x - last.x, p.y - last.y) < 10) continue;
            }
            state.history.push({ x: p.x, y: p.y, alpha: 1.0 });
        }
    }

    _resetTimeout(token) {
        const state = this._getState(token.id);

        if (state.decayInterval) {
            clearInterval(state.decayInterval);
            state.decayInterval = null;
        }
        if (state.timer) {
            clearTimeout(state.timer);
            state.timer = null;
        }

        if (state.history.length > 0) {
            state.history.forEach(p => p.alpha = 1.0);
            this._requestDrawGhost(token);
        }

        if (game.combat?.started) return;

        const timeoutSec = Number(game.settings.get(this.modId, "ghostTrailTimeout"));
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
                this._requestDrawGhost(token);
            } else {
                this._clearTokenData(token.id);
            }
        }, 50);
    }

    _onUpdateCombat(combat) {
        if (!this._shouldRecord()) return;
        const combatant = combat.combatant;
        const token = combatant?.token?.object;
        if (token) {
            this._clearTokenData(token.id);
        }
    }

    _onDeleteCombat() {
        for (const id of this.states.keys()) {
            this._clearTokenData(id);
        }
    }

    _onHoverToken(token, hovered) {
        if (!game.settings.get(this.modId, "ghostTrail")) return;
        if (hovered) this._requestDrawGhost(token);
        else this._clearGhost(token);
    }

    _requestDrawGhost(token) {
        const state = this._getState(token.id);
        if (state.drawPending) return;
        state.drawPending = true;
        requestAnimationFrame(() => {
            state.drawPending = false;
            this._drawGhost(token);
        });
    }

    _drawGhost(token) {
        if (!token.hover && !token.controlled) {
            this._clearGhost(token);
            return;
        }

        const state = this._getState(token.id);
        if (!state || state.history.length === 0) return;

        const getCenter = (x, y) => ({
            x: x + (token.w / 2),
            y: y + (token.h / 2)
        });

        if (!state.graphics || state.graphics.destroyed) {
            state.graphics = new PIXI.Graphics();
            canvas.controls.addChild(state.graphics);
        }

        const g = state.graphics;
        g.clear();

        const history = state.history;
        const speed = this._getActorSpeed(token) || 30;

        if (history.length > 1) {
            let prev = getCenter(history[0].x, history[0].y);

            for (let i = 1; i < history.length; i++) {
                const p = history[i];
                const curr = getCenter(p.x, p.y);

                const pathSoFar = history.slice(0, i + 1);
                const measurement = canvas.grid.measurePath(pathSoFar);
                const currentDist = measurement.distance;

                const colorHex = this._pickColor(currentDist, speed);
                const color = parseInt(colorHex.replace("#", ""), 16);

                const alpha1 = history[i - 1].alpha ?? 1.0;
                const alpha2 = p.alpha ?? 1.0;
                const segAlpha = Math.min(alpha1, alpha2) * 0.6;

                if (segAlpha > 0.01) {
                    this._drawLine(g, prev, curr, 4, color, segAlpha);
                }
                prev = curr;
            }
        }
    }

    _drawLine(g, p1, p2, width, color, alpha) {
        if (typeof g.lineStyle === "function") {
            g.lineStyle(width, color, alpha);
            g.moveTo(p1.x, p1.y);
            g.lineTo(p2.x, p2.y);
        } else {
            g.moveTo(p1.x, p1.y);
            g.lineTo(p2.x, p2.y);
            if (typeof g.stroke === "function") {
                g.stroke({ width, color, alpha });
            }
        }
    }

    _getActorSpeed(token) {
        const actor = token?.actor;
        if (!actor) return null;

        const path = String(game.settings.get(this.modId, "speedAttribute") || "");
        let v = foundry.utils.getProperty(actor, path);

        if (v === undefined || v === null) {
            const speeds = actor.system?.movement?.speeds;
            const land = speeds?.land;
            v = typeof land === "number" ? land : (land?.total ?? land?.value ?? actor.system?.attributes?.speed?.total ?? actor.system?.attributes?.speed?.value);
        }

        if (typeof v === "number") return v;
        if (v && typeof v.total === "number") return v.total;
        if (v && typeof v.value === "number") return v.value;
        if (typeof v === "string") {
            const m = v.match(/-?\d+(\.\d+)?/);
            if (m) return Number(m[0]);
        }
        return Number(game.settings.get(this.modId, "fallbackSpeed")) || 30;
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
        if (token.hover || token.controlled) this._requestDrawGhost(token);
        else this._clearGhost(token);
    }
}
