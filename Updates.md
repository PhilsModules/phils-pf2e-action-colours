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
