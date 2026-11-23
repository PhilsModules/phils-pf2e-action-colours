# Phil's PF2e Action Colours v4.1.4 (2026-11-23)

🎛️ **GM World Master Switches, "While Dragging" Tactical Mode & 1-Click Feature Controls!**

### 🌟 Key Highlights:

- 🌐 **World Master Switch for Tactical Cover & Flanking Banners:**
  - **Global GM Toggle:** Added a new Game Master world toggle (**Enable Tactical Sightlines & Cover Banners (World)**) at the top of the *Tactical Preview* tab. Turning this switch off disables the on-map `Target +1 / +2 / +4 AC`, `Your Cover`, and `Flanked (-2 AC)` banners globally across the entire world for all connected players.

- 🖱️ **New "While Dragging" Display Mode:**
  - **No Idle Combat Banners:** Added **While Dragging** to the *Tactical Preview* options for groups who want live sightlines and cover banners while actively dragging a token to plan movement, without banners remaining visible above stationary selected tokens during combat.

- ⚡ **1-Click GM Master Feature Controls:**
  - **Disable All Tactical & Stealth:** Added a quick **Disable All Tactical & Stealth** button at the top of the *Tactical Preview* tab so Game Masters can turn off all tactical banners, automatic attack cover, the stealth assistant, and visibility hover badges in one click.
  - **Classic Ruler Mode (All Extra Features Off):** Added a **GM Feature Master Control** card under *System & Profiles* with **Classic Ruler Only (All Off)** and **Enable All Features** buttons so Game Masters can disable all optional routing, tactical, stealth, condition, and ghost trail features at once to run only the classic colored movement ruler.

=======================================

# Phil's PF2e Action Colours v4.1.3 (2026-11-23)

🛡️ **Accurate Attack-Direction Cover Geometry & Player Cover Override Options!**

### 🌟 Key Highlights:

- 🎯 **Strict Attack-Direction Cover Calculation (Walls & Creatures):**
  - **No False Cover From Back or Side Walls:** Walls located behind a target or behind the attacker no longer grant cover when you attack from the front. Map walls drawn slightly inside the outer edge of a corridor or room square also no longer trigger false cover when a creature stands next to a wall.
  - **Directional Intervening Creature Checks:** Lesser Cover (**+1 AC**) from other creatures now only applies when a creature stands directly between the attacker and the target along the line of fire. Bystanders standing behind the target, beside a diagonal melee strike, or Tiny creatures no longer grant cover.

- 🔓 **Configurable Player Cover Override in Roll Dialogs:**
  - **Trusted Players Enabled by Default:** Inside the *Tactical Preview* settings tab, Game Masters can now choose who is allowed to adjust or clear detected cover inside the attack roll modifiers dialog (**GM Only**, **Trusted Players & GM**, or **All Players**). Trusted Players are enabled by default.
  - **Clear Chat Transparency:** Whenever an authorized player or the Game Master overrides detected cover down to **None** in the roll dialog, the attack chat card displays a compact note showing that the detected cover was overridden.

=======================================

# Phil's PF2e Action Colours v4.1.2 (2026-11-23)

🧚 **Tiny Creature Pathfinding & PF2e Space-Sharing Rules Fix!**

### 🌟 Key Highlights:

- 🧭 **Accurate Pathfinding for Tiny Creatures:**
  - **Direct Sub-Grid Movement:** Dragging a Tiny creature (such as a sprite or a familiar) across any part of a square now plots a direct route to the target spot instead of drifting into neighboring rows or columns before turning back.
  - **Centered Obstacle Routing:** When a Tiny token routes around walls or doorways, intermediate steps stay centered inside each grid square so distance measurements and action colors match the actual path length.

- 🐾 **PF2e Space-Sharing & Tumble Through Rules for Tiny Creatures:**
  - **Free Movement Through Tiny Enemies:** Following official Pathfinder 2e rules for moving through a creature's space, characters can now walk straight through squares occupied by Tiny enemies and end their movement there without detouring around them or triggering a **Tumble Through** check.
  - **Free Movement for Tiny Controlled Tokens:** When controlling a Tiny creature yourself, you can move freely through enemy spaces and end your movement inside their square without being blocked or prompted to roll **Acrobatics**.

=======================================

# Phil's PF2e Action Colours v4.1.1 (2026-11-21)

🎯 **Player Choice Bar When Moving While Hidden!**

### 🌟 Key Highlights:

- 👣 **Interactive Player Prompt for Hidden Movement:**
  - **Direct Player Choice:** When a player drags a **Hidden** token without rolling **Sneak** first, movement still pauses right away so their position is never spoiled. Players now receive their own quick action bar directly on screen to decide how to proceed.
  - **Roll Sneak & Move:** Clicking **Roll Sneak & Move** starts the secret PF2e **Sneak** check right away and sends the planned destination square to the Game Master. Once the Game Master confirms visibility at the target square, the token completes its move automatically.
  - **Continue & Become Visible:** Clicking **Continue & Become Visible** clears active stealth states for that character and finishes walking to the chosen destination openly. Players can also cancel the move with one click to stay hidden where they are.
  - **Automatic Sync Between Player & GM:** Whichever side acts first automatically closes the prompt bar on the other screen, keeping gameplay clean with no lingering popups.

=======================================

# Phil's PF2e Action Colours v4.1.0 (2026-11-21)

🕵️ **Party Stealth & Seek, Out-of-Combat Sneaking, GM Tumble Through Fixes & PF2e Speed Defaults!**

### 🌟 Key Highlights:

- 🤝 **Party Stealth & Seek (Configurable GM Setting):**
  - **Hide From & Seek Fellow Party Members:** Player characters can now hide from and seek allied party members inside the Stealth & Seek Assistant. The option is enabled by default and can be toggled anytime in the *Tactical Preview* tab.
  - **Clear Party Indicators & Clean Map Badges:** Allied observers and targets carry a clear **Party** tag inside the GM popup and whisper summary. On the battlemap itself, everyday lighting differences between allies stay uncluttered so badges only appear for active stealth states or conditions.
  - **Per-Player Hiding & Ownership Note:** Undetected and Hidden states apply per player across the party just as they do against monsters. Remember that Foundry still shares map vision if players have Observer permission on each other's character sheets.

- 🌙 **Full Out-of-Combat Stealth & Hidden Movement Support:**
  - **Works Behind Walls & Around Corners:** Rolling **Hide** or **Sneak** (as well as **Avoid Notice** during exploration) now evaluates nearby observers even behind walls and corners up to 60 ft away, instead of skipping them outside combat.
  - **Reliable Player Hidden-Move Prompts:** When a player drags a Hidden token without rolling **Sneak** first, movement stops immediately and the Game Master now reliably receives the quick decision bar to reveal and move, move secretly with a `?` marker, roll **Sneak**, or cancel the move.
  - **Destination Square Checks:** When the Game Master triggers a **Sneak** roll from the hidden-move prompt, lighting and cover are now evaluated directly at the planned destination square rather than the starting spot. Secret blind player **Sneak** and **Avoid Notice** rolls also unlock their follow-up move properly.

- 🤸 **GM Enemy Barrier & Live `T` Tumble Toggle Fix:**
  - **Consistent GM Movement Rules:** Dragging hostile creatures as Game Master now respects enemy barriers just like player movement, preventing enemies from walking straight through player tokens unintentionally.
  - **Working `T` Toggle for Game Masters:** Tapping **T** while dragging a hostile token as Game Master now alternates directly between routing around player tokens and tumbling straight through them.

- 🏃 **Automatic PF2e Fallback Speed Update (25 ft):**
  - **Standard PF2e Default:** Existing worlds that still had the older `30 ft` fallback speed default are updated once automatically to `25 ft` to match standard Pathfinder 2e characters, while custom speeds stay untouched.

=======================================

# Phil's PF2e Action Colours v4.0.0 (2026-11-21)

🚀 **PF2e Stealth & Seek Assistant, Per-Player Visibility, Automatic Attack Cover, Unlimited Routing & Persistent Tactical Badges!**

### 🌟 Key Highlights:

- 👁️ **PF2e Stealth & Seek Assistant & True Per-Player Visibility (GM Only):**
  - **Roll-Driven GM Dialog:** Automatically opens for the Game Master on **Hide**, **Sneak**, **Seek**, and **Avoid Notice** rolls. Evaluates secret checks against opposing Perception DCs alongside scene lighting (Bright Light through Darkness), creature senses (including Darkvision and Low-Light Vision), and cover prerequisites (plus optional GM whisper summaries).
  - **True Per-Player Token Visibility:** Creatures marked **Undetected** against a player vanish completely from that player's screen while staying visible to the Game Master and owning players. Creatures marked **Hidden** render semi-transparent.
  - **Last Known Position (`?`) Markers:** When a Hidden creature successfully uses **Sneak** to become Undetected, opposing players see a subtle `?` marker on its previous square instead of watching the enemy move across the map.
  - **Hidden Movement Anti-Spoiler Guard:** Dragging a Hidden token without rolling **Sneak** first pauses movement immediately with a warning notification so the secret location stays hidden. Only the Game Master gets quick decision buttons to reveal and move, move secretly with a `?` marker, start a **Sneak** roll, or dismiss the move.
  - **Smooth Canvas Condition Badges & GM Controls:** Hovering or selecting a token as Game Master renders PF2e condition icons (**Concealed**, **Hidden**, **Undetected**, and **Invisible**) directly on the map with zero panning stutter, complete with hover rule tooltips and 1-click overrides. Paired with a compact GM perspective bar (*Cannot See* / *Hidden From* plus *Reveal*), a Token HUD stealth button, a Scene Controls visibility reset tool, anti-spoiler Ghost Trail hiding, and automatic yield when *PF2e Visioner* is active.

- ⚔️ **Persistent Combat Tactical Badges & Quick `[V]` Toggle:**
  - **Always Visible When Selected in Combat:** *Flanked (-2 AC)* and directional cover badges (`+1 / +2 / +4` AC) now remain visible throughout combat whenever a token is selected instead of disappearing between drags. Dragging still previews live sightlines and target cover arcs.
  - **Quick Visibility Toggle (`V`):** Press **V** (customizable in settings) anytime to show or hide tactical badges and sightlines on the battlefield.

- 🛡️ **Automatic Directional Cover on PF2e Attack Rolls:**
  - **Live AC Calculation:** Attack rolls against a targeted token automatically measure corner-to-corner cover between attacker and defender (walls as well as intervening creatures) and apply the matching PF2e circumstance bonus to the target's AC.
  - **Authentic PF2e Stacking Rules:** Already active circumstance bonuses such as *Raise a Shield* or an existing cover effect are respected so cover is never double-counted, while penalties such as *Off-Guard* remain unaffected.
  - **Read-Only Player Notice & GM Override:** Inside the roll modifiers dialog, players see a read-only cover notice so the attacker cannot disable target cover. Only the Game Master receives quick override buttons to adjust or clear cover before rolling. Effective cover bonuses also show a compact badge on the attack chat card without revealing hidden enemy base AC.
  - **Flexible GM Control:** Automatic attack cover can be toggled anytime in the *Tactical Preview* tab. Game Masters can apply it automatically on every targeted attack, limit it to the roll modifiers dialog, override manually inside the dialog, or disable attack cover completely.

- 🧭 **Unlimited Map-Wide Pathfinding & Large Creature Routing:**
  - **No Distance Cap:** Tokens now plot valid paths across entire dungeons and large battlemaps without stopping early at a fixed range limit.
  - **Multi-Square Footprint Routing:** Large and oversized creatures (such as `2×2` or `3×3` tokens) now check their full body size around walls and through narrow doorways instead of squeezing through single-square gaps.
  - **Improved Wall & Corner Accuracy:** Fixed a coordinate bug that could occasionally let paths clip through walls or take detours, and resolved a Foundry V14 compatibility warning for wall sensing.

- 🚪 **Interactive Door & Tumble Through Prompts:**
  - **Open Doors Mid-Move:** Stopping in front of an unlocked closed door offers a quick prompt to open it and continue walking along the remaining planned path.
  - **Clear Tumble Through Prompts & Live Badge:** Before rolling *Tumble Through*, players can review their Acrobatics bonus and choose whether to roll or stop (or switch to instant rolling in settings). A centered status badge above the dragged token shows when *Tumble Through* is active, stacking cleanly above own-cover badges.

- 🎨 **Redesigned Configuration Window & Colorblind-Friendly Overlays:**
  - **Sidebar Navigation & Live Search:** Settings are organized into five clear sections (*Colors & Presets*, *Routing & Combat*, *Tactical Preview*, *Rules & Trail*, *System & Profiles*) inside a resizable window with instant search across all options.
  - **Clean Controls & Instant Testing:** Narrow dropdowns are replaced by full-width button bars and toggle switches. An *Apply* button lets you save and test changes directly on the canvas with an unsaved change counter.
  - **Settings Backup, Section Reset & PF2e Fallback Speed:** Export or import your settings file to transfer setups between worlds, or reset individual sections with one click. Updated the default fallback speed from `30 ft` to `25 ft` to match standard Pathfinder 2e characters.
  - **Automatic Palette Sync:** Sightlines, cover arcs, flanking highlights, and drag status badges adapt automatically to your active colorblind preset or custom color scheme, paired with distinct symbols and border patterns for clear readability.

=======================================

# Phil's PF2e Action Colours v3.1.1 (2026-11-04)

🔧 **Foundry V14 Ghost Unconstrained Movement Toggle & Drag Stability Fix!**

### 🌟 Key Highlights:

- 👻 **Restored Unconstrained Movement Button Support (Foundry V14):**
  - The native Foundry V14 "Unconstrained Movement" toggle button (ghost icon on the left scene controls palette) is now fully honored again.
  - Toggling unconstrained movement allows Game Masters to seamlessly drag tokens through walls, closed doors, and impassable terrain without needing to hold down the Alt key.

- 🛡️ **Foundry V14 Deprecation & Event Error Fixes:**
  - Resolved `Token#findMovementPath` deprecation warnings by cleanly passing `ignoreWalls` via `constrainOptions`.
  - Fixed a `TypeError: Cannot read properties of null (reading 'interactionData')` when pressing or releasing the `Alt` key without actively dragging a token.
  - Hardened internal drag event handling with defensive event fallbacks to guarantee 100% stable movement pathing in Foundry V14.

=======================================

# Phil's PF2e Action Colours v3.1.0 (2026-11-01)

⚡ **Instant In-Place Tumble Toggle, Deep Corridor Navigation & High-Performance Battlemap Routing!**

### 🌟 Key Highlights:

- 🤸 **Seamless Live Tumble-Through Switching:**
  - **Instant Route Transformation:** Tapping your hotkey (default: **T**) while dragging a token now transforms your movement route immediately in place under your mouse cursor, dynamically switching between routing around adversaries and tumbling straight through them.
  - **Zero Token Jitter:** The token sprite stays perfectly locked beneath your hand—no flickering, no sudden displacement, and no desynchronization between player and Gamemaster screens.
  - **Rock-Solid Visual Ruler:** The measurement ribbon remains crystal-clear throughout the toggle without ever flashing diagonally or vanishing from view.

- 🏰 **Deep Dungeon & Corridor Long-Distance Navigation:**
  - **Epic Path Planning:** Greatly expanded the pathfinder's exploration horizon! Characters can now plot long tactical maneuvers spanning up to 200 feet (40+ grid squares) through winding castle hallways, multi-room taverns, and twisting cavern passages.
  - **Authentic Wall Respect:** Extended journeys cleanly follow the bends and doorways of your dungeon without giving up early into straight impassable lines.

- ⚡ **Silky-Smooth Dragging & Impassable Area Protection:**
  - **Lag-Free Cursor Tracking:** Moving your token over unreachable walls, blocked architecture, or dark corners no longer causes interface stutter or micro-freezes.
  - **Foundry V14 Ready:** Streamlined internal vision and map checks to maintain fluid, silky-smooth 60 frames per second responsiveness on maps of all sizes.

- 🚪 **Faithful Tactical Doorway Approaching:**
  - The tactical path ruler continues to effortlessly guide tokens up to closed doorways in familiar action colors while signaling the impassable passage beyond in clear warning red.

=======================================

# Phil's PF2e Action Colours v3.0.0 (2026-11-01)

🤸 **Automated PF2e Tumble Through Workflow, Fog of War Anti-Spoiler Protection, Closed Door Smart Routing, Corner Ambush Detection & Live Routing Toggle!**

### 🌟 Key Highlights:

- 🤸 **Authentic PF2e Enemy Movement Barriers & Automated Tumble Through:**
  - **Tactical Stop & Skill Check:** When a creature attempts to move through an opposing enemy's space, the token now walks up to the final clear square right before the adversary, pauses, and automatically rolls a Pathfinder 2e **Tumble Through** check (Acrobatics against the enemy's Reflex DC).
  - **Dynamic Outcome Resolution:** On a **Success** or **Critical Success**, your character effortlessly tumbles through the enemy's space and continues along their remaining path—even navigating past multiple consecutive foes. On a **Failure** or **Critical Failure**, movement halts instantly in front of the defender.
  - **Illegal Destination Guard:** Ending a movement path directly inside an enemy's square will never strand a token on top of an adversary; movement automatically halts safely on the last unoccupied space without rolling.
  - **Flexible Out-of-Combat Options:** While combat encounters always enforce the authentic Tumble Through rules, Game Masters can freely choose how exploration mode behaves in the module settings: automatically roll the check, halt peacefully before enemies, or ignore creature collisions for swift freeform travel.

- 🌫️ **Fog of War Anti-Spoiler Protection & Explored Map Routing:**
  - **Explored Territory Navigation:** Intelligent pathfinding now effortlessly guides creatures through previously explored rooms and hallways, even when those areas are currently shrouded in darkness or outside the creature's direct line of sight.
  - **Total Anti-Spoiler Shield:** Dragging a token toward unknown, unexplored darkness instantly switches the path and preview tiles to warning red. This guarantees that path calculation never inadvertently reveals hidden corridors, secret chambers, or dungeon layouts through the fog of war.
  - **Movement Prevention & Clear Warnings:** Dropping a token into unexplored fog safely cancels the movement and displays an on-screen warning that the destination is unknown.
  - **Game Master Control:** I have included an option in the Routing settings allowing Game Masters to enable or disable fog-of-war path restrictions anytime.

- 🚪 **Closed Door Smart Routing & Automatic Door Stops:**
  - **Clear Obstacle Feedback:** When planning a path through an explored dungeon room blocked by closed or locked doors, the tactical path preview cleanly shows the path up to the door in familiar action colors, while turning bright warning red beyond the doorway. Secret doors remain completely hidden and impassable.
  - **Automatic Approach & Halt:** Releasing a token on the far side of a closed door automatically walks your creature right up to the doorstep, stops in front of the door, and displays a friendly notice that the door is closed—safely respecting any obstacles or ambushes along the way.
  - **Impassable Boundaries:** Locations locked behind solid walls or undiscovered secret doors are clearly marked with an impassable red path and will not trigger movement on drop.

- 👁️ **Corner Ambush Detection & Line-of-Sight Interception:**
  - **Zero Metagaming in the Shadows:** Hidden, invisible, or lurking adversaries in explored rooms remain completely concealed during drag previews—the movement ruler never gives away surprise ambushes in advance.
  - **Real-Time Ambush Halt & Decision:** When a moving creature rounds a corner and suddenly spots an unseen enemy standing along their planned route, movement pauses immediately at the exact square where line of sight is gained. An interactive dialog prompts the player:
    - **Replan Movement:** Cancel remaining movement right at the corner to assess the threat and choose a new tactic.
    - **Charge Forward:** Continue the journey, tumbling past or confronting the newly revealed enemy.

- 🧭 **Intelligent Enemy Avoidance vs. Intentional Tumble Through:**
  - **Precise Creature Boundary Detection:** Intelligent pathfinding now cleanly navigates around visible enemies of all sizes—including tiny creatures and small tokens—without clipping their occupied spaces.
  - **Corridor Chokepoints:** If a doorway or narrow passage is completely blocked by a foe, or if walking around requires an impractical detour, the path automatically adapts to plot a course directly through the opponent.
  - **Instant Live Tumble Toggle:** Players can simply tap a hotkey (default: **T**) while dragging a token to seamlessly toggle between routing safely around enemies and tumbling directly through them. The tactical ruler and colors update instantly beneath the cursor.
  - **Individual Hotkey Customization:** Every player can easily bind their own preferred hotkey in the settings menu to avoid conflicts with personal keybindings.

- ⚡ **Silky-Smooth Performance & Lightning-Fast Routing:**
  - **Instant Exploration Feedback:** Hovering over unexplored darkness immediately displays the blocked path warning with zero interface lag, bypassing heavy background calculations.
  - **Streamlined Visual Updates:** The tactical ruler and highlighted grid tiles update with rock-solid 60 frames per second responsiveness on maps of any size.
  - **High-Speed Path Caching:** I have optimized spatial checks and intelligent route caching so that dragging tokens across sprawling battlemaps feels completely seamless and responsive.

- 🎨 **Clean Exploration Color Palette:**
  - In active combat encounters, the ruler displays familiar tactical action economy colors (1 Action = Green, 2 Actions = Yellow, 3 Actions = Orange, 4 Actions = Cyan).
  - Outside of combat, the interface cleanly switches to a streamlined exploration palette: vibrant green for open movement and warning red for blocked obstacles, closed doors, walls, or unexplored fog.


- 🪄 **Unrestricted Alt-Teleport for Game Masters:**
  - I have introduced full map teleportation! Game Masters can hold the **Alt key** at any time while dragging tokens across the scene.
  - Moving tokens with Alt completely bypasses all walls, doors, elevated barriers, and difficult terrain across the entire map.
  - Releasing the token instantly teleports it to the chosen destination without walking animations or travel delays.
  - Action ruler measurement bands and highlight rings are smoothly concealed during teleportation for an unobstructed view of the battlefield.
  - Combat ghost trails remain pristine and avoid drawing unwanted stride paths straight through walls.
  - Fully toggleable anytime in the module configuration window under *PF2e Rules & Routing*.

=======================================

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
