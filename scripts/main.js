
import { SmartFinder } from "./pathfinding.js";
import { GhostTrail } from "./ghost-trail.js";

const MOD_ID = "phils-pf2e-action-colours";

// Detect v13+
function isV13Plus() {
  try {
    const gen = (game?.release?.generation ?? parseInt((game?.version ?? "0").split(".")[0] || "0"));
    return Number.isFinite(gen) && gen >= 13;
  } catch (e) {
    return true;
  }
}

// Settings
function registerSettings() {
  const S = (key, data) => game.settings.register(MOD_ID, key, data);
  const I = (key) => `phils-pf2e-action-colours.settings.${key}`;

  // Helper to safely localize
  const L = (key) => {
    const stringId = I(key);
    const localized = game.i18n.localize(stringId);
    // Debug check
    if (localized === stringId) console.warn(`[${MOD_ID}] Missing translation for ${stringId}`);
    return localized;
  };

  // --- Core Configuration ---
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

  // --- Visuals: Colors ---
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

  // --- Features: Smart Routing ---
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

  // --- Features: Ghost Trail ---
  S("ghostTrail", {
    name: L("ghostTrail.name"),
    hint: L("ghostTrail.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true
  });
}

Hooks.once("init", () => {
  registerSettings();
});

Hooks.once("ready", () => {
  if (!isV13Plus()) {
    console.warn(`${MOD_ID}: Foundry < v13 detected. This overlay is v13-only.`);
    return;
  }

  // Migration: If user has old default, update it
  const currentSpeedAttr = game.settings.get(MOD_ID, "speedAttribute");
  if (currentSpeedAttr === "system.attributes.speed.total" || currentSpeedAttr === "system.attributes.speed") {
    console.log(`${MOD_ID}: Migrating deprecated speed attribute to system.movement.speeds.land`);
    game.settings.set(MOD_ID, "speedAttribute", "system.movement.speeds.land");
  }

  // Migration: default multiplier to 3 if it was 2 (std value)
  const currentMult = game.settings.get(MOD_ID, "dashMultiplier");
  if (currentMult === 2) {
    console.log(`${MOD_ID}: Auto-updating Dash Multiplier to 3 for PF2e Action Color support.`);
    game.settings.set(MOD_ID, "dashMultiplier", 3);
  }

  if (!globalThis.libWrapper) {
    ui.notifications?.error(`${MOD_ID}: libWrapper is required. Please install/enable it.`);
    console.error(`${MOD_ID}: libWrapper missing.`);
    return;
  }


  // -------------------------------------------------------------------------
  // STRATEGY: Wrap PF2e's native findMovementPath
  // This is how modules like 'wayfinder' integrate.
  // -------------------------------------------------------------------------
  try {
    const tokenClass = CONFIG.Token.objectClass;
    if (tokenClass && tokenClass.prototype.findMovementPath) {
      const target = "CONFIG.Token.objectClass.prototype.findMovementPath";
      console.log(`[DEBUG_SMART] Registering wrapper for ${target}`);

      libWrapper.register(MOD_ID, target, function (wrapped, waypoints, options) {

        const smartEnabled = game.settings.get(MOD_ID, "smartRouting");

        if (!smartEnabled) {

          return wrapped(waypoints, options);
        }

        if (waypoints.length >= 2) {
          const start = waypoints[waypoints.length - 2];
          const end = waypoints[waypoints.length - 1];



          if (start && end && (start.x !== end.x || start.y !== end.y)) {
            try {
              const token = this.document ? this : (this.object ?? this);
              const tokenObject = token.object || token;


              const finder = new SmartFinder(tokenObject);
              const path = finder.findPath(start, end);

              if (path && path.length > 0) {
                const template = start || {};
                // Preserve history (waypoints user already passed)
                const newWaypoints = waypoints.slice(0, waypoints.length - 1);

                // Construct SAFE waypoints.
                // We need to copy metadata (for Ruler labels) but avoid circular refs (Stuck Token).
                for (const p of path) {
                  const wp = { ...template, x: p.x, y: p.y };

                  // Sanitize internal flags that might break DragHandler
                  delete wp._original;
                  delete wp._parent;

                  newWaypoints.push(wp);
                }

                // [GhostTrail Integration] Store the calculated path so GhostTrail can pick it up
                // Increasing timeout to 10s to ensure it persists through the drag-drop interaction
                if (tokenObject) {
                  tokenObject._lastSmartPath = newWaypoints.map(w => ({ x: w.x, y: w.y }));
                  setTimeout(() => {
                    if (tokenObject._lastSmartPath) delete tokenObject._lastSmartPath;
                  }, 10000);
                }

                // console.log(`[DEBUG_SMART] Final waypoints:`, newWaypoints);

                // PF2e expects result to be undefined if using a promise
                return {
                  result: undefined,
                  promise: Promise.resolve(newWaypoints),
                  cancel: () => { }
                };
              }
            } catch (err) {
              console.error(`${MOD_ID}: SmartRouting Crash:`, err);
            }
          }
        }
        return wrapped(waypoints, options);

      }, "MIXED");

    } else {
      console.warn(`${MOD_ID}: findMovementPath not found on Token class. Is this PF2e system?`);
    }
  } catch (e) {
    console.error(`${MOD_ID}: Failed to register findMovementPath wrapper`, e);
  }

  // -------------------------------------------------------------------------
  // Wrap base Ruler segment styling (Measure tool)

  try {
    libWrapper.register(MOD_ID, "foundry.canvas.interaction.Ruler.prototype._getSegmentStyle",
      function (wrapped, waypoint) {
        const style = wrapped.call(this, waypoint) || { width: 6 };
        try {
          const dist = waypoint?.measurement?.distance ?? 0;
          const speed = getSpeedForRuler(this) ?? game.settings.get(MOD_ID, "fallbackSpeed");
          const color = pickColor(dist, speed);
          // Apply our colors
          if (color) {
            style.color = color;
            style.alpha = 1.0;
          }
        } catch (e) {
          console.error(`${MOD_ID}: error in base Ruler _getSegmentStyle`, e);
        }
        return style;
      }, "WRAPPER");
  } catch (e) {
    console.error(`${MOD_ID}: failed to wrap base Ruler _getSegmentStyle`, e);
  }

  // Wrap TokenRuler segment styling (token drag)
  try {
    libWrapper.register(MOD_ID, "foundry.canvas.placeables.tokens.TokenRuler.prototype._getSegmentStyle",
      function (wrapped, waypoint) {
        const style = wrapped.call(this, waypoint) || { width: 6 };
        try {
          const dist = waypoint?.measurement?.distance ?? 0;
          const speed = getSpeedForRuler(this) ?? game.settings.get(MOD_ID, "fallbackSpeed");
          const color = pickColor(dist, speed);
          if (color) {
            style.color = color;
            style.alpha = 1.0;
          }
        } catch (e) {
          console.error(`${MOD_ID}: error in TokenRuler _getSegmentStyle`, e);
        }
        return style;
      }, "WRAPPER");
  } catch (e) {
    console.error(`${MOD_ID}: failed to wrap TokenRuler _getSegmentStyle`, e);
  }

  // Wrap TokenRuler grid highlight styling
  try {
    libWrapper.register(MOD_ID, "foundry.canvas.placeables.tokens.TokenRuler.prototype._getGridHighlightStyle",
      function (wrapped, waypoint, offset) {
        const style = wrapped.call(this, waypoint, offset) || {};
        try {
          const dist = waypoint?.measurement?.distance ?? 0;
          const speed = getSpeedForRuler(this) ?? game.settings.get(MOD_ID, "fallbackSpeed");
          const color = pickColor(dist, speed);
          if (color) {
            style.color = color;
            style.alpha = 0.35; // slightly transparent fill
          }
        } catch (e) {
          console.error(`${MOD_ID}: error in TokenRuler _getGridHighlightStyle`, e);
        }
        return style;
      }, "WRAPPER");
  } catch (e) {
    console.error(`${MOD_ID}: failed to wrap TokenRuler _getGridHighlightStyle`, e);
  }

  // Initialize Ghost Trail
  new GhostTrail().init();

  console.info(`${MOD_ID}: v13 overlay active.`);
});

/** Return actor speed in scene units for this ruler. */
function getSpeedForRuler(ruler) {
  // Prefer token ruler's actor
  const actor = ruler?.token?.actor ?? canvas?.tokens?.controlled?.[0]?.actor ?? null;
  if (!actor) return null;

  const path = String(game.settings.get(MOD_ID, "speedAttribute") || "");
  let v = foundry?.utils?.getProperty?.(actor, path);

  // Parse variations
  if (typeof v === "number") return v;
  if (v && typeof v.total === "number") return v.total;
  if (v && typeof v.value === "number") return v.value;
  if (typeof v === "string") {
    const m = v.match(/-?\d+(\.\d+)?/);
    if (m) return Number(m[0]);
  }
  return null;
}

/** Decide color by distance thresholds. */
function pickColor(distance, baseSpeed) {
  const m = Number(game.settings.get(MOD_ID, "dashMultiplier")) || 0;
  const walk = Number(baseSpeed) || 0;
  const walkColor = String(game.settings.get(MOD_ID, "walkColor") || "#00ff00");
  const dashColor = String(game.settings.get(MOD_ID, "dashColor") || "#ffff00");
  const dashColor2 = String(game.settings.get(MOD_ID, "dashColor2") || "#FFA500");
  const unreachableColor = String(game.settings.get(MOD_ID, "unreachableColor") || "#ff0000");

  if (walk <= 0) return unreachableColor;

  const eps = 1e-6;
  if (distance <= walk + eps) return walkColor;
  if (m >= 2 && distance <= (walk * 2) + eps) return dashColor;
  if (m >= 3 && distance <= (walk * 3) + eps) return dashColor2;

  // Fallback for higher multipliers
  if (m > 1 && distance <= (walk * m) + eps) return dashColor2;

  return unreachableColor;
}
