# Phil's PF2e Action Colours v2.0.0

🎉 **The Big Pathfinder 2e Remaster Update — Smart Actions, Automatic Conditions & Accessibility!**

### 🌟 Key Highlights:

- **Accessibility & Color Vision Presets:**
  - **Red-Green (Deuteranopia / Green-Weakness):** High-contrast color palette using Cobalt Blue, Sun Yellow, Amber Orange, Violet, and Brick Red.
  - **Red-Green (Protanopia / Red-Weakness):** Distinct palette using Sky Blue, Yellow, Orange, Deep Blue, and Magenta.
  - **Blue-Yellow (Tritanopia):** Clear palette using Emerald Mint, Soft Rose, Crimson, Silver White, and Dark Slate.

- **Full Automatic Condition Detection:**
  - **Prone:** The module immediately detects when a character is knocked down and automatically switches movement to Crawl (5 feet per action).
  - **Feat Support:** Automatically recognizes feats like *Nimble Crawl* (half or full speed crawl) and *Swift Sneak* (full speed sneak).
  - **Movement Blocked:** If a token is immobilized, paralyzed, restrained, grabbed, petrified, or unconscious, the entire ruler is locked to 0 ft (Red / Unreachable).
  - **Slowed & Stunned:** Dynamically reduces your available action budget — excessive distances turn red.
  - **Quickened (Haste):** Automatically unlocks a 4th action ring (Cyan/Light Blue) when a character has extra actions!

- **Modern Side-by-Side Settings Menu:**
  - A clean, compact 2-column configuration window designed to fit comfortably on all screen sizes and laptops.
  - Real-time Live Action Ruler preview bar that updates instantly when picking colors or selecting presets.
  - 1-Click color presets for both Accessibility and Style (*Standard PF2e, Vibrant Neon, Pastel Soft*).
  - Dedicated GM settings separation with visual indicators and permission safeguards.

- **Accurate Movement Speeds:**
  - Characters without a Fly or Burrow speed who switch modes can no longer glide across the map — the ruler correctly shows the mode as unreachable (0 ft).
  - Swimming and climbing without specific speeds now use rule-accurate Athletics fallbacks.

- **Improved Pathfinding & Ghost Trail:**
  - Tokens navigate around walls more reliably without clipping through corners.
  - Large tokens (2×2, 3×3) remain snapped pixel-perfect to grid squares.
  - Smart routing gracefully turns off on gridless maps.
  - Ghost trails in combat now stay reliably visible even when intermediate combat updates happen (like taking damage).

=======================================

# Phil's PF2e Action Colours v1.7.0

**Performance Optimizations & Refinements:**

- Faster response times during token drag-and-drop.
- More reliable routing around obstacles during combat.
- Improved Ghost Trail display across multiple movement types (Fly, Swim, Climb).
- Cleaned up settings and translation files.

=======================================

# Phil's PF2e Action Colours v1.6.3

**Foundry V14 Support & Fixes:**

- Verified compatibility and canvas rendering for Foundry V14.
- Fixed an issue where the Ghost Trail would occasionally take incorrect diagonal shortcuts.
- Improved performance during long straight movements.

=======================================

# Phil's PF2e Action Colours v1.6.0

**Smart Routing & Ghost Trail:**

- Tokens automatically route around walls when dragging.
- Hovering over a token during combat reveals its movement path for the current round.
- Distinct color coding for 1st, 2nd, and 3rd action distances.
