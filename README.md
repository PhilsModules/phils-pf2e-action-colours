<div align="center">

# Phil's PF2e Action Colours 🚥

![Foundry v14 Compatible](https://img.shields.io/badge/Foundry-v14-brightgreen?style=flat-square) ![Foundry v13 Compatible](https://img.shields.io/badge/Foundry-v13-green?style=flat-square) ![Foundry v12 Compatible](https://img.shields.io/badge/Foundry-v12-green?style=flat-square) ![License](https://img.shields.io/badge/License-GPLv3_%2F_CC_BY--NC--ND-blue?style=flat-square)
[![Version](https://img.shields.io/badge/Version-1.6.3-orange?style=flat-square)](https://github.com/PhilsModules/phils-pf2e-action-colours/releases) [![Patreon](https://img.shields.io/badge/SUPPORT-Patreon-ff424d?style=flat-square&logo=patreon)](https://www.patreon.com/PhilsModules)

<br>

**Phil's PF2e Action Colours brings the Pathfinder 2e 3-Action Economy visualization to Foundry V13.**
<br>
_Phil's PF2e Action Colours visualisiert die 3-Aktionen-Ökonomie von Pathfinder 2e direkt in Foundry V13._

<br>

<a href="#-english-instructions"><img src="https://img.shields.io/badge/%20-English_Instructions-black?style=for-the-badge&logo=united-kingdom&logoColor=white" alt="English Instructions"></a> <a href="#-deutsche-anleitung"><img src="https://img.shields.io/badge/%20-Deutsche_Anleitung-black?style=for-the-badge&logo=germany&logoColor=red" alt="Deutsche Anleitung"></a> <a href="Updates.md"><img src="https://img.shields.io/badge/%20-Update_Logs-black?style=for-the-badge&logo=clock&logoColor=white" alt="Updates"></a>

</div>

<br>

> [!NOTE]
> **A Quick Note / Hinweis in eigener Sache**
>
> 🇬🇧 **Hi everyone!**  
> A quick note before you start: I create these modules completely in my free time and offer them to the community for free. Since neither my partner nor I are professional graphic designers, translators, or full time developers, maintaining these projects takes a huge amount of effort. To make these modules possible, we use assistance from artificial intelligence, especially for translations and visual elements. Hiring professional designers or translators is simply something we cannot afford out of pocket.
> 
> If these modules should ever be removed from the official Foundry package listing due to rules regarding artificial intelligence, do not worry. The project will continue! You can always find all updates, releases, and support directly here on GitHub.
> 
> Thank you so much for your understanding and support!
> 
> ---
> 
> 🇩🇪 **Hallo zusammen!**  
> Ein kleiner Hinweis in eigener Sache, bevor ihr startet: Ich erstelle diese Module komplett in meiner Freizeit und stelle sie der Community kostenlos zur Verfügung. Da weder meine Lebensgefährtin noch ich Grafikdesigner, gelernte Übersetzer oder hauptberufliche Entwickler sind, ist die Pflege extrem aufwendig. Um die Module in dieser Form überhaupt anbieten zu können, nutzen wir Hilfe von künstlicher Intelligenz, zum Beispiel für Übersetzungen und grafische Elemente. Professionelle Designer oder Übersetzer können wir uns privat schlicht nicht leisten.
> 
> Sollten die Module wegen der Nutzung von künstlicher Intelligenz oder veränderter Richtlinien irgendwann aus dem offiziellen Verzeichnis von Foundry gelöscht werden, müsst ihr euch keine Sorgen machen. Das Projekt stirbt nicht! Ihr findet alle Updates, neue Versionen und Unterstützung bei Problemen weiterhin direkt hier auf GitHub.
> 
> Vielen Dank für euer Verständnis und eure Unterstützung!

<br>

> [!NOTE]
>
> ### Spiritual Successor / Geistiger Nachfolger
>
> **English:** This module is a spiritual successor to the legendary [Drag Ruler](https://github.com/manuelVo/foundryvtt-drag-ruler), reimagined for Foundry V13.
>
> **Deutsch:** Dieses Modul ist ein geistiger Nachfolger des legendären [Drag Ruler](https://github.com/manuelVo/foundryvtt-drag-ruler), neu interpretiert für Foundry V13.

<br>

---

<br>

# <img src="https://flagcdn.com/48x36/gb.png" width="28" height="21" alt="EN"> English Instructions

**Phil's PF2e Action Colours** brings the Pathfinder 2e **3-Action Economy** visualization to Foundry V13.
It upgrades the native Token Drag Measurement with clear, color-coded sections showing exactly how many actions a move will cost.

## 🚀 Key Features

- **Smart Routing:** When dragging a token, it automatically calculates the shortest path **around walls** (A\* Pathfinding). No more clipping!
  - _Note: Automatically disabled on **Gridless** maps to ensure smooth straight-line movement._
- **Speed:** Highly optimized Pathfinding (Binary Heap + Octile Heuristic). Calculates routes 10x-50x faster.
- **Teleport Mode:** Hold **Alt** to ignore walls. Drop to teleport instantly (skipping animation). (GM Only if GM Movement is active)
- **Ghost Trail:** Hover over a token during combat to see the exact path it took this turn.
- **3-Action Economy Colors:**
  - 🟢 **Green:** 1 Action (Walk)
  - 🟡 **Yellow:** 2 Actions (Dash)
  - 🟠 **Orange:** 3 Actions (Double Dash)
  - 🔴 **Red:** Unreachable
- **PF2e Native:** Automatically reads your character's speed from `system.movement.speeds`, handling all system modifiers correctly.
- **Multiple Speeds:** Supports Fly, Swim, Burrow, and Climb! Right-click while dragging to switch movement types.
- **Foundry V13 & V14 Optimized:** An ultralight overlay for Foundry's core measurement. No conflicts, native performance.

## 🤓 Technical Details: Pathfinding

The module uses a custom implementation of the **A\* (A-Star) Algorithm** to calculate routes around walls in real-time.

- **Binary Heap:** Used for the `openSet` to ensure $O(log n)$ time complexity for insertions and retrievals, making it highly scalable for long distances.
- **Octile Distance:** The heuristic function uses Octile Distance (instead of Manhattan) to accurately calculate costs for 8-way movement (diagonal movement costs $\approx 1.5x$).

## 📦 Installation

1.  Open Foundry VTT -> **Add-on Modules**.
2.  Click **Install Module**.
3.  Paste Manifest URL:
    ```text
    https://github.com/PhilsModules/phils-pf2e-action-colours/releases/latest/download/module.json
    ```
4.  Click **Install**.

## 📖 How to Use

1.  **Configure:** Go to **Settings -> Phil's PF2e Action Colours**.
    - Set **Dash Multiplier** to `3` to enable the full 3-action economy view.
2.  **Move:** Drag your token.
    - **Alternate Speed:** Right-click on the token to open the **Movement Action Control** and switch to Fly/Swim/Burrow speed.
3.  The ruler will instantly show:
    - **Green** for your first action.
    - **Yellow** when you dip into your second action.
    - **Orange** when you use your third action.
    - **Red** if you can't reach it.

<br>

---

<br>

# <img src="https://flagcdn.com/48x36/de.png" width="28" height="21" alt="DE"> Deutsche Anleitung

**Phil's PF2e Action Colours** visualisiert die **3-Aktionen-Ökonomie** von Pathfinder 2e direkt in Foundry V13.
Es erweitert die native Bewegungsmessung um klare Farbbereiche, die dir sofort zeigen, wie viele Aktionen eine Bewegung kostet.

## 🚀 Funktionen

- **Smart Routing:** Tokens laufen beim Ziehen automatisch um Wände herum (A\* Pfadfindung). Nie wieder "durch die Wand"!
  - _Hinweis: Wird auf Karten ohne Raster (**Gridless**) automatisch deaktiviert, um freie Bewegung zu ermöglichen._
- **Teleport Modus:** Halte **Alt** gedrückt, um Wände zu ignorieren. Beim Loslassen teleportiert der Token sofort (keine Laufanimation). (Nur GM, wenn GM Movement aktiv ist)
- **Ghost Trail:** Fahre im Kampf über ein Token, um genau zu sehen, welchen Weg du in dieser Runde genommen hast.
- **3-Aktionen Farben:**
  - 🟢 **Grün:** 1 Aktion
  - 🟡 **Gelb:** 2 Aktionen
  - 🟠 **Orange:** 3 Aktionen
  - 🔴 **Rot:** Unerreichbar
- **PF2e Integriert:** Liest automatisch die Geschwindigkeit aus (`system.movement.speeds`), inklusive aller Boni/Mali.
- **Mehrere Geschwindigkeiten:** Unterstützt Fliegen, Schwimmen, Graben und Klettern! Rechtsklick beim Ziehen um den Bewegungstyp zu ändern.
- **v13 Optimiert:** Ein leichtgewichtiges Overlay für den Foundry v13 Core.

## 🤓 Technische Details: Pfadfindung

Das Modul nutzt eine eigene Implementierung des **A\* (A-Star) Algorithmus** um Routen um Wände herum in Echtzeit zu berechnen.

- **Binary Heap:** Wird genutzt um $O(log n)$ Zeitkomplexität sicherzustellen, was die Berechnung auch bei langen Distanzen extrem schnell macht.
- **Octile Distance:** Die Heuristik nutzt Octile Distance (statt Manhattan), um die Kosten für diagonale Bewegungen akkurat zu berechnen (kostet $\approx 1.5x$).

## 📦 Installation

1.  Foundry VTT öffnen -> **Add-on Module**.
2.  **Modul Installieren** klicken.
3.  Manifest-URL einfügen:
    ```text
    https://github.com/PhilsModules/phils-pf2e-action-colours/releases/latest/download/module.json
    ```
4.  **Installieren** klicken.

## 📖 Bedienung

1.  **Konfiguration:** Gehe zu **Einstellungen -> Phil's PF2e Action Colours**.
    - Stelle den **Dash Multiplier** auf `3`, um die volle 3-Aktionen-Ansicht zu aktivieren.
2.  **Bewegen:** Ziehe deinen Token.
    - **Alternative Geschwindigkeit:** Rechtsklick auf den Token um die **Movement Action Control** zu öffnen und auf Fliegen/Schwimmen etc. zu wechseln.
3.  Das Lineal zeigt sofort:
    - **Grün** für deine erste Aktion.
    - **Gelb** wenn du die zweite Aktion anbrichst.
    - **Orange** wenn du die dritte Aktion nutzt.
    - **Rot** wenn das Ziel unerreichbar ist.

<br>

---

## 📜 License

This module uses a dual license structure.

- **Code:** GNU GPLv3
- **Assets:** CC BY-NC-ND 4.0

See `LICENSE` file for details.

<br>

<div align="center">
    <h2>❤️ Support the Development</h2>
    <p>If you enjoy this module and want to support open source development for Foundry VTT check out my Patreon.</p>
    <p>Gefällt dir das Modul? Unterstütze die Weiterentwicklung auf Patreon.</p>
    <a href="https://www.patreon.com/PhilsModules">
        <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patron" width="200" />
    </a>
    <br><br>
    <p><i>Made with ❤️ for the Foundry VTT Community</i></p>
</div>
