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
> A quick note before you start: I create these modules completely in my free time and offer them to the community for free. Since neither my partner nor I are professional graphic designers, translators, or full time developers, maintaining these projects takes a huge amount of effort. To make these modules possible in this form, I use assistance from artificial intelligence, especially for translations and visual elements. Hiring professional designers or translators is simply something I cannot afford out of pocket.
> 
> If these modules should ever be removed from the official Foundry package listing due to rules regarding artificial intelligence, do not worry. The project will continue! You can always find all updates, releases, and support directly here on GitHub.
> 
> Thank you so much for your understanding and support!
> 
> ---
> 
> 🇩🇪 **Hallo zusammen!**  
> Ein kleiner Hinweis in eigener Sache, bevor ihr startet: Ich erstelle diese Module komplett in meiner Freizeit und stelle sie der Community kostenlos zur Verfügung. Da weder meine Lebensgefährtin noch ich Grafikdesigner, gelernte Übersetzer oder hauptberufliche Entwickler sind, ist die Pflege extrem aufwendig. Um die Module in dieser Form überhaupt anbieten zu können, nutze ich Hilfe von künstlicher Intelligenz, zum Beispiel für Übersetzungen und grafische Elemente. Professionelle Designer oder Übersetzer kann ich mir privat schlicht nicht leisten.
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

**Phil's PF2e Action Colours** brings the authentic **3-Action (and 4-Action Quickened) Economy** of Pathfinder 2e Remaster directly onto your battlemap in Foundry V13 and V14.
Instead of counting squares or calculating distances in your head, the module color-codes your movement ribbon in real time, showing you at a glance how many actions a move will cost.

Best of all: starting with version 3.x, the module thinks tactically for you! It respects walls, navigates closed doors, prevents fog-of-war spoilers, halts at ambushes, and automatically rolls Pathfinder 2e **Tumble Through** checks when you move through enemy spaces.

---

## 🌟 New & Highlight Features (Explained Simply!)

### 🤸 Automated PF2e Tumble Through Check
- **The Rule:** In Pathfinder 2e, you can't simply walk through an enemy's square as if they weren't there.
- **How it works:** When you drag a token across an opposing creature's space, your hero automatically walks up to the square right in front of the enemy, pauses, and automatically rolls a **Tumble Through** check (Acrobatics against the enemy's Reflex DC)!
- **The Result:**
  - ✅ **Success or Critical Success:** Your hero flips gracefully past the enemy and continues walking along the rest of their planned path!
  - ❌ **Failure or Critical Failure:** Movement immediately stops safely right in front of the defender. No nasty surprises!
- **Never get stuck on an enemy:** You can never accidentally end your move on top of an enemy token—movement safely stops in the last unoccupied square without rolling.
- **Out-of-Combat Settings:** Game Masters can choose how exploration mode behaves: automatically roll the check, stop safely before foes, or allow free movement.

### ⚡ Live Tumble Toggle (Hotkey: T)
- **The Choice:** Want to run around an adversary rather than risking an Acrobatics check (or vice versa)?
- **How it works:** While dragging your token with the mouse, simply tap **T** on your keyboard (customizable in settings). The movement ruler immediately recalculates right under your cursor—switching instantly between dodging around enemies and tumbling directly through them, with zero lag or token jitter.

### 🌫️ Fog of War Anti-Spoiler Shield
- **No more blind scouting:** In standard virtual tabletops, players sometimes drag tokens across black, unexplored areas to "feel out" walls or discover secret chambers through path calculation.
- **How it works:** Dragging a token into pitch-black unexplored fog instantly turns your path bright warning red and blocks the movement. Hidden rooms and dungeon layouts remain a total mystery!
- **Explored territory:** You can still freely navigate through previously explored rooms and corridors, even when they are currently shrouded in darkness or outside direct sight.

### 🚪 Closed Door Smart Routing & Auto-Stops
- **Clear visual feedback:** When plotting a path through an explored room blocked by a closed or locked door, the ruler shows your movement up to the door in your familiar action colors, and turns bright warning red behind the doorway.
- **Polite stopping:** Releasing your token behind a closed door automatically walks your hero right up to the doorstep, stops in front of the door, and shows a friendly notice. Tokens will never accidentally phase through closed wooden doors!

### 👁️ Corner Ambush Detection (Line-of-Sight Interception)
- **The Scenario:** Your character runs down a hallway and rounds a corner, only to run into an unseen lurking monster waiting in the shadows.
- **How it works:** Movement pauses immediately at the exact square where line of sight is gained. An interactive popup lets you choose:
  - 🛑 **Replan Movement:** Cancel the rest of your move right at the corner to assess the threat and choose a new tactic.
  - ⚔️ **Charge Forward:** Keep going and confront or tumble past the newly revealed enemy.

### 🏰 Deep Dungeon Long-Distance Routing
- **Smooth corridor travel:** Plan epic tactical journeys spanning up to 200 feet (40+ grid squares) through winding castle hallways, dungeons, and multi-room taverns without cutting corners through walls.

### 👻 GM Ghost Mode (Foundry V14) & Alt-Teleport
- **Unconstrained Movement Button:** Toggle the native Foundry V14 ghost button on the left scene controls palette to drag tokens through walls freely without needing any key combinations.
- **Alt-Teleport:** Hold the **Alt key** while dragging any token to bypass all walls, closed doors, and terrain, instantly teleporting the token upon release with zero travel delay.

---

## ⚔️ Authentic PF2e Action Economy & Automatic Conditions

### 🎨 Action Economy Colors
- 🟢 **Green:** 1 Action (1× Stride – standard movement range)
- 🟡 **Yellow:** 2 Actions (2× Stride – double move range)
- 🟠 **Orange:** 3 Actions (3× Stride – full standard turn)
- 🔵 **Cyan:** 4 Actions (Quickened / Haste)
- 🔴 **Red:** Unreachable / Movement Blocked / Walls / Unexplored Fog

### 🛌 Automatic Condition Engine
- **Prone (Lying Down):** Automatically drops movement to **Crawl** at 5 ft per action.
- **Feats:** Seamlessly recognizes feats like **Nimble Crawl** (faster crawl speed) and **Swift Sneak** (full speed stealth).
- **Immobilized / Paralyzed / Restrained / Grabbed / Petrified / Unconscious:** Ruler immediately locks to 0 ft (all red).
- **Slowed & Stunned:** Dynamically reduces your action budget so excessive distances turn red.
- **Quickened (Haste):** Automatically unlocks the dynamic 4th action band (Cyan)!

### 👁️ Accessibility & Style Presets
- **1-Click Colorblind Presets:**
  - **Red-Green (Deuteranopia):** Tuned high-contrast palette (Cobalt Blue, Sun Yellow, Amber Orange, Violet, Brick Red).
  - **Red-Green (Protanopia):** Tuned for red-deficiency (Sky Blue, Yellow, Orange, Deep Blue, Magenta).
  - **Blue-Yellow (Tritanopia):** Distinct palette (Emerald Mint, Soft Rose, Crimson, Silver White, Charcoal Dark).
- **Style Presets:** Standard PF2e, Vibrant Neon, Pastel Soft, or custom color pickers.

### 👣 Ghost Trail
- Hover over any token during combat to view an atmospheric ghost ribbon displaying the exact path it took during its turn.

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

## 📖 How to Use (Quick Step-by-Step)

1. **Move your Token:** Left-click and drag your token across the map. You will instantly see the color-coded action bands.
2. **Toggle Tumble Mode:** While dragging, tap **T** to switch between running safely around enemies and tumbling directly through them.
3. **Change Movement Speeds:** Right-click while dragging (or right-click the token) to switch between Fly, Swim, Burrow, and Climb modes.
4. **Game Master Shortcuts:**
   - Click the **Ghost icon** on the left scene controls palette (Foundry V14) to toggle unconstrained wall-passing.
   - Or hold the **Alt key** while dragging to teleport through walls without animation.
5. **Customize Colors & Settings:** Open **Configure Settings -> Module Settings -> Phil's PF2e Action Colours -> Open Configuration** to access the compact 2-column menu with real-time ruler preview.

<br>

---

<br>

# <img src="https://flagcdn.com/48x36/de.png" width="28" height="21" alt="DE"> Deutsche Anleitung

**Phil's PF2e Action Colours** bringt die taktische **3-Aktionen-Ökonomie (plus 4. Aktion bei Hast)** von Pathfinder 2e Remaster direkt auf dein Spielfeld in Foundry V13 & V14.
Statt mühsam Kästchen zu zählen oder Entfernungen im Kopf zu überschlagen, färbt das Modul dein Bewegungslineal beim Ziehen eines Tokens automatisch in klaren Farben ein. Du siehst sofort auf einen Blick, wie viele Aktionen ein Weg kostet.

Und ab Version 3.x denkt das Modul sogar taktisch mit: Es erkennt Wände, stoppt vor geschlossenen Türen, schützt vor Spoilern im Nebel des Krieges, warnt vor Hinterhalten und würfelt sogar automatisch das Pathfinder 2e **Hindurchturnen (Tumble Through)** für dich!

---

## 🌟 Die neuen Highlights & Features — Für jeden verständlich erklärt!

### 🤸 Automatisches Hindurchturnen (PF2e Tumble Through)
- **Die Regel:** Nach den Regeln von Pathfinder 2e darfst du feindliche Kreaturen nicht einfach ignorieren oder gemütlich durch sie hindurchspazieren.
- **Wie es im Spiel funktioniert:** Wenn du dein Token über ein Feld ziehst, auf dem ein Gegner steht, stoppt dein Charakter automatisch direkt vor dem Feind und würfelt selbstständig einen **Hindurchturnen-Wurf** (Akrobatik gegen den Reflex-SG des Gegners)!
- **Was passiert beim Wurf?**
  - ✅ **Erfolg oder Kritischer Erfolg:** Dein Held hechtet geschmeidig durch den Gegner hindurch und setzt seinen restlichen Weg ganz normal fort!
  - ❌ **Misserfolg oder Kritischer Fehlschlag:** Die Bewegung bricht sofort sicher vor dem Gegner ab. Keine bösen Überraschungen!
- **Niemals im Gegner steckenbleiben:** Du kannst niemals aus Versehen im selben Feld wie ein Feind stehen bleiben—die Bewegung stoppt immer sicher auf dem letzten freien Feld, ohne unnötig zu würfeln.
- **Einstellbar für die Spielleitung:** Außerhalb von Kämpfen kann die Spielleitung frei wählen: automatisch würfeln, brav vor Gegnern anhalten oder freie Bewegung ohne Einschränkung erlauben.

### ⚡ Live-Umschalten beim Ziehen (Taste: T)
- **Die Wahl:** Möchtest du lieber außen um die Gegnergruppe herumlaufen, anstatt dein Glück beim Hindurchturnen zu versuchen (oder umgekehrt)?
- **Wie es geht:** Halte die linke Maustaste gedrückt und tippe einfach kurz auf die Taste **T** (in den Einstellungen frei anpassbar). Das Lineal schaltet sofort live unter deiner Maus um: einmal außen herum, noch ein Druck und du turnst wieder mittendurch—blitzschnell und ohne Ruckeln!

### 🌫️ Nebel des Krieges & Anti-Spoiler-Schutz
- **Schluss mit Meta-Gaming:** In vielen VTTs tasten Spieler im tiefschwarzen, noch nicht aufgedeckten Nebel mit Tokens herum, um geheime Wände oder verborgene Räume zu erraten.
- **Wie es funktioniert:** Sobald du dein Token in unerforschten Nebel ziehst, färbt sich der Pfad knallrot und das Ablegen wird blockiert. Verborgene Dungeons und Geheimgänge bleiben geschützt!
- **Bereits erkundete Räume:** Räume und Gänge, die deine Gruppe bereits erforscht hat, kannst du natürlich weiterhin problemlos durchqueren—auch wenn sie gerade im Schatten liegen.

### 🚪 Schlaue Türen & Automatischer Tür-Stopp
- **Klare Rückmeldung:** Ziehst du dein Token hinter eine geschlossene Tür, zeigt dir das Lineal den Weg bis zur Tür in deinen gewohnten Aktionsfarben und dahinter in Warnrot.
- **Brav anhalten:** Lässt du das Token hinter der Tür los, läuft dein Held brav bis genau vor die Türschwelle und stoppt dort mit einem freundlichen Hinweis. Keine Tokens mehr, die aus Versehen durch geschlossene Holztüren teleportieren!

### 👁️ Hinterhalt-Bremse an Ecken (Corner Ambush)
- **Die Situation:** Dein Charakter rennt durch einen Korridor, biegt um die Ecke und steht plötzlich Auge in Auge mit einem lauernden Monster, das im toten Winkel gewartet hat.
- **Wie es funktioniert:** Die Bewegung stoppt sofort an genau dem Feld, an dem du Sichtlinie zum Gegner bekommst! Ein kleines Fenster gibt dir sofort die Kontrolle zurück:
  - 🛑 **Bewegung abbrechen (Neu planen):** Bleibe an der Ecke stehen, um die neue Gefahr einzuschätzen und deine Aktionen taktisch klug einzusetzen.
  - ⚔️ **Weiterlaufen:** Stürme vorwärts, um den Feind direkt zu stellen oder an ihm vorbeizuturnen.

### 🏰 Verwinkelte Gänge & Langstrecken-Routing
- **Reisen durch Festungen & Dungeons:** Egal wie verwinkelt Schlossflure, Tavernen oder Katakomben sind: Das Modul plant flüssige Wege über Distanzen von bis zu 200 Fuß (40+ Felder) um jede Säule und Wand herum.

### 👻 Spielleiter-Tricks: Geister-Modus (Foundry V14) & Alt-Teleport
- **Geister-Button in Foundry V14:** Klicke einfach auf das native Geister-Symbol in der linken Szenen-Werkzeugleiste (Unconstrained Movement), um Tokens frei durch Wände zu ziehen—ganz ohne Tastenkombinationen.
- **Alt-Teleport:** Halte beim Ziehen eines Tokens die **Alt-Taste** gedrückt, um Wände, Türen und Gelände komplett zu ignorieren. Das Token teleportiert beim Loslassen sofort ohne Reise-Animation an den Zielort!

---

## ⚔️ Intelligente PF2e-Regeln & Automatische Zustände

### 🎨 Aktionsfarben
- 🟢 **Grün:** 1. Aktion (1× Schreiten – einfache Reichweite)
- 🟡 **Gold-Gelb:** 2. Aktionen (2× Schreiten – doppelte Reichweite)
- 🟠 **Orange:** 3. Aktionen (3× Schreiten – dein kompletter Standard-Zug)
- 🔵 **Cyan:** 4. Aktionen (Beschleunigt / Hast)
- 🔴 **Rot:** Unerreichbar / Blockiert / Wände / Unerforschter Nebel

### 🛌 Vollautomatische Zustandserkennung
- **Liegend (Prone):** Schaltet die Bewegung automatisch auf **Kriechen** (5 Fuß pro Aktion) um.
- **Talente:** Erkennt Talente wie **Flinkes Kriechen (Nimble Crawl)** oder **Schnelles Schleichen (Swift Sneak)** vollautomatisch und rechnet sie ein!
- **Bewegungsunfähig / Gelähmt / Gefesselt / Bewusstlos:** Setzt die Reichweite sofort auf 0 ft (Lineal wird komplett rot).
- **Verlangsamt & Betäubt:** Zieht automatisch Aktionen von deinem Aktionsbudget ab.
- **Beschleunigt (Hast):** Schaltet automatisch einen 4. Aktionsring (Cyan) frei!

### 👁️ Barrierefreiheit & Farbvielfalt
- **1-Klick-Profile für Farbfehlsichtigkeiten:**
  - **Rot-Grün (Deuteranopie / Grünschwäche):** Wissenschaftlich optimierte Kontrastpalette (Kobaltblau, Sonnengelb, Orange, Rotviolett, Ziegelrot).
  - **Rot-Grün (Protanopie / Rotsehschwäche):** Spezielle Palette (Himmelblau, Gelb, Orange, Tiefblau, Magenta).
  - **Blau-Gelb (Tritanopie / Blaublindheit):** Klare Farbpalette (Smaragdgrün, Zartrosa, Karmesinrot, Silberweiß, Dunkelschiefer).
- **Stil-Presets:** Standard PF2e, Vibrant Neon, Pastel Soft – oder erstelle deine eigenen Farben.

### 👣 Geisterpfad (Ghost Trail)
- Fahre im Kampf mit der Maus über ein beliebiges Token, um als schicken Schweif zu sehen, welchen Weg es in dieser Runde genommen hat.

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

1. **Token greifen und ziehen:** Klicke mit der linken Maustaste auf dein Token und ziehe es. Du siehst sofort die farbigen Aktionsbereiche.
2. **Hindurchturnen anpassen:** Drücke beim Ziehen kurz **T**, um fliegend zu entscheiden, ob du um Feinde herumläufst oder hindurchhechtest.
3. **Fliegen, Schwimmen & Klettern:** Klicke beim Ziehen (oder vor dem Zug auf das Token) mit der rechten Maustaste, um alternative Fortbewegungsarten zu wählen.
4. **Spielleiter-Optionen:**
   - Nutze das **Geister-Icon** in der linken Leiste (Foundry V14), um ungehindert durch Wände zu ziehen.
   - Oder halte **Alt** beim Ziehen gedrückt, um Wände zu ignorieren und sofort zu teleportieren.
5. **Farben & Einstellungen anpassen:** Unter **Einstellungen -> Moduleinstellungen -> Phil's PF2e Action Colours -> Konfiguration öffnen** findest du das übersichtliche 2-Spalten-Menü mit Live-Vorschau.

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
