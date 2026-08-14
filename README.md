<div align="center">

# Phil's PF2e Action Colours 🚥

![Foundry v14 Compatible](https://img.shields.io/badge/Foundry-v14-brightgreen?style=flat-square) ![Foundry v13 Compatible](https://img.shields.io/badge/Foundry-v13-green?style=flat-square) ![License](https://img.shields.io/badge/License-GPLv3_%2F_CC_BY--NC--ND-blue?style=flat-square)
[![Version](https://img.shields.io/badge/Version-2.0.0-orange?style=flat-square)](https://github.com/PhilsModules/phils-pf2e-action-colours/releases) [![Patreon](https://img.shields.io/badge/SUPPORT-Patreon-ff424d?style=flat-square&logo=patreon)](https://www.patreon.com/PhilsModules)

<br>

**Phil's PF2e Action Colours brings the Pathfinder 2e Remaster 3-Action (and 4-Action Quickened) Economy visualization to Foundry V13 & V14.**
<br>
_Phil's PF2e Action Colours visualisiert die 3-Aktionen- (und 4-Aktionen-Beschleunigt) Ökonomie von Pathfinder 2e Remaster direkt in Foundry V13 & V14._

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
> **English:** This module is a spiritual successor to the legendary [Drag Ruler](https://github.com/manuelVo/foundryvtt-drag-ruler), reimagined and modernized for Pathfinder 2e Remaster on Foundry V13+.
>
> **Deutsch:** Dieses Modul ist ein geistiger Nachfolger des legendären [Drag Ruler](https://github.com/manuelVo/foundryvtt-drag-ruler), neu interpretiert und modernisiert für Pathfinder 2e Remaster in Foundry V13+.

<br>

---

<br>

# <img src="https://flagcdn.com/48x36/gb.png" width="28" height="21" alt="EN"> English Instructions

**Phil's PF2e Action Colours** brings the Pathfinder 2e **3-Action (and 4-Action Quickened) Economy** visualization to Foundry V13 and V14.
It upgrades native Token Drag Measurement with clear, color-coded sections showing exactly how many actions a movement will cost.

## 🚀 Key Features

- **👁️ Full Accessibility & 3 Colorblind Modes:**
  - **Red-Green (Deuteranopia):** Scientifically tuned high-contrast palette (Cobalt Blue, Sun Yellow, Amber Orange, Violet, Brick Red).
  - **Red-Green (Protanopia):** Tuned for red-deficiency (Sky Blue, Yellow, Orange, Deep Blue, Magenta).
  - **Blue-Yellow (Tritanopia):** Distinct palette (Emerald Mint, Soft Rose, Crimson, Silver White, Charcoal Dark).
- **PF2e Remaster Dynamic Condition Engine:**
  - 🛌 **Prone:** Automatically restricts movement along the ground to **Crawl** at 5 ft per action.
  - 🏃 **Feat Support:** Automatically recognizes feats like **Nimble Crawl** (half or full speed crawl) and **Swift Sneak** (full speed sneak).
  - 🛑 **Movement Blocked:** Tokens that are **Immobilized, Paralyzed, Restrained, Grabbed, Petrified, or Unconscious** immediately show the entire ruler in red.
  - ⏳ **Slowed & Stunned:** Dynamically reduces your action budget; excessive distance turns Red.
  - ⚡ **Quickened (Haste):** Automatically unlocks a dynamic **4th Action ring** (Cyan/Light Blue)!
- **Smart Routing:** Dragging a token automatically routes around walls without clipping through corners.
  - _Note: Automatically disabled on **Gridless** and Hex maps to ensure smooth movement._
- **Ghost Trail:** Hover over a token during combat to see the exact path it took this turn.
- **Action Economy Colors:**
  - 🟢 **Green:** 1 Action (1× Stride)
  - 🟡 **Gold-Yellow:** 2 Actions (2× Stride)
  - 🟠 **Orange:** 3 Actions (3× Stride)
  - 🔵 **Cyan:** 4 Actions (Quickened / Haste)
  - 🔴 **Red:** Unreachable / Movement Blocked
- **Modern Side-by-Side Settings Menu:**
  - Compact 2-column configuration window designed for all screen sizes and laptops.
  - Real-time Live Action Ruler preview bar.
  - 1-Click presets for Style (*Standard, Vibrant Neon, Pastel Soft*) and Accessibility (*Deuteranopia, Protanopia, Tritanopia*).
- **Multiple Speeds:** Supports Fly, Swim, Burrow, and Climb! Right-click while dragging to switch movement types.
- **Teleport Mode (GM Only):** Hold **Alt** to ignore walls and drop to teleport instantly (skipping walk animation).
- **Foundry V13 & V14 Optimized:** Ultra-lightweight native overlay with instant response times.

## 📦 Installation

1.  Open Foundry VTT -> **Add-on Modules**.
2.  Click **Install Module**.
3.  Paste Manifest URL:
    ```text
    https://github.com/PhilsModules/phils-pf2e-action-colours/releases/latest/download/module.json
    ```
4.  Click **Install**.

## 📖 How to Use

1.  **Configure:** Go to **Configure Settings -> Module Settings -> Phil's PF2e Action Colours** and click **Open Configuration** to customize colors or select a preset.
2.  **Move:** Drag your token.
    - **Alternate Speed:** Right-click on the token to open the **Movement Action Control** and switch to Fly/Swim/Burrow speed.
3.  The ruler will instantly show:
    - **Green** for your 1st action.
    - **Yellow** when dipping into your 2nd action.
    - **Orange** when using your 3rd action.
    - **Cyan** if you are Quickened and have a 4th action.
    - **Red** if the target is unreachable or movement is blocked.

<br>

---

<br>

# <img src="https://flagcdn.com/48x36/de.png" width="28" height="21" alt="DE"> Deutsche Anleitung

**Phil's PF2e Action Colours** visualisiert die **3-Aktionen- (und 4-Aktionen-Beschleunigt) Ökonomie** von Pathfinder 2e Remaster direkt in Foundry V13 und V14.
Es erweitert die native Bewegungsmessung um klare Farbbereiche, die dir sofort zeigen, wie viele Aktionen eine Bewegung kostet.

## 🚀 Funktionen

- **👁️ Barrierefreiheit & 3 Farbfehlsichtigkeits-Modi:**
  - **Rot-Grün (Deuteranopie / Grünschwäche):** Wissenschaftlich optimierte Kontrastpalette (Kobaltblau, Sonnengelb, Orange, Rotviolett, Ziegelrot).
  - **Rot-Grün (Protanopie / Rotsehschwäche):** Spezielle Palette (Himmelblau, Gelb, Orange, Tiefblau, Magenta).
  - **Blau-Gelb (Tritanopie / Blaublindheit):** Klare Farbpalette (Smaragdgrün, Zartrosa, Karmesinrot, Silberweiß, Dunkelschiefer).
- **PF2e Remaster Zustandserkennung:**
  - 🛌 **Liegend (Prone):** Schaltet Bewegung automatisch auf **Kriechen (Crawl)** mit 5 Fuß pro Aktion um.
  - 🏃 **Talenterkennung:** Erkennt Talente wie **Flinkes Kriechen (Nimble Crawl)** und **Schnelles Schleichen (Swift Sneak)** vollautomatisch.
  - 🛑 **Bewegungsunfähig / Gelähmt / Gefesselt / Bewusstlos:** Setzt die Reichweite auf 0 ft (Lineal wird sofort rot).
  - ⏳ **Verlangsamt (Slowed) & Betäubt (Stunned):** Reduziert das Aktionsbudget dynamisch; überzählige Distanzen werden rot.
  - ⚡ **Beschleunigt (Quickened / Hast):** Schaltet automatisch einen **4. Aktionsring** (Cyan/Hellblau) frei!
- **Smart Routing:** Tokens laufen beim Ziehen automatisch um Wände herum, ohne an Ecken hängenzubleiben.
  - _Hinweis: Wird auf Karten ohne Raster (**Gridless**) oder Hex-Karten automatisch deaktiviert._
- **Ghost Trail:** Fahre im Kampf über ein Token, um genau zu sehen, welchen Weg es in dieser Runde genommen hat.
- **Aktionen-Farben:**
  - 🟢 **Grün:** 1 Aktion (1× Schreiten)
  - 🟡 **Gold-Gelb:** 2 Aktionen (2× Schreiten)
  - 🟠 **Orange:** 3 Aktionen (3× Schreiten)
  - 🔵 **Cyan:** 4 Aktionen (Beschleunigt / Quickened)
  - 🔴 **Rot:** Unerreichbar / Blockiert
- **Modernes 2-Spalten-Einstellungsmenü:**
  - Kompaktes Konfigurationsfenster im Quest-Tracker-Design für alle Bildschirmgrößen und Laptops.
  - Live-Lineal-Vorschau in Echtzeit.
  - 1-Klick-Paletten für Design (*Standard PF2e, Vibrant Neon, Pastel Soft*) und Barrierefreiheit (*Deuteranopie, Protanopie, Tritanopie*).
- **Mehrere Geschwindigkeiten:** Unterstützt Fliegen, Schwimmen, Graben und Klettern! Rechtsklick beim Ziehen, um den Bewegungstyp zu ändern.
- **Teleport Modus (Nur GM):** Halte **Alt** gedrückt, um Wände zu ignorieren und ohne Animation sofort zu teleportieren.
- **v13 & v14 Optimiert:** Leichtgewichtig, blitzschnell und ohne Konflikte.

## 📦 Installation

1.  Foundry VTT öffnen -> **Add-on Module**.
2.  **Modul Installieren** klicken.
3.  Manifest-URL einfügen:
    ```text
    https://github.com/PhilsModules/phils-pf2e-action-colours/releases/latest/download/module.json
    ```
4.  **Installieren** klicken.

## 📖 Bedienung

1.  **Konfiguration:** Gehe zu **Einstellungen -> Moduleinstellungen -> Phil's PF2e Action Colours** und klicke auf **Konfiguration öffnen**, um Farben oder Presets anzupassen.
2.  **Bewegen:** Ziehe dein Token.
    - **Alternative Geschwindigkeit:** Rechtsklick auf das Token, um die **Movement Action Control** zu öffnen und auf Fliegen/Schwimmen etc. zu wechseln.
3.  Das Lineal zeigt sofort:
    - **Grün** für deine 1. Aktion.
    - **Gelb** wenn du die 2. Aktion anbrichst.
    - **Orange** wenn du die 3. Aktion nutzt.
    - **Cyan** wenn du beschleunigt bist und eine 4. Aktion hast.
    - **Rot** wenn das Ziel unerreichbar oder die Bewegung blockiert ist.

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
