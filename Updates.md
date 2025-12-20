Phil's PF2e Action Colours v1.3.2
=======================================

**Ghost Trail Visuals & Accuracy Refinement:**
*   **No More Dots:** The Ghost Trail is now a clean, continuous line without cluttering dots on every grid square.
*   **Perfect Color Sync:** Reworked the path distance calculation to match the grid precisely. The line segments (Green/Yellow/Orange) now transition exactly at the grid borders, consistent with PF2e's 5-10-5 diagonal movement rules.
*   **Steppy Alignment:** To ensure this perfect color/distance accuracy, the trail now follows the "Zig-Zag" (or Steppy) center-to-center path of the grid squares. This elimination of valid but "straight-cut" lines ensures that the visual representation matches the mathematical cost 1:1.
*   **Failsafe:** Added robust error handling to the Smart Finding algorithm to prevent regressions to "Straight Lines" when pathfinding encounters edge cases.

=======================================

Phil's PF2e Action Colours v1.3.1
=======================================

**Bugfixes:**
*   **Critical Fix:** Resolved a `ReferenceError: api is not defined` that caused errors when dragging tokens with the Ghost Trail active.

=======================================

Phil's PF2e Action Colours v1.3.0
=======================================

**Performance & Stability Update:**
*   **Performance:** Ghost Trail pathfinding is now verified to run at **~3ms** (Heatmap Benchmark).
*   **Bugfix:** Fixed the "Double Line"/"Zigzag" visual artifacts on the Ghost Trail.
*   **Bugfix:** Fixed "Closed Loop" artifacts where the trail would snap back to the start position incorrectly.
*   **Engine:** Improved path smoothing and "Cooldown" logic to reject noise from drag-and-drop operations.

=======================================

Phil's PF2e Action Colours v1.2.1
=======================================

**Performance Update:**
*   **Faster Pathfinding:** Rewrote the routing algorithm to use a Binary Heap and Octile Heuristic. This results in 10x-50x faster calculations, preventing UI freezes on long distances.
*   **Dependency Update:** Updated module manifest to use Foundry V13's new `relationships` structure for dependencies.


=======================================

**New Major Features:**
*   **Smart Routing (New!):** Tokens now automatically route around walls when dragging (A* Pathfinding).
*   **Ghost Trail (New!):** Hover over a token during combat to see the exact path it took this turn.
*   **Foundry V13 Support:** Fully optimized for the new V13 grid architecture.

**Changes & Improvements:**
*   **Rebranding:** Now "Phil's PF2e Action Colours".
*   **Spiritual Successor:** This module carries on the legacy of the original Drag Ruler as a spiritual successor.
*   **Stability:** Fixes for pathfinding crashes and circular reference issues.
