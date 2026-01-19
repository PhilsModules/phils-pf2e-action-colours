# Phil's PF2e Action Colours v1.6.2

**Ghost Trail Visual Overhaul (Zig-Zag Fix):**

- **Smooth Straight Lines:** Fixed the logic that forced the Ghost Trail to "snap" to grid centers (causing a "Zig-Zag" or "Staircase" effect). Straight lines are now rendered as smooth, direct vectors, matching the Ruler's appearance.
- **Robust Alignment:** Implemented a new "Relative Offset" system for aligning the trail. Instead of guessing whether a path is centered or top-left based on grid size, we now calculate the exact vector difference between the Token's Top-Left corner and the Ruler's Start Point. This guarantees pixel-perfect alignment for **all token sizes** (including 2x2, 3x3, etc.).
- **Correct Color Segments:** Restored "Path Densification" (generating intermediate points) for straight lines without the Zig-Zag side effect. This ensures the trail is correctly colored (Green -> Yellow -> Orange) based on action cost, even for long straight movements.

=======================================

# Phil's PF2e Action Colours v1.6.1

**Ghost Trail Fix (Drag & Drop):**

- **Deferred Recording:** Rewrote Drag & Drop logic to defer recording the Ghost Trail until the movement is _completed_ and _validated_.
- **Wall Safety:** If a Drag & Drop move hits a wall (or is cancelled), the Ghost Trail now correctly stops at the wall instead of projecting through it.
- **Accurate Tracking:** Fixed issues where "Intended" paths were shown instead of "Actual" paths, eliminating "fake" straight lines.

=======================================

# Phil's PF2e Action Colours v1.6.0

**Smart Routing & Ghost Trail Overhaul:**

- **Smart Routing Fixes:**
  - **Combat Only:** Fixed a bug where "Smart Routing" was ignoring the "Combat Only" setting.
  - **Corner Clipping:** Fixed tokens incorrectly clipping through corners due to overly aggressive optimization.
  - **Gridless Support:** Smart Routing is now automatically disabled on Gridless maps to prevent "Staircase" movement.
- **Ghost Trail Fixes:**
  - **Fallback:** Fixed Ghost Trail showing "phantom paths" through walls when Smart Routing was disabled/blocked.
  - **Coloring:** Fixed Ghost Trail appearing incorrectly monochrome (Orange) instead of multi-colored.

**Bugfixes:**

- Fixed "Undefined Property" crash in Ruler logic logic.
- Fixed unexpected behavior when pathfinding encounters invalid segments.

=======================================

# Phil's PF2e Action Colours v1.5.0

**Major Feature: Native Movement Support (Land, Fly, Swim, Burrow)**

- **System Integration:** The module now natively reads your actor's specific movement speeds directly from the PF2e system data.
- **Multiple Movement Types:** Fully supports **Fly**, **Swim**, **Burrow**, and **Climb** speeds!
  - **How to use:** Right-click during a drag to open the **Movement Action Control** and select your movement type (e.g., Fly). The ruler colors will instantly update to match your Fly speed (e.g., 60ft instead of 25ft Land).
- **Accurate Action Tracking:** Costs are calculated using the system's native logic, ensuring difficult terrain and other modifiers are handled 100% correctly.

**Fixes & Improvements:**

- **Smart Routing "Swerve" Fix:** Large tokens now move in a perfectly straight line on open ground. Added a "Line of Sight" optimization that bypasses complex pathfinding when no walls obstruct the path.
- **Ghost Trail Recovery:** Straight-line movements (bypassing pathfinding) now correctly generate a "Dense Path" so the Ghost Trail feature continues to work seamlessly.
- **V13 Compatibility:**
  - Fixed `Ray` deprecation warning.
  - Fixed `system.attributes.speed` deprecation warning.
  - Fixed crash caused by removed `canvas.walls.checkCollision` API.

=======================================

# Phil's PF2e Action Colours v1.4.1

- Manifest cleanup and normalization.

=======================================

# Phil's PF2e Action Colours v1.4.0

**New Feature: Teleport Mode!**

- **Alt-Teleport:** Hold the **Alt** key (Left or Right) while dragging a token to bypass Pathfinder.
  - The path will draw a straight line through walls and obstacles.
  - Dropping the token while holding **Alt** will teleport it instantly (skipping walk animation).

=======================================

# Phil's PF2e Action Colours v1.3.3

**Fixes:**

- **Pathfinding (Small Tokens):** Resolved issue where small tokens would "zig-zag" or be forced to the center of grid cells. Movement now respects exact start/end positions while smoothing intermediate steps.
- **Deprecation Warning:** Fixed `system.attributes.speed` deprecation warning by updating migration logic to catch all variant settings.

=======================================

# Phil's PF2e Action Colours v1.3.2

**Ghost Trail Visuals & Accuracy Refinement:**

- **No More Dots:** The Ghost Trail is now a clean, continuous line without cluttering dots on every grid square.
- **Perfect Color Sync:** Reworked the path distance calculation to match the grid precisely. The line segments (Green/Yellow/Orange) now transition exactly at the grid borders, consistent with PF2e's 5-10-5 diagonal movement rules.
- **Steppy Alignment:** To ensure this perfect color/distance accuracy, the trail now follows the "Zig-Zag" (or Steppy) center-to-center path of the grid squares. This elimination of valid but "straight-cut" lines ensures that the visual representation matches the mathematical cost 1:1.
- **Failsafe:** Added robust error handling to the Smart Finding algorithm to prevent regressions to "Straight Lines" when pathfinding encounters edge cases.

=======================================

# Phil's PF2e Action Colours v1.3.1

**Bugfixes:**

- **Critical Fix:** Resolved a `ReferenceError: api is not defined` that caused errors when dragging tokens with the Ghost Trail active.

=======================================

# Phil's PF2e Action Colours v1.3.0

**Performance & Stability Update:**

- **Performance:** Ghost Trail pathfinding is now verified to run at **~3ms** (Heatmap Benchmark).
- **Bugfix:** Fixed the "Double Line"/"Zigzag" visual artifacts on the Ghost Trail.
- **Bugfix:** Fixed "Closed Loop" artifacts where the trail would snap back to the start position incorrectly.
- **Engine:** Improved path smoothing and "Cooldown" logic to reject noise from drag-and-drop operations.

=======================================

# Phil's PF2e Action Colours v1.2.1

**Performance Update:**

- **Faster Pathfinding:** Rewrote the routing algorithm to use a Binary Heap and Octile Heuristic. This results in 10x-50x faster calculations, preventing UI freezes on long distances.
- **Dependency Update:** Updated module manifest to use Foundry V13's new `relationships` structure for dependencies.

=======================================

**New Major Features:**

- **Smart Routing (New!):** Tokens now automatically route around walls when dragging (A\* Pathfinding).
- **Ghost Trail (New!):** Hover over a token during combat to see the exact path it took this turn.
- **Foundry V13 Support:** Fully optimized for the new V13 grid architecture.

**Changes & Improvements:**

- **Rebranding:** Now "Phil's PF2e Action Colours".
- **Spiritual Successor:** This module carries on the legacy of the original Drag Ruler as a spiritual successor.
- **Stability:** Fixes for pathfinding crashes and circular reference issues.
