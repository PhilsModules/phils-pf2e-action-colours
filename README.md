<div align="center">

# Phil's PF2e Action Colours 🚥

![Foundry v14 Compatible](https://img.shields.io/badge/Foundry-v14-brightgreen?style=flat-square) ![Foundry v13 Compatible](https://img.shields.io/badge/Foundry-v13-green?style=flat-square) ![License](https://img.shields.io/badge/License-GPLv3_%2F_CC_BY--NC--ND-blue?style=flat-square)
[![Version](https://img.shields.io/badge/Version-4.1.2-orange?style=flat-square)](https://github.com/PhilsModules/phils-pf2e-action-colours/releases) [![Patreon](https://img.shields.io/badge/SUPPORT-Patreon-ff424d?style=flat-square&logo=patreon)](https://www.patreon.com/PhilsModules)

<br>

**Pathfinder 2e Remaster tactical movement suite for Foundry V13 and V14: color-coded action ranges, map-wide smart routing, directional attack cover, and a GM Stealth and Seek assistant.**
<br>
_Taktische Pathfinder 2e Remaster Bewegungs- und Sicht-Erweiterung für Foundry V13 und V14: farbcodierte Aktionsreichweiten, kartenweite Wegfindung, automatische Angriffsdeckung und ein Schleich- und Such-Assistent für die Spielleitung._

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

**Phil's PF2e Action Colours** expands Foundry V13 and V14 native token movement for **Pathfinder 2e Remaster**. Whenever you drag a token, the ruler calculates how many actions a route costs in real time. Version 4.0.0 combines scene-wide pathfinding around walls and doors, automated **Tumble Through** checks, persistent combat cover and flanking badges, automatic directional cover on attack rolls, and a GM-only **Stealth & Seek Assistant** with per-player token visibility.

---

## ⚔️ Action Economy & Automatic PF2e Conditions

### 🎨 Action Economy Colors
- 🟢 **Green:** 1 Action (1× Stride, standard movement range)
- 🟡 **Yellow:** 2 Actions (2× Stride, double movement range)
- 🟠 **Orange:** 3 Actions (3× Stride, full standard turn)
- 🔵 **Cyan:** 4 Actions (Quickened / Haste)
- 🔴 **Red:** Unreachable destination, blocked route, solid walls, or unexplored Fog of War
- **Exploration Mode Palette:** Outside combat encounters, the ruler automatically switches to a cleaner palette showing green for open movement and red for blocked terrain.

### 🛌 Automatic Condition & Feat Engine
- **Prone:** Switches movement to **Crawl** at 5 ft per action.
- **Feats:** Automatically detects **Nimble Crawl** (faster crawl speed) and **Swift Sneak** (full speed while sneaking).
- **Locked Movement:** Conditions including **Immobilized**, **Paralyzed**, **Restrained**, **Grabbed**, **Petrified**, and **Unconscious** immediately lock the ruler to 0 ft (all red).
- **Slowed & Stunned:** Deducts lost actions directly from your turn budget so distances past your remaining actions turn red.
- **Quickened (Haste):** Unlocks the 4th action band in Cyan automatically.
- **Accurate Movement Speeds:** Supports **Fly**, **Swim**, **Burrow**, and **Climb** modes with authentic PF2e Athletics fallbacks, paired with a standard PF2e fallback speed of 25 ft.

---

## 🧭 Smart Map-Wide Routing & Tactical Movement

### 🗺️ Unlimited Scene-Wide Routing & Large Footprints
- **No Range Limit:** Tokens calculate valid routes across entire maps and sprawling dungeons without hitting a fixed distance cutoff.
- **Multi-Square Footprints:** Large and oversized creatures (`2×2`, `3×3`, `4×4`, and larger) test their full body footprint around walls and doorways so oversized tokens never squeeze through single-square openings.

### 🤸 Automated PF2e Tumble Through & Live Hotkey (`T`)
- **Rule Enforcement:** Dragging across an opposing creature stops at the square directly in front of the defender. Depending on your prompt mode setting, you can confirm your Acrobatics bonus in a dialog before rolling **Tumble Through** (Acrobatics vs. enemy Reflex DC) or trigger checks right away.
- **Roll Outcomes:**
  - ✅ **Success or Critical Success:** Your character tumbles through the enemy square and completes the remaining planned path.
  - ❌ **Failure or Critical Failure:** Movement ends immediately on the clear square in front of the opponent.
- **Safe Endpoints:** You can never drop a token directly on top of an opposing creature. Movement always stops on the last open square without rolling.
- **Live Tumble Toggle (`T`):** While dragging your token, tap **T** (customizable in settings) to recalculate the route right under your cursor, alternating instantly between walking around enemies and tumbling through them.
- **Out-of-Combat GM Control:** Outside combat encounters, Game Masters can require **Tumble Through** checks or make tokens always halt peacefully before enemies. Free unrestricted exploration travel is also selectable.

### 🚪 Closed Door Routing & Interactive Door Prompt
- **Doorway Preview:** Planned routes through explored areas keep action colors up to a closed or locked door and turn red behind it. Secret doors stay completely hidden and impassable.
- **Open Doors Mid-Move:** Releasing your token behind an unlocked closed door walks up to the doorway and offers an interactive prompt to open the door and finish the rest of the move.

### 🌫️ Fog of War Anti-Spoiler Shield
- Dragging into black unexplored fog turns the path red and prevents movement so players cannot probe hidden walls or secret chambers in advance.
- Previously explored rooms and corridors remain navigable even when currently out of direct line of sight.

### 👁️ Corner Ambush Detection
- When a moving creature rounds a corner and gains line of sight to an unseen enemy along the planned path, movement pauses on the exact square of discovery.
- A quick dialog lets you choose **Replan Movement** to stay safely at the corner or **Charge Forward** to continue toward the revealed opponent.

### 👣 Combat Ghost Trail (Anti-Spoiler Aware)
- Hovering over a token during combat displays a ghost line showing the route it traveled on its turn.
- Trails belonging to **Hidden** or **Undetected** tokens are automatically concealed from non-owners so hidden positions are never leaked.

---

## 🛡️ Live Tactical Preview, Cover & Flanking

### 📊 Persistent Combat Badges & Drag Sightlines
- **Always Visible When Selected in Combat:** While in active combat, selecting a token keeps active **Flanked (-2 AC)** and directional cover badges (`+1 / +2 / +4` AC) permanently displayed instead of hiding them between drags.
- **Live Drag Previews:** Dragging a token previews real-time sightlines and cover arcs between your destination square and surrounding adversaries.
- **Quick Toggle (`V`):** Tap **V** (customizable in settings) anytime to show or hide tactical badges and sightlines on the canvas.

### 🎯 Automatic Directional Cover on PF2e Attack Rolls
- **Corner-to-Corner Cover Measurement:** Attacking a targeted token measures cover between attacker and defender across walls and intervening creatures, then adds the matching PF2e circumstance bonus (**+1** Lesser, **+2** Standard, **+4** Greater) to target AC.
- **Authentic Stacking Rules:** Existing circumstance bonuses such as **Raise a Shield** or an active cover effect are honored so cover is never applied twice, while penalties such as **Off-Guard** stay untouched.
- **Read-Only Player Notice & GM Override:** Inside the roll modifiers dialog, players see a read-only cover indicator so attackers cannot disable enemy cover. Game Masters receive quick override buttons to adjust or clear cover before rolling. Applied bonuses appear as a compact badge on the attack chat card without revealing hidden enemy base AC.
- **GM Control Modes:** In *Tactical Preview* settings, Game Masters can apply cover automatically on every targeted attack or limit adjustments to the roll modifiers dialog. Attack cover can also be turned off to keep preview badges only.

### 👁️ Colorblind Presets & Palette Sync
- **1-Click Colorblind Palettes:**
  - **Red-Green (Deuteranopia):** Cobalt Blue, Sun Yellow, Amber Orange, Violet, and Brick Red.
  - **Red-Green (Protanopia):** Sky Blue, Yellow, Orange, Deep Blue, and Magenta.
  - **Blue-Yellow (Tritanopia):** Emerald Mint, Soft Rose, Crimson, Silver White, and Charcoal Dark.
- **Style Presets:** Choose **Standard PF2e**, **Neon Contrast**, **Pastel Soft**, or define your own palette with custom color pickers.
- **Tactical Sync:** Sightlines, cover arcs, flanking highlights, and drag status badges sync automatically to your active preset with clear symbols and distinct border patterns.

---

## 👁️ PF2e Stealth & Seek Assistant & Per-Player Visibility

*(Exclusively for Game Masters. Automatically yields if **PF2e Visioner** is enabled so both modules never conflict.)*

### 🎲 Roll-Driven Stealth & Seek GM Dialog
- **Automatic Roll Recognition:** Opens for the Game Master whenever a creature rolls **Hide**, **Sneak**, **Seek**, or **Avoid Notice** in chat.
- **PF2e Context Check:** Compares the secret check against opposing Perception DCs while evaluating scene lighting (Bright Light through Darkness), creature senses (including Darkvision and Low-Light Vision), and qualifying cover or concealment (displaying a warning when **Hide** lacks cover).
- **1-Click GM Resolution:** Inspect each observer or target row, jump the camera with focus buttons, override states (**Observed**, **Concealed**, **Hidden**, and **Undetected**), post an optional GM whisper summary, or apply everything with one click.

### 👥 True Per-Player Visibility & Last Known (`?`) Markers
- **Per-Player Token Hiding:** Creatures marked **Undetected** against a player vanish completely from that player's view while staying visible to the Game Master and owning players. Creatures marked **Hidden** render semi-transparent.
- **Last Known Position (`?`) Marker:** When a **Hidden** creature successfully uses **Sneak** to become **Undetected**, opposing players see a subtle `?` marker on its previous square instead of watching the enemy move.
- **Hidden Move Anti-Spoiler Guard:** Dragging a **Hidden** token without rolling **Sneak** first pauses movement immediately with a warning toast so secret locations stay hidden. Only the GM receives an interactive prompt with buttons to **Reveal & Move**, **Move Secretly (? Marker)**, roll **Sneak**, or dismiss the move.

### 🏷️ Canvas Condition Badges & GM Quick Controls
- **Smooth Canvas Badges:** Selecting or hovering a token as GM renders PF2e condition icons (**Concealed**, **Hidden**, **Undetected**, and **Invisible**) directly on the battlefield without panning stutter.
- **Tooltips & Instant Overrides:** Hover a badge to read the PF2e rule summary, or click any badge to switch or reset that pair's visibility immediately.
- **GM Mode Bar & Controls:** A compact top bar switches between **Cannot See** and **Hidden From** views with a **Reveal** button. Each token's HUD adds a quick stealth button (left-click to manage, right-click to reset), paired with a visibility reset tool in the left Scene Controls palette.

---

## ⚙️ Configuration Window & GM Shortcuts

- **Redesigned 5-Tab Settings Menu:** Open a resizable window grouped into five categories (**Colors & Presets**, **Routing & Combat**, **Tactical Preview**, **Rules & Trail**, and **System & Profiles**). Features live search across every setting, toggle switches, a live ruler preview, an **Apply** button with an unsaved change counter, section resets, and settings export/import backups.
- **GM Ghost Mode (Foundry V14):** Toggle Foundry V14's native Unconstrained Movement ghost icon in the left Scene Controls palette to move tokens freely through walls without holding hotkeys.
- **GM Alt-Teleport:** Hold **Alt** while dragging any token to ignore walls, closed doors, elevation barriers, and difficult terrain, placing the token immediately upon release without animation.

---

## 📦 Installation & Requirements

- **Required Dependency:** Requires [libWrapper](https://foundryvtt.com/packages/lib-wrapper) (`1.12.0` or newer).
- **Supported Foundry Versions:** Foundry VTT **v13** and **v14** with **Pathfinder 2e (`pf2e`)**.

1. Open Foundry VTT and navigate to **Add-on Modules**.
2. Click **Install Module**.
3. Paste the Manifest URL:
   ```text
   https://github.com/PhilsModules/phils-pf2e-action-colours/releases/latest/download/module.json
   ```
4. Click **Install**, then enable both **Phils PF2e Action Colours** and **libWrapper** in your world.

---

## 📖 Quick Start (Step-by-Step)

1. **Move Your Token:** Left-click and drag across the map to inspect action bands and routed paths in real time.
2. **Switch Tumble Routing (`T`):** Tap **T** mid-drag to alternate between walking around foes and tumbling through them.
3. **Toggle Tactical Overlays (`V`):** Tap **V** anytime to show or hide combat flanking and cover badges plus live sightlines.
4. **Change Movement Modes:** Right-click while dragging (or right-click your token controls) to pick **Fly**, **Swim**, **Burrow**, or **Climb**.
5. **Manage Stealth & Visibility (GM):** Roll **Hide**, **Sneak**, **Seek**, or **Avoid Notice** from a sheet to open the GM assistant, or hover/click any token as GM to view and adjust PF2e condition badges directly on the map.
6. **Customize Everything:** Open **Configure Settings -> Module Settings -> Phils PF2e Action Colours -> Open Configuration** to edit colors, routing rules, hotkeys, and backups.

<br>

---

<br>

# <img src="https://flagcdn.com/48x36/de.png" width="28" height="21" alt="DE"> Deutsche Anleitung

**Phil's PF2e Action Colours** erweitert die native Token-Bewegung in Foundry V13 und V14 gezielt für **Pathfinder 2e Remaster**. Sobald du ein Token ziehst, zeigt das Lineal in Echtzeit, wie viele Aktionen der Weg kostet. Version 4.0.0 vereint kartenweite Wegfindung um Wände und Türen, automatische **Hindurchturnen**-Proben, dauerhafte Kampf-Badges für Flankierung und Deckung, automatische Angriffsdeckung sowie einen **Schleich- und Such-Assistenten** für die Spielleitung mit echter Spieler-Sichtbarkeit.

---

## ⚔️ Aktionsökonomie & Automatische PF2e-Zustände

### 🎨 Aktionsfarben
- 🟢 **Grün:** 1. Aktion (1× Schreiten, einfache Bewegungsreichweite)
- 🟡 **Gelb:** 2. Aktionen (2× Schreiten, doppelte Bewegungsreichweite)
- 🟠 **Orange:** 3. Aktionen (3× Schreiten, kompletter Standard-Zug)
- 🔵 **Cyan:** 4. Aktionen (Beschleunigt / Hast)
- 🔴 **Rot:** Unerreichbares Ziel, blockierter Weg, massive Wände oder unerforschter Nebel des Krieges
- **Erkundungs-Palette:** Außerhalb aktiver Kämpfe nutzt das Lineal eine ruhige Erkundungs-Palette mit Grün für freie Wege und Rot für blockierte Bereiche.

### 🛌 Automatische Zustandserkennung & Talente
- **Liegend (Prone):** Schaltet die Bewegung automatisch auf **Kriechen** (1,5 Meter pro Aktion) um.
- **Talente:** Erkennt automatisch **Flinkes Kriechen (Nimble Crawl)** für schnelleres Kriechen und **Schnelles Schleichen (Swift Sneak)** für volle Geschwindigkeit beim Schleichen.
- **Blockierte Bewegung:** Zustände wie **Bewegungsunfähig**, **Gelähmt**, **Gefesselt**, **Gepackt**, **Versteinert** und **Bewusstlos** setzen das Lineal sofort auf 0 Meter (komplett rot).
- **Verlangsamt & Betäubt:** Zieht verlorene Aktionen direkt vom Aktionsbudget ab, sodass Entfernungen außerhalb der verbleibenden Aktionen rot werden.
- **Beschleunigt (Hast):** Schaltet den 4. Aktionsbereich in Cyan automatisch frei.
- **Präzise Bewegungsarten:** Unterstützt **Fliegen**, **Schwimmen**, **Graben** und **Klettern** inklusive PF2e-Athletik-Regeln sowie einer Standard-Geschwindigkeit von 7,5 Metern als Fallback.

---

## 🧭 Kartenweite Wegfindung & Taktische Bewegung

### 🗺️ Unbegrenzte Routen & Große Kreaturen
- **Kein Entfernungs-Limit:** Tokens berechnen gültige Wege über komplette Dungeons und große Schlachtkarten ohne vorzeitiges Reichweiten-Limit.
- **Flächenprüfung für große Kreaturen:** Große Kreaturen (`2×2`, `3×3`, `4×4` und größer) prüfen ihre tatsächliche Körperbreite an Wänden und Türrahmen, damit riesige Tokens nicht durch 1-Feld-Lücken schlüpfen.

### 🤸 Automatisches Hindurchturnen (Tumble Through) & Taste `T`
- **Regeltreuer Ablauf:** Ziehst du durch das Feld eines Gegners, stoppt das Token direkt vor ihm. Je nach Einstellung siehst du zuerst deinen Akrobatik-Wert im Dialog oder löst die **Hindurchturnen**-Probe (Akrobatik gegen Reflex-SG) direkt aus.
- **Ausgang des Wurfs:**
  - ✅ **Erfolg oder Kritischer Erfolg:** Dein Charakter turnt durch das gegnerische Feld und geht den restlichen Weg weiter.
  - ❌ **Misserfolg oder Kritischer Fehlschlag:** Die Bewegung endet auf dem freien Feld vor dem Verteidiger.
- **Kein Steckenbleiben:** Ein Zug endet niemals mitten auf einem gegnerischen Token. Das Lineal stoppt vorher auf dem letzten freien Feld ohne unnötigen Wurf.
- **Live-Umschalten beim Ziehen (`T`):** Tippe während des Ziehens kurz auf **T** (in den Einstellungen anpassbar), um zwischen dem Umweg außen herum und dem Hindurchturnen direkt unter dem Mauszeiger zu wechseln.
- **Optionen außerhalb des Kampfes:** Für Erkundungsphasen kann die Spielleitung festlegen, ob Proben verlangt werden oder Tokens vor Feinden automatisch stehen bleiben. Freie Bewegung ohne Gegner-Barriere lässt sich ebenfalls wählen.

### 🚪 Geschlossene Türen & Interaktive Tür-Abfrage
- **Klare Türvorschau:** Durch erkundete Räume bleiben Aktionsfarben bis zur geschlossenen oder verschlossenen Tür erhalten, dahinter färbt sich der Pfad rot. Geheime Türen bleiben unentdeckt und unpassierbar.
- **Türen im Gehen öffnen:** Lässt du das Token hinter einer geschlossenen unverschlossenen Tür los, läuft es bis zur Tür und bietet per Rückfrage an, sie direkt zu öffnen und den Restweg fortzusetzen.

### 🌫️ Nebel des Krieges & Anti-Spoiler-Schutz
- Ziehst du in unerforschten schwarzen Nebel, wird die Linie rot und das Ablegen wird blockiert, sodass keine geheimen Räume oder Wände ertastet werden können.
- Bereits aufgedeckte Räume und Gänge bleiben begehbar, auch wenn gerade keine direkte Sichtlinie besteht.

### 👁️ Hinterhalt-Stopp an Ecken
- Biegt ein Token um eine Ecke und erhält entlang seiner geplanten Route erstmals Sichtlinie zu einem zuvor ungesehenen Gegner, pausiert die Bewegung exakt auf dem Entdeckungsfeld.
- Per Abfrage entscheidest du dich für **Bewegung neu planen** an der Ecke oder **Weiter vorrücken** bis zum Ziel.

### 👣 Geisterpfad im Kampf (Anti-Spoiler)
- Fahre im Kampf mit der Maus über ein Token, um den zuletzt gelaufenen Zug als Linie zu sehen.
- Pfade von Kreaturen mit **Verborgen** oder **Unentdeckt** werden für Nicht-Besitzer automatisch verborgen, damit geheime Positionen geschützt bleiben.

---

## 🛡️ Taktik-Vorschau, Deckung & Flankieren

### 📊 Dauerhafte Kampf-Badges & Sichtlinien beim Ziehen
- **Immer sichtbar im Kampf:** Sobald du im aktiven Kampf ein Token auswählst, bleiben **Flankiert (-2 RK)** und Richtungsdeckung (`+1 / +2 / +4` RK) dauerhaft eingeblendet, nicht erst beim Wegziehen.
- **Live-Vorschau beim Ziehen:** Beim Verschieben zeigt das Modul zusätzlich Sichtlinien und Deckungsbögen in Echtzeit zum Zielfeld an.
- **Schnell-Umschalter (`V`):** Mit der Taste **V** (frei belegbar) blendest du Taktik-Badges und Sichtlinien jederzeit ein oder aus.

### 🎯 Automatische Richtungsdeckung bei PF2e-Angriffswürfen
- **Ecke-zu-Ecke-Berechnung:** Greift ein Token ein anvisiertes Ziel an, prüft das Modul Wände und dazwischenstehende Kreaturen und addiert den passenden Situationsbonus (**+1** Leicht, **+2** Standard, **+4** Erhöht) zur Ziel-RK.
- **Saubere PF2e-Stapelregeln:** Aktive Situationsboni wie **Schild erheben** oder ein bereits bestehender Deckungseffekt werden berücksichtigt und nie doppelt gezählt, während Mali wie **Auf dem falschen Fuß** erhalten bleiben.
- **Schreibgeschützt für Spieler & SL-Korrektur:** Im Modifikatoren-Dialog sehen Angreifer die Deckung nur lesend und können sie nicht abschalten. Nur die Spielleitung erhält Buttons zur schnellen Anpassung vor dem Wurf. Ein wirksamer Bonus erscheint zudem kompakt auf der Chat-Karte, ohne die geheime Basis-RK preiszugeben.
- **Steuerung durch die Spielleitung:** Im Reiter *Taktik-Vorschau* lässt sich festlegen, ob Angriffsdeckung vollautomatisch greift oder nur im Wurfdialog bearbeitet wird. Alternativ bleibt nur die rein visuelle Vorschau aktiv.

### 👁️ Farbschwäche-Profile & Farb-Presets
- **1-Klick-Profile für Farbfehlsichtigkeit:**
  - **Rot-Grün (Deuteranopie):** Kobaltblau, Sonnengelb, Orange, Violett und Ziegelrot.
  - **Rot-Grün (Protanopie):** Himmelblau, Gelb, Orange, Tiefblau und Magenta.
  - **Blau-Gelb (Tritanopie):** Smaragdgrün, Zartrosa, Karmesinrot, Silberweiß und Dunkelschiefer.
- **Stil-Presets:** Wähle zwischen **Standard PF2e**, **Neon Kontrast**, **Pastel Soft** oder völlig eigenen Farben per Farbauswahl.
- **Einheitliche Taktik-Farben:** Sichtlinien, Deckungsbögen, Flankierungs-Ringe und Status-Badges passen sich automatisch deinem Farbprofil mit klaren Symbolen und Mustern an.

---

## 👁️ PF2e Schleich- & Such-Assistent & Sichtbarkeit pro Spieler

*(Exklusiv für die Spielleitung. Pausiert automatisch, sobald **PF2e Visioner** aktiv ist.)*

### 🎲 Automatischer SL-Assistent bei Schleichen & Suchen
- **Erkennt PF2e-Würfe:** Öffnet sich für die Spielleitung automatisch bei Würfen auf **Verstecken (Hide)**, **Schleichen (Sneak)**, **Suchen (Seek)** und **Bemerktwerden vermeiden (Avoid Notice)**.
- **Regel- und Lichtauswertung:** Vergleicht den geheimen Wurf mit gegnerischen Wahrnehmungs-SGs und prüft Lichtverhältnisse (von hellem Licht bis Dunkelheit), Sinne (wie Dunkelsicht und Dämmersicht) sowie Deckungs-Voraussetzungen inklusive Warnhinweis bei fehlender Deckung.
- **Direkte Übernahme:** Prüfe jede Zeile, fokussiere Tokens per Button, passe Zustände (**Beobachtet**, **Getarnt**, **Verborgen** und **Unentdeckt**) direkt an, schicke optional ein SL-Flüstern oder übernimm alle Sichtbarkeiten mit einem Klick.

### 👥 Echte Spieler-Sichtbarkeit & Letzte-Position-Marker (`?`)
- **Individuelles Ausblenden:** Tokens im Zustand **Unentdeckt** verschwinden für betroffene Spieler komplett von der Karte, bleiben für den Besitzer und die Spielleitung aber sichtbar. Tokens im Zustand **Verborgen** erscheinen halbtransparent.
- **Letzte bekannte Position (`?`):** Schleicht ein **Verborgen**-Token erfolgreich in den Zustand **Unentdeckt**, sehen gegnerische Spieler einen dezenten `?`-Marker am letzten bekannten Feld statt der laufenden Bewegung.
- **Schutz gegen versehentliches Ziehen:** Zieht jemand ein **Verborgen**-Token ohne vorherigen **Schleichen**-Wurf, wird die Bewegung sofort gestoppt und ein kurzer Warnhinweis erscheint. Ausschließlich die Spielleitung bekommt daraufhin das Entscheidungs-Fenster mit Buttons für **Aufdecken & bewegen**, **Geheim bewegen (?)**, **Schleichen würfeln** sowie zum Schließen der Meldung.

### 🏷️ Karten-Badges & SL-Steuerung ohne Ruckeln
- **Direkte Canvas-Badges:** Beim Hovern oder Markieren als Spielleitung erscheinen PF2e-Zustandsicons (**Getarnt**, **Verborgen**, **Unentdeckt** und **Unsichtbar**) ruckelfrei direkt am Token ohne Verzögerung beim Verschieben der Karte.
- **Tooltips & Schnell-Menü:** Fahre über ein Badge für die PF2e-Regelinfo, oder klicke darauf, um genau dieses Paar sofort umzuschalten oder aufzudecken.
- **SL-Modusleiste & Werkzeuge:** Die kompakte Leiste am oberen Rand schaltet zwischen **Sieht nicht** und **Verborgen vor** um und bietet ein schnelles **Aufdecken**. Im Token-HUD gibt es einen direkten Sichtbarkeits-Button (Linksklick zum Verwalten, Rechtsklick zum Zurücksetzen), ergänzt durch einen Szenen-Reset in der linken Werkzeugleiste.

---

## ⚙️ Konfigurationsmenü & SL-Werkzeuge

- **Überarbeitetes 5-Tab-Menü:** Ein größenveränderbares Einstellungsfenster mit fünf Bereichen (**Farben & Presets**, **Routing & Kampf**, **Taktik-Vorschau**, **Regeln & Pfad** sowie **System & Profile**). Enthält Live-Suche über alle Optionen, übersichtliche Kippschalter, Live-Linealvorschau, einen **Anwenden**-Button mit Änderungszähler, Bereichs-Reset sowie Backup-Export und Backup-Import.
- **SL-Geistermodus (Foundry V14):** Aktiviere das Geister-Symbol in der linken Foundry-V14-Werkzeugleiste für freie Bewegung durch Wände ohne Tastendruck.
- **SL-Alt-Teleport:** Halte **Alt** beim Ziehen eines Tokens gedrückt, um Wände, geschlossene Türen, Höhenbarrieren und schwieriges Gelände zu ignorieren und das Token direkt ohne Laufanimation zu platzieren.

---

## 📦 Installation & Voraussetzungen

- **Erforderliches Modul:** Benötigt [libWrapper](https://foundryvtt.com/packages/lib-wrapper) (Version `1.12.0` oder neuer).
- **Unterstützte Foundry-Versionen:** Foundry VTT **v13** und **v14** mit dem System **Pathfinder 2e (`pf2e`)**.

1. Öffne Foundry VTT und wechsle zu **Add-on Module**.
2. Klicke auf **Modul Installieren**.
3. Füge die Manifest-URL ein:
   ```text
   https://github.com/PhilsModules/phils-pf2e-action-colours/releases/latest/download/module.json
   ```
4. Klicke auf **Installieren** und aktiviere in deiner Welt sowohl **Phils PF2e Action Colours** als auch **libWrapper**.

---

## 📖 Schnellanleitung (Schritt für Schritt)

1. **Token bewegen:** Ziehe dein Token mit der linken Maustaste über die Karte, um Aktionsbereiche und Umgehungswege live zu sehen.
2. **Hindurchturnen umschalten (`T`):** Tippe beim Ziehen auf **T**, um sofort zwischen Ausweichen und **Hindurchturnen** zu wechseln.
3. **Taktik-Anzeige umschalten (`V`):** Tippe jederzeit auf **V**, um Taktik-Badges für Flankierung und Deckung sowie Sichtlinien ein- oder auszublenden.
4. **Bewegungsart wechseln:** Klicke beim Ziehen (oder an der Token-Auswahl) mit der rechten Maustaste, um **Fliegen**, **Schwimmen**, **Graben** oder **Klettern** auszuwählen.
5. **Schleichen & Sichtbarkeit nutzen (SL):** Würfle **Verstecken**, **Schleichen**, **Suchen** oder **Bemerktwerden vermeiden** vom Charakterbogen aus, um den SL-Assistenten zu öffnen, oder fahre als Spielleitung über ein Token auf der Karte, um Zustands-Badges per Klick anzupassen.
6. **Feintuning & Backups:** Öffne **Einstellungen -> Moduleinstellungen -> Phil's PF2e Action Colours -> Konfiguration öffnen** für Farbprofile, Regeln, Hotkeys und Backups.

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
