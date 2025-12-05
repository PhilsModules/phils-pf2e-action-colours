
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
  game.settings.register(MOD_ID, "speedAttribute", {
    name: "Speed attribute path",
    hint: "Object path on the actor to read base speed from (PF2e default works out of the box).",
    scope: "world",
    config: true,
    type: String,
    default: "system.movement.speeds.land"
  });

  game.settings.register(MOD_ID, "dashMultiplier", {
    name: "Dash multiplier / action rings",
    hint: "2 → two-action ring (Yellow), 3 → three-action ring (Orange). 0 disables the secondary ring.",
    scope: "world",
    config: true,
    type: Number,
    range: { min: 0, max: 5, step: 1 },
    default: 3
  });

  game.settings.register(MOD_ID, "walkColor", {
    name: "Color for walk (ring 1)",
    scope: "world",
    config: true,
    type: String,
    default: "#00ff00"
  });

  game.settings.register(MOD_ID, "dashColor", {
    name: "Color for dash (ring 2)",
    scope: "world",
    config: true,
    type: String,
    default: "#ffff00"
  });

  game.settings.register(MOD_ID, "dashColor2", {
    name: "Color for dash (ring 3)",
    scope: "world",
    config: true,
    type: String,
    default: "#FFA500"
  });

  game.settings.register(MOD_ID, "unreachableColor", {
    name: "Color for unreachable",
    scope: "world",
    config: true,
    type: String,
    default: "#ff0000"
  });

  game.settings.register(MOD_ID, "fallbackSpeed", {
    name: "Fallback speed (when no token)",
    hint: "Used when measuring distance with no token ruler (e.g. Measure tool).",
    scope: "world",
    config: true,
    type: Number,
    range: { min: 0, max: 200, step: 5 },
    default: 30
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
