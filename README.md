<div align="center">

# Phil's PF2e Action Colours 🚥

![Foundry v14 Compatible](https://img.shields.io/badge/Foundry-v14-brightgreen?style=flat-square) ![Foundry v13 Compatible](https://img.shields.io/badge/Foundry-v13-green?style=flat-square) ![License](https://img.shields.io/badge/License-GPLv3_%2F_CC_BY--NC--ND-blue?style=flat-square)
[![Version](https://img.shields.io/badge/Version-2.0.0-orange?style=flat-square)](https://github.com/PhilsModules/phils-pf2e-action-colours/releases) [![Patreon](https://img.shields.io/badge/SUPPORT-Patreon-ff424d?style=flat-square&logo=patreon)](https://www.patreon.com/PhilsModules)

<br>

**Phil's PF2e Action Colours brings the Pathfinder 2e Remaster 3-Action (and 4-Action Quickened) Economy visualization to Foundry V13 & V14.**
<br>
_Phil's PF2e Action Colours visualisiert die 3-Aktionen- (und 4-Aktionen-Beschleunigt) Ökonomie von Pathfinder 2e Remaster direkt in Foundry V13 & V14._

<br>

<a href="#-english-instructions"><img src="https://img.shields.io/badge/%20-English_Instructions-black?style=for-the-badge&logo=united-kingdom&logoColor=white" alt="English Instructions"></a> <a href="#-deutsche-anleitung"><img src="https://img.shields.io/badge/%20-Deutsche_Anleitung-black?style=for-the-badge&logo=germany&logoColor=red" alt="Deutsche Anleitung"></a> <a href="Updates.md"><img src="https://img.shields.io/badge/%20-Update_Logs-black?style=for-the-badge&logo=clock&logoColor=white" alt="Updates"></a> <a href="#-more-modules-by-phil--meine-weiteren-module"><img src="https://img.shields.io/badge/%20-More_Modules_%2F_Weitere_Module-black?style=for-the-badge&logo=github&logoColor=white" alt="More Modules / Weitere Module"></a>

</div>

<br>

> [!NOTE]
> **A Quick Note / Hinweis in eigener Sache**
>
> 🇬🇧 **Hi everyone!**  
> A quick note before you start: I create these modules completely in my free time and offer them to the community for free. Since neither my partner nor I are professional graphic designers, translators, or full-time developers, maintaining these projects takes a huge amount of effort. To make these modules possible in this form, I use assistance from artificial intelligence, especially for translations and visual elements. Hiring professional designers or translators is simply something I cannot afford out of pocket.
> 
> Because of Foundry VTT's guidelines regarding artificial intelligence, several of my modules (such as *Phil's Day and Night Cycle*, *Phil's Console Doctor*, *Phil's PF2e RealDark*, and *Phil's Universal Translator*) have been removed from the official Foundry package listing. Even if a module is no longer listed there—or if others are removed in the future—do not worry: **the projects will continue!** You can always find all my modules, updates, releases, and manifest URLs directly here on [GitHub](https://github.com/PhilsModules) (see the [full module overview below](#-more-modules-by-phil--meine-weiteren-module)).
> 
> Thank you so much for your understanding and support!
> 
> ---
> 
> 🇩🇪 **Hallo zusammen!**  
> Ein kleiner Hinweis in eigener Sache, bevor ihr startet: Ich erstelle diese Module komplett in meiner Freizeit und stelle sie der Community kostenlos zur Verfügung. Da weder meine Lebensgefährtin noch ich Grafikdesigner, gelernte Übersetzer oder hauptberufliche Entwickler sind, ist die Pflege extrem aufwendig. Um die Module in dieser Form überhaupt anbieten zu können, nutze ich Unterstützung durch künstliche Intelligenz, zum Beispiel für Übersetzungen und grafische Elemente. Professionelle Designer oder Übersetzer kann ich mir privat schlicht nicht leisten.
> 
> Aufgrund der Richtlinien von Foundry VTT rund um künstliche Intelligenz wurden bereits mehrere meiner Module (wie z. B. *Phil's Day and Night Cycle*, *Phil's Console Doctor*, *Phil's PF2e RealDark* und *Phil's Universal Translator*) aus dem offiziellen Foundry-Verzeichnis entfernt. Auch wenn ein Modul dort nicht mehr gelistet ist – oder künftig noch weitere gelöscht werden sollten – müsst ihr euch keine Sorgen machen: **Das Projekt stirbt nicht!** Ihr findet alle meine Module, Updates, neue Versionen und Manifest-Links weiterhin direkt hier auf [GitHub](https://github.com/PhilsModules) (siehe die [komplette Modul-Übersicht weiter unten](#-more-modules-by-phil--meine-weiteren-module)).
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

## 🧩 More Modules by Phil / Meine weiteren Module

🇬🇧 **Discover all of my Foundry VTT modules!**  
Because of Foundry VTT's policies regarding AI assistance (which I use for translations and visual elements as a solo hobby developer), several of my modules have been removed from the official Foundry package directory. Below you can see which modules are still available directly on [Foundry VTT](https://foundryvtt.com/community/philsmodules/packages) and which ones are hosted exclusively on [GitHub](https://github.com/PhilsModules/). **All modules remain actively maintained** and can always be installed in Foundry VTT using their **Manifest URL**!

🇩🇪 **Entdecke alle meine Foundry VTT Module!**  
Aufgrund der Richtlinien von Foundry VTT zum Einsatz von künstlicher Intelligenz (die ich als Solo-Hobbyentwickler für Übersetzungen und Grafiken nutze) wurden einige meiner Module aus dem offiziellen Foundry-Verzeichnis entfernt. In der Tabelle siehst du auf einen Blick, welche Module noch direkt über [Foundry VTT](https://foundryvtt.com/community/philsmodules/packages) gelistet sind und welche exklusiv über [GitHub](https://github.com/PhilsModules/) bezogen werden können. **Alle Module werden aktiv weiterentwickelt** und lassen sich jederzeit über ihre **Manifest-URL** in Foundry VTT installieren!

| Module / Modul | Foundry VTT Listing | Description (🇬🇧 EN / 🇩🇪 DE) | Links |
| :--- | :---: | :--- | :---: |
| **[Phil's Day and Night Cycle](https://github.com/PhilsModules/phils-day-night-cycle)** | ❌ **GitHub Only**<br>*(Removed due to AI policy / Wegen KI-Richtlinien entfernt)* | 🇬🇧 Immersive clock widget with Solar Arc, full calendar system, and a living weather engine featuring 360° wind physics, volumetric clouds, and 4,800+ narrative weather reports.<br>🇩🇪 Immersives Uhr-Widget mit Sonnenlauf, vollwertigem Kalendersystem und lebendiger Wetter-Engine mit 360°-Windphysik, volumetrischer Wolkendecke und über 4.800 Wetterberichten. | [GitHub](https://github.com/PhilsModules/phils-day-night-cycle) · [Manifest](https://github.com/PhilsModules/phils-day-night-cycle/releases/latest/download/module.json) |
| **[Phil's Console Doctor & Task Manager](https://github.com/PhilsModules/phils-console-doctor)** | ❌ **GitHub Only**<br>*(Removed due to AI policy / Wegen KI-Richtlinien entfernt)* | 🇬🇧 Windows 11-style Task Manager & diagnostics suite for Foundry VTT with real-time CPU/GPU load breakdown, conflict detective, A/B culprit finder, and AI error analysis.<br>🇩🇪 Diagnose-Suite im Windows-11-Task-Manager-Stil mit Live-CPU/GPU-Auslastung, Konflikt-Detektiv, automatischem A/B-Problemlöser und KI-Fehleranalyse. | [GitHub](https://github.com/PhilsModules/phils-console-doctor) · [Manifest](https://github.com/PhilsModules/phils-console-doctor/releases/latest/download/module.json) |
| **[Phil's PF2e RealDark](https://github.com/PhilsModules/phils-pf2e-realdark)** | ❌ **GitHub Only**<br>*(Removed due to AI policy / Wegen KI-Richtlinien entfernt)* | 🇬🇧 A true, customizable dark mode for Pathfinder 2e with 30+ handcrafted theme presets, live preview wizard, and high-contrast readability.<br>🇩🇪 Ein echter, anpassbarer Dark Mode für Pathfinder 2e mit über 30 kuratierten Presets, Live-Vorschau-Assistent und erstklassiger Lesbarkeit. | [GitHub](https://github.com/PhilsModules/phils-pf2e-realdark) · [Manifest](https://github.com/PhilsModules/phils-pf2e-realdark/releases/latest/download/module.json) |
| **[Phil's Universal Translator](https://github.com/PhilsModules/phils-universal-translator)** | ❌ **GitHub Only**<br>*(Removed due to AI policy / Wegen KI-Richtlinien entfernt)* | 🇬🇧 System-agnostic local translation assistant for personal game prep with zero API costs, direct local LLM (Ollama) integration, LinkProtection, and 12-category lore glossary.<br>🇩🇪 Systemunabhängiger Übersetzungs-Assistent für die private Spielvorbereitung ohne API-Kosten, mit lokaler Ollama-Anbindung, LinkProtection und 12-Kategorien-Glossar. | [GitHub](https://github.com/PhilsModules/phils-universal-translator) · [Manifest](https://github.com/PhilsModules/phils-universal-translator/releases/latest/download/module.json) |
| **[Phil's UI Tweaks](https://github.com/PhilsModules/phils-foundry-ui-tweaks)** | ✅ **Available**<br>*(Verfügbar)* | 🇬🇧 Customize, reorder, hide, and group Scene Controls (left toolbar) and Sidebar Tabs (right toolbar) into custom pop-out folders with a sleek Modern Dark UI.<br>🇩🇪 Passe die linke Werkzeugleiste und rechte Seitenleiste frei an – umsortieren, ausblenden und Tabs in eigenen Ausklapp-Ordnern im Modern Dark UI Design gruppieren. | [Foundry VTT](https://foundryvtt.com/community/philsmodules/packages) · [GitHub](https://github.com/PhilsModules/phils-foundry-ui-tweaks) · [Manifest](https://github.com/PhilsModules/phils-foundry-ui-tweaks/releases/latest/download/module.json) |
| **[Phil's Quest Tracker](https://github.com/PhilsModules/phils-quest-tracker)** | ✅ **Available**<br>*(Verfügbar)* | 🇬🇧 Immersive Quest Log in a Modern Dark UI featuring collaborative party quests, job boards, drag & drop rewards, and automatic calendar synchronization.<br>🇩🇪 Immersives Quest-Log im Modern Dark UI mit kollaborativen Gruppenquests, Auftragsbrett, Drag-&-Drop-Belohnungen und automatischer Kalender-Synchronisation. | [Foundry VTT](https://foundryvtt.com/community/philsmodules/packages) · [GitHub](https://github.com/PhilsModules/phils-quest-tracker) · [Manifest](https://github.com/PhilsModules/phils-quest-tracker/releases/latest/download/module.json) |
| **[Phil's PF2e AI Translator](https://github.com/PhilsModules/phils-pf2e-ai-translator)** | ✅ **Available**<br>*(Verfügbar)* | 🇬🇧 Next-Gen AI translation studio for Pathfinder 2e with `lang-de-pf2e` compendium integration (15,000+ official terms), LinkProtection, Smart-Sync, and zero API costs.<br>🇩🇪 KI-Übersetzungs-Studio für Pathfinder 2e mit `lang-de-pf2e`-Integration (über 15.000 offizielle Begriffe), LinkProtection, Smart-Sync und null API-Kosten. | [Foundry VTT](https://foundryvtt.com/community/philsmodules/packages) · [GitHub](https://github.com/PhilsModules/phils-pf2e-ai-translator) · [Manifest](https://github.com/PhilsModules/phils-pf2e-ai-translator/releases/latest/download/module.json) |
| **[Phil's PF2e Action Colours](https://github.com/PhilsModules/phils-pf2e-action-colours)** | ✅ **Available**<br>*(Verfügbar)* | 🇬🇧 Visualizes the Pathfinder 2e 3-Action (and 4-Action Quickened) economy on the drag ruler with dynamic condition/feat detection, smart routing, and 3 colorblind modes.<br>🇩🇪 Visualisiert die Pathfinder 2e 3-Aktionen-Ökonomie (inkl. 4. Aktion bei Hast) direkt beim Token-Ziehen – mit Zustandserkennung, Smart Routing und 3 Farbenblind-Modi. | [Foundry VTT](https://foundryvtt.com/community/philsmodules/packages) · [GitHub](https://github.com/PhilsModules/phils-pf2e-action-colours) · [Manifest](https://github.com/PhilsModules/phils-pf2e-action-colours/releases/latest/download/module.json) |
| **[Phil's Random Names](https://github.com/PhilsModules/phils-random-names)** | ✅ **Available**<br>*(Verfügbar)* | 🇬🇧 Deluxe generator suite with 5.3M+ NPC name combinations, tavern menus, treasure pouches, custom merchant shops, and 23,000+ entries with drag & drop item creation.<br>🇩🇪 Deluxe-Generator mit über 5,3 Mio. NSC-Namen, Tavernen-Menüs, Schatzbeuteln, eigenen Händler-Auslagen und über 23.000 Einträgen inkl. Drag-&-Drop-Item-Erstellung. | [Foundry VTT](https://foundryvtt.com/community/philsmodules/packages) · [GitHub](https://github.com/PhilsModules/phils-random-names) · [Manifest](https://github.com/PhilsModules/phils-random-names/releases/latest/download/module.json) |
| **[Phil's AI Assistant](https://github.com/PhilsModules/phils-ai-assistant)** | ✅ **Available**<br>*(Verfügbar)* | 🇬🇧 Connect your Foundry VTT world to Gemini, ChatGPT, Claude, Copilot, Perplexity, or local Ollama with zero API costs to write lore, edit items, and generate image prompts.<br>🇩🇪 Verbinde deine Foundry-Welt ohne API-Kosten mit Gemini, ChatGPT, Claude, Copilot, Perplexity oder lokal mit Ollama für Lore-Texte, Item-Anpassungen und Bild-Prompts. | [Foundry VTT](https://foundryvtt.com/community/philsmodules/packages) · [GitHub](https://github.com/PhilsModules/phils-ai-assistant) · [Manifest](https://github.com/PhilsModules/phils-ai-assistant/releases/latest/download/module.json) |
| **[Phil's Token Studio](https://github.com/PhilsModules/phils-token-studio)** | ✅ **Available**<br>*(Verfügbar)* | 🇬🇧 High-performance in-game visual token editor with layer management, smart masking, 3D pop-out effects, and Foundry Dynamic Token Ring integration.<br>🇩🇪 Leistungsstarker visueller Token-Editor direkt in Foundry VTT mit Ebenensystem, intelligenter Maskierung, 3D-Pop-out-Effekten und Dynamic-Token-Ring-Unterstützung. | [Foundry VTT](https://foundryvtt.com/community/philsmodules/packages) · [GitHub](https://github.com/PhilsModules/phils-token-studio) · [Manifest](https://github.com/PhilsModules/phils-token-studio/releases/latest/download/module.json) |
| **[Phil's Journal Translator](https://github.com/PhilsModules/phils-journal-translator)** | ✅ **Available**<br>*(Verfügbar)* | 🇬🇧 System-agnostic AI translation assistant for Foundry VTT journals using free web AI services (Gemini, ChatGPT, Claude, etc.) with automatic backups.<br>🇩🇪 Systemunabhängiger KI-Übersetzungs-Assistent für Foundry VTT Journale über kostenlose Web-KIs (Gemini, ChatGPT, Claude etc.) mit automatischen Backups. | [Foundry VTT](https://foundryvtt.com/community/philsmodules/packages) · [GitHub](https://github.com/PhilsModules/phils-journal-translator) · [Manifest](https://github.com/PhilsModules/phils-journal-translator/releases/latest/download/module.json) |
| **[Phil's Random Quests](https://github.com/PhilsModules/phils-random-quests)** | ✅ **Available**<br>*(Verfügbar)* | 🇬🇧 Instant adventure and quest idea generator for Pathfinder 2e and D&D 5e when your party goes off the rails.<br>🇩🇪 Schneller Generator für spontane Abenteuer- und Quest-Ideen in Pathfinder 2e und D&D 5e am Spieltisch. | [Foundry VTT](https://foundryvtt.com/community/philsmodules/packages) · [GitHub](https://github.com/PhilsModules/phils-random-quests) · [Manifest](https://github.com/PhilsModules/phils-random-quests/releases/latest/download/module.json) |
| **[Phil's Art Replacer](https://github.com/PhilsModules/phils-art-replacer)** | ✅ **Available**<br>*(Verfügbar)* | 🇬🇧 Scans your entire world and installed modules to automatically find and replace missing actor and token artwork with side-by-side comparison.<br>🇩🇪 Durchsucht deine gesamte Welt und installierte Module, um fehlende Bilder für Akteure und Tokens automatisch mit Vorher-Nachher-Vergleich zu ersetzen. | [Foundry VTT](https://foundryvtt.com/community/philsmodules/packages) · [GitHub](https://github.com/PhilsModules/phils-art-replacer) · [Manifest](https://github.com/PhilsModules/phils-art-replacer/releases/latest/download/module.json) |
| **[Phil's Map Migrator](https://github.com/PhilsModules/phils-map-migrator)** | ✅ **Available**<br>*(Verfügbar)* | 🇬🇧 Professional scene migration tool with 1–5 point mathematical calibration, geometry failsafe, and automatic scaling for walls, lights, tokens, and pins.<br>🇩🇪 Profi-Werkzeug für präzise Szenen-Migration mit 1–5-Punkte-Kalibrierung, Geometrie-Wächter und automatischer Skalierung für Wände, Lichter, Tokens und Pins. | [Foundry VTT](https://foundryvtt.com/community/philsmodules/packages) · [GitHub](https://github.com/PhilsModules/phils-map-migrator) · [Manifest](https://github.com/PhilsModules/phils-map-migrator/releases/latest/download/module.json) |

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
