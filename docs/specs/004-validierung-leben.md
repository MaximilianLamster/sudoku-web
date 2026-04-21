# 004 — Validierung & Leben

## Kontext
Der Spieler soll Feedback bekommen wenn er eine falsche Zahl eingibt. Drei Leben begrenzen die Fehler, danach ist das Spiel verloren. Bei korrekter Lösung aller Zellen wird ein Gewinn angezeigt.

## Features
- [ ] 3 Herzen (Leben) oben rechts im Spielfeld
- [ ] Validierung jeder Eingabe gegen die Lösung
- [ ] Falsche Eingabe: Leben abziehen, rote Markierung
- [ ] Kollidierende Zellen (gleiche Zahl in Zeile/Spalte/Box) 2 Sekunden rot markieren
- [ ] Schrift der falsch eingegebenen Zelle bleibt dauerhaft rot
- [ ] Falsche Zahl bleibt in der Zelle stehen
- [ ] Game Over Overlay bei 0 Leben
- [ ] Win Overlay bei vollständig korrekter Lösung

## Technische Details

### Leben
- 3 Herzen, dargestellt als Unicode-Symbole (❤️ voll, 🤍 oder ausgegraut = verloren)
- Position: oben rechts über dem Grid
- State: `lives: number` im Game-Hook

### Validierung
- Bei jeder Eingabe (`setCellValue`): Prüfung `value === solution[row][col]`
- Korrekt: Zahl wird normal gesetzt (hellgrau)
- Falsch:
  1. `lives -= 1`
  2. Zahl wird gesetzt, Schrift dauerhaft rot markiert
  3. Alle Zellen mit gleicher Zahl in gleicher Zeile/Spalte/Box werden 2 Sekunden rot markiert (Hintergrund/Border flash)
  4. Nach 2 Sekunden: Kollisions-Markierung verschwindet, Schrift der falschen Zelle bleibt rot

### Fehler-State
- `errorCells: Set<string>` (Format `"row-col"`) — Zellen mit dauerhaft roter Schrift
- `flashCells: Set<string>` — Zellen mit temporärer roter Markierung (2s Timer)

### Game Over (lives === 0)
- Milchig verschwommenes Overlay über dem gesamten Spielfeld
- Text: "You lost"
- "Okay" Button navigiert zurück zu `/`
- Keine weitere Eingabe möglich

### Win (alle Zellen korrekt)
- Prüfung nach jeder Eingabe: `puzzle` komplett gefüllt (keine 0) und identisch mit `solution`
- Milchig verschwommenes Overlay
- Text: "Congratulations, You Win"
- "Okay" Button navigiert zurück zu `/`

### Overlay-Styling
- `backdrop-filter: blur(8px)` + halbtransparenter weißer Hintergrund
- Zentrierter Text, großer Font
- Button im gleichen Stil wie die Difficulty-Buttons

## Akzeptanzkriterien
- [ ] 3 Herzen werden oben rechts angezeigt
- [ ] Falsche Eingabe zieht ein Leben ab (Herz wird ausgegraut)
- [ ] Falsche Eingabe: Schrift der Zelle ist dauerhaft rot
- [ ] Falsche Eingabe: Kollidierende Zellen blitzen 2 Sekunden rot auf
- [ ] Nach 2 Sekunden verschwindet die rote Markierung der kollidierenden Zellen
- [ ] Korrekte Eingabe zeigt keine rote Markierung
- [ ] Bei 0 Leben erscheint "You lost" Overlay mit Blur-Effekt
- [ ] Bei vollständiger korrekter Lösung erscheint "Congratulations, You Win" Overlay
- [ ] Okay-Button in beiden Overlays navigiert zurück zur Startseite
- [ ] Keine Eingabe möglich nach Game Over

## Offene Fragen
Keine.
