import { SmartFinder, testCollision } from "./pathfinding.js";
import { GhostTrail } from "./ghost-trail.js";

const MOD_ID = "phils-pf2e-action-colours";

function isV13Plus() {
  const gen = game?.release?.generation;
  return Number.isFinite(gen) && gen >= 13;
}

function registerSettings() {
  const S = (key, data) => game.settings.register(MOD_ID, key, data);
  const L = (key) => game.i18n.localize(`phils-pf2e-action-colours.settings.${key}`);

  S("speedAttribute", {
    name: L("speedAttribute.name"),
    hint: L("speedAttribute.hint"),
    scope: "world",
    config: true,
    type: String,
    default: "system.movement.speeds.land"
  });

  S("fallbackSpeed", {
    name: L("fallbackSpeed.name"),
    hint: L("fallbackSpeed.hint"),
    scope: "world",
    config: true,
    type: Number,
    range: { min: 0, max: 200, step: 5 },
    default: 30
  });

  S("walkColor", {
    name: L("walkColor.name"),
    scope: "world",
    config: true,
    type: String,
    default: "#00ff00"
  });

  S("dashColor", {
    name: L("dashColor.name"),
    scope: "world",
    config: true,
    type: String,
    default: "#ffff00"
  });

  S("dashColor2", {
    name: L("dashColor2.name"),
    scope: "world",
    config: true,
    type: String,
    default: "#FFA500"
  });

  S("unreachableColor", {
    name: L("unreachableColor.name"),
    scope: "world",
    config: true,
    type: String,
    default: "#ff0000"
  });

  S("dashMultiplier", {
    name: L("dashMultiplier.name"),
    hint: L("dashMultiplier.hint"),
    scope: "world",
    config: true,
    type: Number,
    range: { min: 0, max: 5, step: 1 },
    default: 3
  });

  S("smartRouting", {
    name: L("smartRouting.name"),
    hint: L("smartRouting.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true
  });

  S("routingMode", {
    name: L("routingMode.name"),
    hint: L("routingMode.hint"),
    scope: "client",
    config: true,
    type: String,
    choices: {
      "always": L("routingMode.choices.always"),
      "combat": L("routingMode.choices.combat")
    },
    default: "combat"
  });

  S("ghostTrail", {
    name: L("ghostTrail.name"),
    hint: L("ghostTrail.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true
  });

  S("ghostTrailMode", {
    name: L("ghostTrailMode.name"),
    hint: L("ghostTrailMode.hint"),
    scope: "client",
    config: true,
    type: String,
    choices: {
      "always": L("ghostTrailMode.choices.always"),
      "combat": L("ghostTrailMode.choices.combat")
    },
    default: "combat"
  });

  S("ghostTrailTimeout", {
    name: L("ghostTrailTimeout.name"),
    hint: L("ghostTrailTimeout.hint"),
    scope: "client",
    config: true,
    type: Number,
    range: { min: 0, max: 60, step: 1 },
    default: 5
  });

  S("ghostTrailShare", {
    name: L("ghostTrailShare.name"),
    hint: L("ghostTrailShare.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: false
  });
}

Hooks.once("init", () => {
  registerSettings();
});

Hooks.once("ready", () => {
  if (!isV13Plus()) {
    console.warn(`${MOD_ID}: Foundry < v13 detected. This module requires Foundry v13+.`);
    return;
  }

  const currentSpeedAttr = game.settings.get(MOD_ID, "speedAttribute");
  if (currentSpeedAttr && currentSpeedAttr.startsWith("system.attributes.speed")) {
    game.settings.set(MOD_ID, "speedAttribute", "system.movement.speeds.land");
  }

  const currentMult = game.settings.get(MOD_ID, "dashMultiplier");
  if (currentMult === 2) {
    game.settings.set(MOD_ID, "dashMultiplier", 3);
  }

  if (!globalThis.libWrapper) {
    ui.notifications?.error(`${MOD_ID}: libWrapper is required. Please install and enable it.`);
    return;
  }

  // Wrap PF2e native findMovementPath
  try {
    const tokenClass = CONFIG.Token.objectClass;
    if (tokenClass?.prototype.findMovementPath) {
      libWrapper.register(MOD_ID, "CONFIG.Token.objectClass.prototype.findMovementPath", function (wrapped, waypoints, options) {
        const keys = game.keyboard.downKeys;
        const isAlt = keys && (keys.has("AltLeft") || keys.has("AltRight"));

        if (isAlt) {
          const token = this.document ? this : (this.object ?? this);
          const tokenObject = token.object || token;
          if (tokenObject) {
            tokenObject._lastSmartPath = waypoints.map(w => ({ x: w.x, y: w.y }));
            setTimeout(() => {
              delete tokenObject._lastSmartPath;
            }, 10000);
          }

          return {
            result: undefined,
            promise: Promise.resolve(waypoints),
            cancel: () => {}
          };
        }

        try {
          const token = this.document ? this : (this.object ?? this);
          const tokenObject = token.object || token;
          if (tokenObject && waypoints && waypoints.length > 1) {
            tokenObject._lastSmartPath = waypoints.map(w => ({ x: w.x, y: w.y }));
            setTimeout(() => {
              delete tokenObject._lastSmartPath;
            }, 10000);
          }
        } catch {}

        const smartEnabled = game.settings.get(MOD_ID, "smartRouting");
        const routingMode = game.settings.get(MOD_ID, "routingMode");
        if (!smartEnabled || (routingMode === "combat" && !game.combat?.started)) {
          return wrapped(waypoints, options);
        }

        if (waypoints.length >= 2) {
          const start = waypoints[waypoints.length - 2];
          const end = waypoints[waypoints.length - 1];

          if (start && end && (start.x !== end.x || start.y !== end.y)) {
            try {
              const token = this.document ? this : (this.object ?? this);
              const tokenObject = token.object || token;

              const hasCollision = testCollision(start, end, "move", "any");
              if (!hasCollision) {
                return wrapped(waypoints, options);
              }

              const finder = new SmartFinder(tokenObject);
              const path = finder.findPath(start, end);

              if (path && path.length > 0) {
                const template = start || {};
                const newWaypoints = waypoints.slice(0, waypoints.length - 1);

                for (const p of path) {
                  const wp = { ...template, x: p.x, y: p.y };
                  delete wp._original;
                  delete wp._parent;
                  newWaypoints.push(wp);
                }

                if (tokenObject) {
                  tokenObject._lastSmartPath = newWaypoints.map(w => ({ x: w.x, y: w.y }));
                  setTimeout(() => {
                    delete tokenObject._lastSmartPath;
                  }, 10000);
                }

                if (newWaypoints.length > 2) {
                  try {
                    const simplified = simplifyPath(newWaypoints);
                    const keepSet = new Set(simplified);
                    for (const wp of newWaypoints) {
                      if (!keepSet.has(wp)) {
                        wp._isVirtual = true;
                      }
                    }
                  } catch (tagErr) {
                    console.error(`${MOD_ID}: Error tagging virtual waypoints`, tagErr);
                  }
                }

                return {
                  result: undefined,
                  promise: Promise.resolve(newWaypoints),
                  cancel: () => {}
                };
              }
            } catch (err) {
              console.error(`${MOD_ID}: SmartRouting error:`, err);
            }
          }
        }
        return wrapped(waypoints, options);
      }, "MIXED");
    }
  } catch (e) {
    console.error(`${MOD_ID}: Failed to register findMovementPath wrapper`, e);
  }

  // Ruler Segment Styling
  try {
    libWrapper.register(MOD_ID, "foundry.canvas.interaction.Ruler.prototype._getSegmentStyle",
      function (wrapped, waypoint) {
        const style = wrapped.call(this, waypoint) || { width: 6 };
        try {
          const actions = getNativeActionCount(this, waypoint);
          const color = pickColor(actions);
          if (color) {
            style.color = color;
            style.alpha = 1.0;
          }

          const keys = game.keyboard.downKeys;
          const isAlt = keys && (keys.has("AltLeft") || keys.has("AltRight"));
          if (isAlt) {
            style.alpha = 0.0;
            style.visible = false;
          }
        } catch (e) {
          console.error(`${MOD_ID}: Error in base Ruler _getSegmentStyle`, e);
        }
        return style;
      }, "WRAPPER");
  } catch (e) {
    console.error(`${MOD_ID}: Failed to wrap base Ruler _getSegmentStyle`, e);
  }

  // TokenRuler Segment Styling
  try {
    libWrapper.register(MOD_ID, "foundry.canvas.placeables.tokens.TokenRuler.prototype._getSegmentStyle",
      function (wrapped, waypoint) {
        const style = wrapped.call(this, waypoint) || { width: 6 };
        try {
          const actions = getNativeActionCount(this, waypoint);
          const color = pickColor(actions);
          if (color) {
            style.color = color;
            style.alpha = 1.0;
          }
        } catch (e) {
          console.error(`${MOD_ID}: Error in TokenRuler _getSegmentStyle`, e);
        }
        return style;
      }, "WRAPPER");
  } catch (e) {
    console.error(`${MOD_ID}: Failed to wrap TokenRuler _getSegmentStyle`, e);
  }

  // TokenRuler Grid Highlight Styling
  try {
    libWrapper.register(MOD_ID, "foundry.canvas.placeables.tokens.TokenRuler.prototype._getGridHighlightStyle",
      function (wrapped, waypoint, offset) {
        const style = wrapped.call(this, waypoint, offset) || {};
        try {
          const actions = getNativeActionCount(this, waypoint);
          const color = pickColor(actions);
          if (color) {
            style.color = color;
            style.alpha = 0.35;
          }
        } catch (e) {
          console.error(`${MOD_ID}: Error in TokenRuler _getGridHighlightStyle`, e);
        }
        return style;
      }, "WRAPPER");
  } catch (e) {
    console.error(`${MOD_ID}: Failed to wrap TokenRuler _getGridHighlightStyle`, e);
  }

  // Suppress Virtual Waypoints (Dots & Labels)
  const waypointStyleTargets = [
    "foundry.canvas.interaction.Ruler.prototype._getWaypointStyle",
    "foundry.canvas.placeables.tokens.TokenRuler.prototype._getWaypointStyle"
  ];

  for (const target of waypointStyleTargets) {
    try {
      libWrapper.register(MOD_ID, target, function (wrapped, waypoint, index) {
        const style = wrapped.call(this, waypoint, index);
        if (waypoint?._isVirtual) {
          return {
            ...style,
            icon: null,
            label: null,
            alpha: 0,
            width: 0,
            height: 0,
            visible: false
          };
        }
        return style;
      }, "WRAPPER");
    } catch {}
  }

  const labelContextTargets = [
    "foundry.canvas.interaction.Ruler.prototype._getWaypointLabelContext",
    "foundry.canvas.placeables.tokens.TokenRuler.prototype._getWaypointLabelContext"
  ];

  for (const target of labelContextTargets) {
    try {
      libWrapper.register(MOD_ID, target, function (wrapped, waypoint, index) {
        if (waypoint?._isVirtual) {
          return { text: "" };
        }
        return wrapped.call(this, waypoint, index);
      }, "WRAPPER");
    } catch {}
  }

  // Global Hook: Alt-Teleport (Skip Animation)
  Hooks.on("preUpdateToken", (tokenDoc, changes, options) => {
    if (!changes.x && !changes.y) return;
    const keys = game.keyboard.downKeys;
    if (keys && (keys.has("AltLeft") || keys.has("AltRight"))) {
      options.animation = { duration: 0 };
      options.animate = false;
      options.teleport = true;
    }
  });

  // Initialize Ghost Trail
  new GhostTrail().init();
});

function getNativeActionCount(ruler, waypoint) {
  if (!waypoint || !ruler) return null;

  const segment = ruler.segments?.find(s => s.ray.B.x === waypoint.x && s.ray.B.y === waypoint.y);
  if (!segment && !waypoint.measurement) return null;

  const cost = waypoint.measurement?.cost ?? segment?.cost;
  if (cost === undefined || cost === null) return null;

  const token = ruler.token || ruler.object || canvas.tokens.controlled[0];
  const actor = token?.actor;
  if (!actor) return null;

  const actionType = waypoint.action || "land";
  let speedValue = 0;

  const speeds = actor.system?.movement?.speeds;
  const oldSpeed = !speeds ? actor.system?.attributes?.speed : null;

  let speedObj = null;
  if (speeds) {
    const key = (actionType === "stride") ? "land" : actionType;
    speedObj = speeds[key] ?? speeds["land"];
  } else if (oldSpeed) {
    if (actionType === "land" || actionType === "travel" || actionType === "stride") {
      speedObj = oldSpeed;
    } else {
      speedObj = oldSpeed.otherSpeeds?.find(s => s.type === actionType);
    }
  }

  speedValue = typeof speedObj === "number" ? speedObj : (speedObj?.total ?? speedObj?.value ?? 0);

  if (speedValue <= 0 && speeds?.land) {
    const landObj = speeds.land;
    speedValue = typeof landObj === "number" ? landObj : (landObj?.total ?? landObj?.value ?? 0);
  }

  if (speedValue <= 0) {
    speedValue = Number(game.settings.get(MOD_ID, "fallbackSpeed")) || 30;
  }

  if (speedValue <= 0) return null;

  if (cost <= speedValue) return 1;
  if (cost <= speedValue * 2) return 2;
  if (cost <= speedValue * 3) return 3;

  return 4;
}

function pickColor(actionCount) {
  if (!actionCount) return null;

  const colors = {
    1: game.settings.get(MOD_ID, "walkColor"),
    2: game.settings.get(MOD_ID, "dashColor"),
    3: game.settings.get(MOD_ID, "dashColor2"),
    4: game.settings.get(MOD_ID, "unreachableColor")
  };

  return colors[actionCount] || colors[4];
}

function simplifyPath(points) {
  if (!points || points.length < 3) return points;

  const simplified = [points[0]];
  let lastDir = null;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];

    const dx = curr.x - prev.x;
    const dy = curr.y - prev.y;
    const len = Math.hypot(dx, dy);
    if (len < 0.001) continue;

    const dirKey = `${(dx / len).toFixed(3)},${(dy / len).toFixed(3)}`;

    if (dirKey !== lastDir) {
      if (i > 1) {
        simplified.push(prev);
      }
      lastDir = dirKey;
    }
  }

  simplified.push(points[points.length - 1]);
  return simplified;
}
