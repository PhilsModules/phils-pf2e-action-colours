<div align="center">

# Phil's PF2e Action Colours 🚥

![Foundry v14 Compatible](https://img.shields.io/badge/Foundry-v14-brightgreen?style=flat-square) ![Foundry v13 Compatible](https://img.shields.io/badge/Foundry-v13-green?style=flat-square) ![License](https://img.shields.io/badge/License-GPLv3_%2F_CC_BY--NC--ND-blue?style=flat-square)
[![Version](https://img.shields.io/badge/Version-3.1.1-orange?style=flat-square)](https://github.com/PhilsModules/phils-pf2e-action-colours/releases) [![Patreon](https://img.shields.io/badge/SUPPORT-Patreon-ff424d?style=flat-square&logo=patreon)](https://www.patreon.com/PhilsModules)

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
> A quick note before you start: I create these modules in my free time and offer them to the community for free. Neither my partner nor I work as graphic designers or translators, and we are not full-time developers either. Maintaining these projects takes a lot of effort. To make these modules possible in this form, I use assistance from artificial intelligence for translations and visual elements. Hiring external professionals is simply something I cannot afford out of pocket.
> 
> If these modules should ever be removed from the official Foundry package listing due to rules regarding artificial intelligence, do not worry. The project will continue. You can always find all updates and releases directly here on GitHub, and you can also report any issues here.
> 
> Thank you for your understanding and support!
> 
> ---
> 
> 🇩🇪 **Hallo zusammen!**  
> Ein kleiner Hinweis in eigener Sache, bevor ihr startet: Ich erstelle diese Module in meiner Freizeit und stelle sie der Community kostenlos zur Verfügung. Weder meine Lebensgefährtin noch ich sind Grafikdesigner oder gelernte Übersetzer. Hauptberufliche Entwickler sind wir auch nicht. Die Pflege kostet deshalb extrem viel Zeit. Um die Module in dieser Form überhaupt anbieten zu können, nutze ich Hilfe von künstlicher Intelligenz für Übersetzungen und grafische Elemente. Externe Profis kann ich mir privat schlicht nicht leisten.
> 
> Sollten die Module wegen der Nutzung von künstlicher Intelligenz oder veränderter Richtlinien irgendwann aus dem offiziellen Verzeichnis von Foundry gelöscht werden, müsst ihr euch keine Sorgen machen. Das Projekt geht weiter. Ihr findet alle Updates und neue Versionen weiterhin direkt hier auf GitHub. Hilfe bei Problemen gibt es hier natürlich auch.
> 
> Vielen Dank für euer Verständnis und eure Unterstützung!

<br>

> [!NOTE]
>
> ### Spiritual Successor / Geistiger Nachfolger
>
> **English:** This module is a spiritual successor to the popular [Drag Ruler](https://github.com/manuelVo/foundryvtt-drag-ruler), built from the ground up for Pathfinder 2e Remaster on Foundry V13+.
>
> **Deutsch:** Dieses Modul ist ein geistiger Nachfolger des bekannten [Drag Ruler](https://github.com/manuelVo/foundryvtt-drag-ruler), neu gebaut für Pathfinder 2e Remaster in Foundry V13+.

<br>

---

<br>

# <img src="https://flagcdn.com/48x36/gb.png" width="28" height="21" alt="EN"> English Instructions

**Phil's PF2e Action Colours** brings the **3-Action (and 4-Action Quickened) Economy** of Pathfinder 2e Remaster directly onto your battlemap in Foundry V13 and V14.

Instead of counting squares or calculating distances in your head, the module color-codes your movement ribbon in real time. You see at a glance how many actions a move will cost.

Starting with version 3.x, the module also handles tactical movement rules: it respects walls, stops at closed doors, prevents fog-of-war spoilers, halts at ambushes, and automatically rolls Pathfinder 2e **Tumble Through** checks when you move through enemy spaces.

---

## 🌟 New & Highlight Features

### 🤸 Automated PF2e Tumble Through Check
- **The Rule:** In Pathfinder 2e, you cannot simply walk through an enemy's square as if they were not there.
- **How it works:** When you drag a token across an opposing creature's space, your character walks up to the square right in front of the enemy and pauses. The module then automatically rolls a **Tumble Through** check (Acrobatics against the enemy's Reflex DC).
- **The Result:**
  - ✅ **Success or Critical Success:** Your character moves past the enemy and continues walking along the rest of their planned path.
  - ❌ **Failure or Critical Failure:** Movement stops right in front of the defender.
- **Never get stuck on an enemy:** You cannot accidentally end your move on top of an enemy token. Movement always stops in the last unoccupied square without rolling.
- **Out-of-Combat Settings:** Game Masters can set how exploration mode behaves. You can let it roll the check automatically, stop before foes, or allow free movement without restrictions.

### ⚡ Live Tumble Toggle (Hotkey: T)
- **The Choice:** Want to run around an adversary rather than risking an Acrobatics check (or the other way around)?
- **How it works:** While dragging your token with the mouse, tap **T** on your keyboard (customizable in settings). The movement ruler recalculates right under your cursor. It switches immediately between walking around enemies and tumbling directly through them without lag.

### 🌫️ Fog of War Anti-Spoiler Shield
- **No more blind scouting:** In standard virtual tabletops, players sometimes drag tokens across black, unexplored areas to feel out walls or find secret rooms via the path calculation.
- **How it works:** Dragging a token into unexplored fog turns your path red and blocks the movement. Unexplored rooms and dungeon layouts stay hidden.
- **Explored territory:** You can still navigate through previously explored rooms and corridors, even when they are currently in darkness or outside direct line of sight.

### 🚪 Closed Door Smart Routing & Auto-Stops
- **Clear visual feedback:** When plotting a path through an explored room blocked by a closed or locked door, the ruler shows your movement up to the door in your normal action colors. Behind the doorway, the line turns red.
- **Automatic stopping:** Releasing your token behind a closed door walks your character right up to the door, stops there, and shows a short notice. Tokens will no longer phase through closed doors by accident.

### 👁️ Corner Ambush Detection (Line-of-Sight Interception)
- **The Scenario:** Your character runs down a hallway and rounds a corner, suddenly spotting a monster waiting out of sight.
- **How it works:** Movement pauses at the exact square where line of sight is gained. A popup lets you choose:
  - 🛑 **Replan Movement:** Cancel the rest of your move right at the corner to assess the situation and use your remaining actions differently.
  - ⚔️ **Charge Forward:** Keep going and move up to (or tumble past) the newly revealed enemy.

### 🏰 Long-Distance Routing
- **Reliable pathfinding:** Plan paths spanning up to 200 feet (40+ grid squares) through winding hallways, rooms, pillars, and dungeons without cutting corners through walls.

### 👻 GM Ghost Mode (Foundry V14) & Alt-Teleport
- **Unconstrained Movement Button:** Toggle the native Foundry V14 ghost button on the left scene controls palette to drag tokens through walls freely without needing any key combinations.
- **Alt-Teleport:** Hold the **Alt key** while dragging any token to ignore walls and closed doors as well as terrain, instantly placing the token at the destination upon release without animation.

---

## ⚔️ PF2e Action Economy & Automatic Conditions

### 🎨 Action Economy Colors
- 🟢 **Green:** 1 Action (1× Stride, standard movement range)
- 🟡 **Yellow:** 2 Actions (2× Stride, double move range)
- 🟠 **Orange:** 3 Actions (3× Stride, full standard turn)
- 🔵 **Cyan:** 4 Actions (Quickened / Haste)
- 🔴 **Red:** Unreachable / Movement Blocked / Walls / Unexplored Fog

### 🛌 Automatic Condition Engine
- **Prone (Lying Down):** Drops movement to **Crawl** at 5 ft per action.
- **Feats:** Recognizes feats like **Nimble Crawl** (faster crawl speed) and **Swift Sneak** (full speed stealth).
- **Immobilized / Paralyzed / Restrained / Grabbed / Petrified / Unconscious:** Ruler locks to 0 ft (all red).
- **Slowed & Stunned:** Reduces your available action budget so distances beyond your remaining actions turn red.
- **Quickened (Haste):** Unlocks the 4th action band (Cyan).

### 👁️ Accessibility & Style Presets
- **1-Click Colorblind Presets:**
  - **Red-Green (Deuteranopia):** High-contrast palette (Cobalt Blue, Sun Yellow, Amber Orange, Violet, Brick Red).
  - **Red-Green (Protanopia):** Adjusted for red-deficiency (Sky Blue, Yellow, Orange, Deep Blue, Magenta).
  - **Blue-Yellow (Tritanopia):** Clear palette (Emerald Mint, Soft Rose, Crimson, Silver White, Charcoal Dark).
- **Style Presets:** Standard PF2e, Vibrant Neon, Pastel Soft, or your own custom colors via color pickers.

### 👣 Ghost Trail
- Hover over any token during combat to see a ghost line showing the exact path it took during its turn.

---

## 📦 Installation

1. Open Foundry VTT -> **Add-on Modules**.
2. Click **Install Module**.
3. Paste Manifest URL:
   ```text
   https://github.com/PhilsModules/phils-pf2e-action-colours/releases/latest/download/module.json
   ```
4. Click **Install**.

---

## 📖 How to Use (Step-by-Step)

1. **Move your Token:** Left-click and drag your token across the map. You will see the color-coded action bands right away.
2. **Toggle Tumble Mode:** While dragging, tap **T** to switch between walking around enemies and tumbling through them.
3. **Change Movement Speeds:** Right-click while dragging (or right-click the token) to switch between Fly, Swim, Burrow, and Climb modes.
4. **Game Master Shortcuts:**
   - Click the **Ghost icon** on the left scene controls palette (Foundry V14) to toggle unconstrained wall-passing.
   - Or hold the **Alt key** while dragging to teleport through walls without animation.
5. **Customize Colors & Settings:** Open **Configure Settings -> Module Settings -> Phil's PF2e Action Colours -> Open Configuration** to access the 2-column menu with live preview.

<br>

---

<br>

# <img src="https://flagcdn.com/48x36/de.png" width="28" height="21" alt="DE"> Deutsche Anleitung

**Phil's PF2e Action Colours** bringt die **3-Aktionen-Ökonomie (plus 4. Aktion bei Hast)** von Pathfinder 2e Remaster direkt auf dein Spielfeld in Foundry V13 & V14.

Statt Kästchen zu zählen oder Entfernungen im Kopf zu überschlagen, färbt das Modul dein Bewegungslineal beim Ziehen eines Tokens automatisch ein. Du siehst sofort, wie viele Aktionen ein Weg kostet.

Ab Version 3.x übernimmt das Modul auch die taktischen Bewegungsregeln: Es erkennt Wände, stoppt vor geschlossenen Türen, verhindert Spoiler im Nebel des Krieges, hält bei Hinterhalten an und würfelt automatisch das Pathfinder 2e **Hindurchturnen (Tumble Through)** für dich.

---

## 🌟 Die Features im Überblick

### 🤸 Automatisches Hindurchturnen (PF2e Tumble Through)
- **Die Regel:** Nach den Regeln von Pathfinder 2e darfst du feindliche Kreaturen nicht einfach ignorieren oder durch ihre Felder laufen.
- **Wie es im Spiel funktioniert:** Wenn du dein Token über ein Feld ziehst, auf dem ein Gegner steht, läuft dein Charakter bis direkt vor den Feind, hält dort kurz an und würfelt automatisch einen **Hindurchturnen-Wurf** (Akrobatik gegen den Reflex-SG des Gegners).
- **Was passiert beim Wurf?**
  - ✅ **Erfolg oder Kritischer Erfolg:** Dein Charakter bewegt sich durch das gegnerische Feld und läuft seinen restlichen geplanten Weg weiter.
  - ❌ **Misserfolg oder Kritischer Fehlschlag:** Die Bewegung endet direkt auf dem Feld vor dem Gegner.
- **Kein Steckenbleiben im Gegner:** Du kannst deine Bewegung nicht versehentlich auf dem Feld eines Feindes beenden. Das Token stoppt immer auf dem letzten freien Feld davor, ohne unnötig zu würfeln.
- **Einstellbar für die Spielleitung:** Außerhalb von Kämpfen kann die Spielleitung festlegen, was passieren soll. Zur Auswahl stehen automatisches Würfeln, einfaches Anhalten vor Gegnern sowie freie Bewegung ohne Einschränkung.

### ⚡ Live-Umschalten beim Ziehen (Taste: T)
- **Die Wahl:** Möchtest du lieber außen um den Gegner herumlaufen, anstatt einen Akrobatik-Wurf zu riskieren (oder umgekehrt)?
- **Wie es geht:** Halte die linke Maustaste beim Ziehen gedrückt und tippe kurz auf die Taste **T** (in den Einstellungen frei belegbar). Das Lineal rechnet den Pfad sofort unter deinem Mauszeiger neu. Du wechselst direkt zwischen dem Weg außen herum und dem Weg mitten durch den Gegner, ganz ohne Ruckeln.

### 🌫️ Nebel des Krieges & Anti-Spoiler-Schutz
- **Schluss mit blindem Abtasten:** In vielen VTTs ziehen Spieler ihre Tokens durch den schwarzen, noch unentdeckten Nebel, um anhand der Wegberechnung Wände oder geheime Räume zu erraten.
- **Wie es funktioniert:** Sobald du dein Token in unerforschten Nebel ziehst, färbt sich der Pfad rot und das Ablegen wird blockiert. Unentdeckte Räume und Gänge bleiben unsichtbar.
- **Bereits erkundete Bereiche:** Räume und Gänge, die deine Gruppe schon aufgedeckt hat, kannst du weiterhin normal durchqueren (auch wenn sie gerade im Dunkeln liegen oder du keine direkte Sichtlinie hast).

### 🚪 Geschlossene Türen & Automatischer Stopp
- **Klare Anzeige:** Ziehst du dein Token durch eine geschlossene oder verschlossene Tür, zeigt dir das Lineal den Weg bis zur Tür in deinen normalen Aktionsfarben. Der Teil hinter der Tür wird rot dargestellt.
- **Automatisches Anhalten:** Lässt du das Token hinter der Tür los, läuft dein Charakter genau bis vor die Tür, bleibt dort stehen und blendet einen kurzen Hinweis ein. Tokens rutschen so nicht mehr aus Versehen durch geschlossene Türen.

### 👁️ Hinterhalt-Stopp an Ecken (Corner Ambush)
- **Die Situation:** Dein Charakter läuft durch einen Gang, biegt um eine Ecke und sieht plötzlich einen Gegner, der vorher im toten Winkel stand.
- **Wie es funktioniert:** Die Bewegung pausiert genau auf dem Feld, auf dem du zum ersten Mal Sichtlinie zum Gegner hast. Ein Fenster lässt dich entscheiden:
  - 🛑 **Bewegung abbrechen (Neu planen):** Bleib direkt an der Ecke stehen, um die Situation neu zu bewerten und deine restlichen Aktionen anders zu nutzen.
  - ⚔️ **Weiterlaufen:** Setze deinen geplanten Weg fort, um direkt an den Feind heranzutreten oder durch ihn hindurchzuturnen.

### 🏰 Lange Wege durch verwinkelte Karten
- **Zuverlässige Wegfindung:** Das Modul berechnet Wege über Distanzen von bis zu 60 Metern (40+ Felder) durch verwinkelte Flure, Räume, Säulen und Katakomben, ohne dabei Ecken durch Wände abzukürzen.

### 👻 Spielleiter-Funktionen: Geister-Modus (Foundry V14) & Alt-Teleport
- **Geister-Button in Foundry V14:** Klicke auf das Geister-Symbol in der linken Werkzeugleiste (Unconstrained Movement), um Tokens frei durch Wände zu ziehen. Du brauchst dafür keine Tastenkombination.
- **Alt-Teleport:** Halte beim Ziehen eines Tokens die **Alt-Taste** gedrückt, um Wände und geschlossene Türen sowie schwieriges Gelände zu ignorieren. Das Token wird beim Loslassen sofort ohne Lauf-Animation am Zielort abgesetzt.

---

## ⚔️ PF2e-Regeln & Automatische Zustände

### 🎨 Aktionsfarben
- 🟢 **Grün:** 1. Aktion (1× Schreiten, einfache Reichweite)
- 🟡 **Gold-Gelb:** 2. Aktionen (2× Schreiten, doppelte Reichweite)
- 🟠 **Orange:** 3. Aktionen (3× Schreiten, kompletter Standard-Zug)
- 🔵 **Cyan:** 4. Aktionen (Beschleunigt / Hast)
- 🔴 **Rot:** Unerreichbar / Blockiert / Wände / Unerforschter Nebel

### 🛌 Automatische Zustandserkennung
- **Liegend (Prone):** Schaltet die Bewegung automatisch auf **Kriechen** (1,5 Meter pro Aktion) um.
- **Talente:** Erkennt Talente wie **Flinkes Kriechen (Nimble Crawl)** oder **Schnelles Schleichen (Swift Sneak)** automatisch und rechnet sie in die Reichweite ein.
- **Bewegungsunfähig / Gelähmt / Gefesselt / Bewusstlos:** Setzt die Reichweite sofort auf 0 Meter (Lineal wird komplett rot).
- **Verlangsamt & Betäubt:** Zieht die verlorenen Aktionen direkt von deinem Budget ab.
- **Beschleunigt (Hast):** Schaltet automatisch den 4. Aktionsbereich (Cyan) frei.

### 👁️ Barrierefreiheit & Farbprofile
- **1-Klick-Profile für Farbfehlsichtigkeiten:**
  - **Rot-Grün (Deuteranopie / Grünschwäche):** Kontrastreiche Palette (Kobaltblau, Sonnengelb, Orange, Rotviolett, Ziegelrot).
  - **Rot-Grün (Protanopie / Rotsehschwäche):** Angepasste Palette (Himmelblau, Gelb, Orange, Tiefblau, Magenta).
  - **Blau-Gelb (Tritanopie / Blaublindheit):** Klare Farbpalette (Smaragdgrün, Zartrosa, Karmesinrot, Silberweiß, Dunkelschiefer).
- **Stil-Presets:** Standard PF2e, Vibrant Neon, Pastel Soft oder komplett eigene Farben über die Farbauswahl.

### 👣 Geisterpfad (Ghost Trail)
- Fahre im Kampf mit der Maus über ein Token, um als Linie zu sehen, welchen Weg es in seinem Zug zurückgelegt hat.

---

## 📦 Installation

1. Foundry VTT öffnen -> **Add-on Module**.
2. **Modul Installieren** klicken.
3. Manifest-URL einfügen:
   ```text
   https://github.com/PhilsModules/phils-pf2e-action-colours/releases/latest/download/module.json
   ```
4. **Installieren** klicken.

---

## 📖 Bedienung (Schnellanleitung)

1. **Token greifen und ziehen:** Klicke mit der linken Maustaste auf dein Token und ziehe es über die Karte. Du siehst sofort die farbigen Aktionsbereiche.
2. **Hindurchturnen umschalten:** Drücke beim Ziehen kurz **T**, um direkt zwischen dem Weg um Feinde herum und dem Hindurchturnen zu wechseln.
3. **Bewegungsarten wechseln:** Klicke beim Ziehen (oder vorab auf das Token) mit der rechten Maustaste, um zwischen Fliegen, Schwimmen, Graben und Klettern zu wählen.
4. **Spielleiter-Optionen:**
   - Nutze das **Geister-Icon** in der linken Leiste (Foundry V14), um ungehindert durch Wände zu ziehen.
   - Oder halte **Alt** beim Ziehen gedrückt, um Wände zu ignorieren und sofort zu teleportieren.
5. **Farben & Einstellungen anpassen:** Unter **Einstellungen -> Moduleinstellungen -> Phil's PF2e Action Colours -> Konfiguration öffnen** findest du das 2-Spalten-Menü mit Live-Vorschau.

<br>

---

<br>

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
