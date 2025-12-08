export class GhostTrail {
    constructor() {
        this.modId = "phils-pf2e-action-colours";
    }

    init() {
        const wrapperId = this.modId;

        // 1. Always listen to hooks (PRIMARY LISTENER)
        Hooks.on("preUpdateToken", this._onPreUpdateToken.bind(this));
        // Combat management
        Hooks.on("updateCombat", this._onUpdateCombat.bind(this));
        Hooks.on("deleteCombat", this._onDeleteCombat.bind(this));
        Hooks.on("hoverToken", this._onHoverToken.bind(this));

        // 2. Try to wrap Ruler.moveToken for Ruler-based moves (CTRL+Drag, Spacebar measures)
        // This is optional for Drag moves, which are handled by preUpdateToken + SmartRouting
        if (globalThis.libWrapper) {
            try {
                const RulerClass = CONFIG.Canvas.rulerClass;
                if (RulerClass && RulerClass.prototype && RulerClass.prototype.moveToken) {
                    const target = "CONFIG.Canvas.rulerClass.prototype.moveToken";
                    console.log(`GhostTrail: Registering libWrapper on ${target}`);
                    libWrapper.register(wrapperId, target, this._wrapRulerMoveToken.bind(this), "WRAPPER");
                } else {
                    try {
                        libWrapper.register(wrapperId, "foundry.canvas.interaction.Ruler.prototype.moveToken", this._wrapRulerMoveToken.bind(this), "WRAPPER");
                    } catch (e) {
                        console.warn("GhostTrail: Ruler wrapper failed. Standard Ruler moves might be straight lines.");
                    }
                }
            } catch (e) {
                console.error("GhostTrail: Error registering libWrapper", e);
            }
        }
    }

    /**
     * Wrap Ruler.moveToken to capture "Measured" moves.
     */
    async _wrapRulerMoveToken(wrapped, ...args) {
        if (!game.settings.get(this.modId, "ghostTrail") || !game.combat) {
            return wrapped.apply(this, args);
        }

        try {
            const tokens = canvas.tokens.controlled;
            let capturedAny = false;

            // Check if Smart Routing left a path for us
            for (const token of tokens) {
                if (token._lastSmartPath && token._lastSmartPath.length > 0) {
                    this._addToHistory(token, token._lastSmartPath);
                    // We keep it on the token in case preUpdateToken needs it too (race condition safety)
                    capturedAny = true;
                }
            }

            // If no smart path, use Ruler points
            if (!capturedAny) {
                const waypoints = this.waypoints || [];
                if (waypoints.length > 0) {
                    const path = waypoints.map(w => ({ x: w.x, y: w.y }));
                    tokens.forEach(token => this._addToHistory(token, path));
                }
            }
        } catch (e) {
            console.error("GhostTrail: Wrapper error", e);
        }

        return wrapped.apply(this, args);
    }

    /**
     * Universal catch-all for movement updates (Drag & Drop, Arrow Keys, etc.)
     */
    _onPreUpdateToken(tokenDoc, changes, context, userId) {
        if (!game.settings.get(this.modId, "ghostTrail")) return;
        if (!game.combat) return;
        if (changes.x === undefined && changes.y === undefined) return;

        const token = tokenDoc.object;
        if (!token) return;

        // 1. PRIORITY: Smart Routing Path (Drag & Drop)
        // This property is set by main.js during the drag
        if (token._lastSmartPath) {
            console.log("GhostTrail [preUpdate]: Consuming Smart Path", token._lastSmartPath);
            this._addToHistory(token, token._lastSmartPath);
            // Cleanup now
            delete token._lastSmartPath;
            return;
        }

        // 2. CHECK EXISTING HISTORY (Ruler Wrapper)
        // If the wrapper ran (e.g. CTRL+Drag), it already added to history.
        const history = token._ghostTrailHistory;
        if (history && history.length > 0) {
            const last = history[history.length - 1];
            const destX = changes.x ?? token.x;
            const destY = changes.y ?? token.y;

            // If history ends at destination, we are good.
            if (Math.hypot(destX - last.x, destY - last.y) < 50) {
                return;
            }
        }

        // 3. FALLBACK: Straight line
        // Likely arrow keys or simple drag
        console.log("GhostTrail [preUpdate]: Fallback to straight line.");
        const start = { x: token.x, y: token.y };
        this._addToHistory(token, [start]);
    }

    _addToHistory(token, newPath) {
        if (!token._ghostTrailHistory) token._ghostTrailHistory = [];
        const history = token._ghostTrailHistory;

        for (const p of newPath) {
            if (history.length > 0) {
                const last = history[history.length - 1];
                // Avoid duplicates
                if (Math.hypot(p.x - last.x, p.y - last.y) < 10) continue;
            }
            history.push(p);
        }
    }

    _onUpdateCombat(combat, updateData, context, userId) {
        if (!game.settings.get(this.modId, "ghostTrail")) return;
        const combatant = combat.combatant;
        if (!combatant) return;

        const token = combatant.token?.object;
        if (token) {
            if (token._ghostTrailHistory) token._ghostTrailHistory = [];
            this._refreshGhost(token);
        }
    }

    _onDeleteCombat() {
        canvas.tokens.placeables.forEach(t => {
            delete t._ghostTrailHistory;
            this._clearGhost(t);
        });
    }

    _onHoverToken(token, hovered) {
        if (!game.settings.get(this.modId, "ghostTrail")) return;
        if (hovered) this._drawGhost(token);
        else this._clearGhost(token);
    }

    _drawGhost(token) {
        const history = token._ghostTrailHistory;
        if (!history || history.length === 0) return;

        const getCenter = (x, y) => {
            return {
                x: x + (token.w / 2),
                y: y + (token.h / 2)
            };
        };

        if (!token._ghostGraphics) {
            token._ghostGraphics = new PIXI.Graphics();
            canvas.controls.addChild(token._ghostGraphics);
        }

        const g = token._ghostGraphics;
        g.clear();
        // Cyan, semi-transparent
        g.lineStyle(4, 0xAAFFFF, 0.4);

        if (history.length > 0) {
            const start = getCenter(history[0].x, history[0].y);
            g.moveTo(start.x, start.y);

            for (let i = 1; i < history.length; i++) {
                const p = getCenter(history[i].x, history[i].y);
                g.lineTo(p.x, p.y);
            }

            const current = getCenter(token.x, token.y);
            g.lineTo(current.x, current.y);

            g.beginFill(0xAAFFFF, 0.4);
            for (const p of history) {
                const c = getCenter(p.x, p.y);
                g.drawCircle(c.x, c.y, 3);
            }
            g.drawCircle(current.x, current.y, 3);
            g.endFill();
        }
    }

    _clearGhost(token) {
        if (token._ghostGraphics) {
            token._ghostGraphics.clear();
            if (token._ghostGraphics.parent) {
                token._ghostGraphics.parent.removeChild(token._ghostGraphics);
            }
            token._ghostGraphics.destroy();
            token._ghostGraphics = null;
        }
    }

    _refreshGhost(token) {
        if (token.hover) this._drawGhost(token);
        else this._clearGhost(token);
    }
}
