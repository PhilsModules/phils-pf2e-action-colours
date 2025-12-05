# Phil's PF2e Action Colours 🚥

![Foundry v13 Compatible](https://img.shields.io/badge/Foundry-v13-brightgreen)
![Pathfinder 2e](https://img.shields.io/badge/System-PF2e-blue)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-1.1.0-orange)
[![Patreon](https://img.shields.io/badge/Support-Patreon-ff424d?logo=patreon)](https://www.patreon.com/PhilsModules)

**Phil's PF2e Action Colours** brings the Pathfinder 2e **3-Action Economy** visualization to Foundry V13.
It upgrades the native Token Drag Measurement with clear, color-coded sections showing exactly how many actions a move will cost.

> [!IMPORTANT]
> **Heavy Inspiration & Credits**
> This module is heavily inspired by the legendary [Drag Ruler](https://github.com/manuelVo/foundryvtt-drag-ruler) by **manuelVo**.
> Ideally, think of this as a v13-adapted, lightweight spiritual successor focused on visual feedback using the new Core Ruler API, with bugfixes for the latest PF2e system. All credit for the original concept goes to Manuel!

## 🚀 Key Features

*   **3-Action Economy Colors:**
    *   🟢 **Green:** 1 Action (Walk)
    *   🟡 **Yellow:** 2 Actions (Dash)
    *   🟠 **Orange:** 3 Actions (Double Dash)
    *   🔴 **Red:** Unreachable
*   **PF2e Native:** Automatically reads your character's speed from `system.movement.speeds`, handling all system modifiers correctly.
*   **v13 Optimized:** An ultralight overlay for Foundry v13's core measurement. No conflicts, native performance.
*   **Configurable:** Change colors or disable the 3rd ring if you prefer a simpler 2-step view.

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
> **Credits**
> Dieses Modul basiert stark auf dem Konzept vom großartigen [Drag Ruler](https://github.com/manuelVo/foundryvtt-drag-ruler) von **manuelVo**.
> Es ist im Grunde eine für v13 angepasste Version, die die neue Core-API nutzt und Fehler im aktuellen PF2e-System behebt. Ehre wem Ehre gebührt!

## 🚀 Funktionen

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
* **Original Concept:** [ManuelVo](https://github.com/manuelVo)

## 📄 License
This module is licensed under the [MIT License](LICENSE).

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
