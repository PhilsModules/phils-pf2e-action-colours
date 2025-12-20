# Phil's PF2e Action Colours 🚥

![Foundry v13 Compatible](https://img.shields.io/badge/Foundry-v13-brightgreen)
![Foundry v12 Compatible](https://img.shields.io/badge/Foundry-v12-green)
![License](https://img.shields.io/badge/License-GPLv3-blue)
![Version](https://img.shields.io/badge/Version-1.3.2-orange)


<a href="Updates.md"><img src="https://img.shields.io/badge/CHECK-Changelog-blue" style="height: 25px;"></a>
<a href="https://www.patreon.com/PhilsModules"><img src="https://img.shields.io/badge/SUPPORT-Patreon-ff424d?logo=patreon" style="height: 25px;"></a>

**Phil's PF2e Action Colours** brings the Pathfinder 2e **3-Action Economy** visualization to Foundry V13.
It upgrades the native Token Drag Measurement with clear, color-coded sections showing exactly how many actions a move will cost.

> [!NOTE]
> **Spiritual Successor**
> This module is a spiritual successor to the legendary [Drag Ruler](https://github.com/manuelVo/foundryvtt-drag-ruler), reimagined for Foundry V13.


## 🚀 Key Features

*   **Smart Routing (New!):** When dragging a token, it automatically calculates the shortest path **around walls** (A* Pathfinding). No more clipping!
*   **Speed (New!):** Highly optimized Pathfinding (Binary Heap + Octile Heuristic). Calculates routes 10x-50x faster.
*   **Ghost Trail (New!):** Hover over a token during combat to see the exact path it took this turn.
*   **3-Action Economy Colors:**
    *   🟢 **Green:** 1 Action (Walk)
    *   🟡 **Yellow:** 2 Actions (Dash)
    *   🟠 **Orange:** 3 Actions (Double Dash)
    *   🔴 **Red:** Unreachable
*   **PF2e Native:** Automatically reads your character's speed from `system.movement.speeds`, handling all system modifiers correctly.
*   **v13 Optimized:** An ultralight overlay for Foundry v13's core measurement. No conflicts, native performance.
*   **Ultra Fast:** Pathfinding calculations take **~3ms** on average (verified by benchmark), ensuring 60 FPS smoothness even on large maps.
*   **Configurable:** Change colors or disable the 3rd ring if you prefer a simpler 2-step view.

## 🤓 Technical Details: Pathfinding
The module uses a custom implementation of the **A* (A-Star) Algorithm** to calculate routes around walls in real-time.
*   **Binary Heap:** Used for the `openSet` to ensure $O(log n)$ time complexity for insertions and retrievals, making it highly scalable for long distances.
*   **Octile Distance:** The heuristic function uses Octile Distance (instead of Manhattan) to accurately calculate costs for 8-way movement (diagonal movement costs $\approx 1.5x$).

## 📦 Installation

1.  Open Foundry VTT -> **Add-on Modules**.
2.  Click **Install Module**.
3.  Paste Manifest URL:
    ```
    https://github.com/PhilsModules/phils-pf2e-action-colours/releases/latest/download/module.json
    ```
4.  Click **Install**.

## 📖 How to Use

1.  **Configure:** Go to **Settings -> Phil's PF2e Action Colours**.
    *   Set **Dash Multiplier** to `3` to enable the full 3-action economy view.
2.  **Move:** Drag your token. The ruler will instantly show:
    *   **Green** for your first action.
    *   **Yellow** when you dip into your second action.
    *   **Orange** when you use your third action.
    *   **Red** if you can't reach it.

---

# 🇩🇪 Deutsche Anleitung

**Phil's PF2e Action Colours** visualisiert die **3-Aktionen-Ökonomie** von Pathfinder 2e direkt in Foundry V13.
Es erweitert die native Bewegungsmessung um klare Farbbereiche, die dir sofort zeigen, wie viele Aktionen eine Bewegung kostet.

> [!NOTE]
> **Geistiger Nachfolger**
> Dieses Modul ist ein geistiger Nachfolger des legendären [Drag Ruler](https://github.com/manuelVo/foundryvtt-drag-ruler), neu interpretiert für Foundry V13.


## 🚀 Funktionen

*   **Smart Routing (Neu!):** Tokens laufen beim Ziehen automatisch um Wände herum (A* Pfadfindung). Nie wieder "durch die Wand"!
*   **Ghost Trail (Neu!):** Fahre im Kampf über ein Token, um genau zu sehen, welchen Weg du in dieser Runde genommen hast.
*   **3-Aktionen Farben:**
    *   🟢 **Grün:** 1 Aktion
    *   🟡 **Gelb:** 2 Aktionen
    *   🟠 **Orange:** 3 Aktionen
    *   🔴 **Rot:** Unerreichbar
*   **PF2e Integriert:** Liest automatisch die Geschwindigkeit aus (`system.movement.speeds`), inklusive aller Boni/Mali.
*   **v13 Optimiert:** Ein leichtgewichtiges Overlay für den Foundry v13 Core.

## 📦 Installation

1.  Foundry VTT öffnen -> **Add-on Module**.
2.  **Modul Installieren** klicken.
3.  Manifest-URL einfügen:
    ```
    https://github.com/PhilsModules/phils-pf2e-action-colours/releases/latest/download/module.json
    ```
4.  **Installieren** klicken.

---

## 👨‍💻 Author
* **Phil** (GitHub: [PhilsModules](https://github.com/PhilsModules))


## 📄 License
This module is licensed under the [GNU General Public License v3.0](LICENSE).

---
<div align="center">
    <h2>❤️ Support the Development</h2>
    <p>If you enjoy this module and want to support open-source development for Foundry VTT, check out my Patreon!</p>
    <p>Gefällt dir das Modul? Unterstütze die Weiterentwicklung auf Patreon!</p>
    <a href="https://www.patreon.com/PhilsModules">
        <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patron" />
    </a>
    <p>Made with ❤️ for the Foundry VTT Community</p>
</div>
