# 003 — Sudoku Spielfeld

## Kontext
Nach Auswahl des Schwierigkeitsgrads auf der Startseite soll der Nutzer ein Sudoku-Puzzle lösen können. Diese Spec beschreibt das Spielfeld, die Zellauswahl, das Highlighting und die Eingabemöglichkeiten. Validierung der Eingaben folgt in einer späteren Spec.

## Features
- [ ] 9x9 Grid aus einzelnen weißen, leicht abgerundeten Quadraten mit Abständen
- [ ] Größerer Abstand alle 3 Zeilen/Spalten zur Visualisierung der 3x3-Blöcke
- [ ] Puzzle wird beim Laden generiert (via `generateSudoku` aus Engine)
- [ ] Vorgegebene Zellen: weiße Schrift, nicht editierbar
- [ ] Leere/befüllte Zellen: hellgraue Schrift, editierbar
- [ ] Zellauswahl per Klick mit Highlighting (Zeile, Spalte, 3x3-Box, aktive Zelle)
- [ ] Erneuter Klick auf aktive Zelle deselektiert
- [ ] Eingabe via Tastatur (Zahlenreihe + Nummernblock) und UI-Zahlenleiste (1-9 + Radiergummi)
- [ ] Backspace/Delete leert eine Zelle
- [ ] Eingaben sind überschreibbar

## Technische Details

### Grid-Layout
- Jede Zelle: weißer Border, leicht abgerundete Ecken (`border-radius`)
- Hintergrund der Zellen: halbtransparent/leicht transparent (auf dem Gradient sichtbar)
- Gap zwischen Zellen: klein (z.B. 2-3px)
- Gap zwischen 3x3-Blöcken: größer (z.B. 6-8px)
- Umsetzung: CSS Grid mit variablen Gaps oder 3x3-Block-Container

### Highlighting (bei aktiver Zelle)
- Zeile: leichtes halbtransparentes Weiß als Hintergrund
- Spalte: leichtes halbtransparentes Weiß als Hintergrund
- 3x3-Box: leichtes halbtransparentes Weiß als Hintergrund
- Aktive Zelle: stärkerer Glow/Leucht-Effekt (z.B. box-shadow + hellerer Hintergrund)
- Überlappungen (Zelle liegt in Zeile UND Spalte) sollen sich addieren

### Eingabe
- Tastatur: Tasten 1-9 (Zahlenreihe + Numpad), Backspace/Delete zum Leeren
- UI-Leiste: Buttons 1-9 + Radiergummi-Button, unterhalb des Grids
- Eingabe wirkt nur auf die aktuell aktive Zelle
- Vorgegebene Zellen ignorieren Eingaben

### State
- `puzzle`: aktueller Board-Zustand (wird durch Eingaben verändert)
- `solution`: unveränderliche Lösung (aus Generator)
- `initialPuzzle`: unveränderliches Ausgangs-Puzzle (um vorgegebene vs. eingegebene Zellen zu unterscheiden)
- `selectedCell`: `{ row, col } | null`

## Akzeptanzkriterien
- [ ] Grid zeigt 9x9 Zellen mit sichtbaren 3x3-Block-Abständen
- [ ] Vorgegebene Zahlen sind weiß und nicht editierbar
- [ ] Eingegebene Zahlen sind hellgrau und überschreibbar
- [ ] Klick auf leere/editierbare Zelle selektiert sie mit sichtbarem Highlighting (Zeile, Spalte, Box, Zelle)
- [ ] Erneuter Klick auf selbe Zelle deselektiert
- [ ] Klick auf andere Zelle wechselt Selektion
- [ ] Zahlenreihe (1-9), Nummernblock (1-9), UI-Buttons (1-9) setzen Wert in aktive Zelle
- [ ] Backspace, Delete und Radiergummi-Button leeren eine editierbare Zelle
- [ ] Vorgegebene Zellen können nicht geleert oder überschrieben werden
- [ ] Hintergrund ist der gleiche Gradient wie auf der Startseite

## Offene Fragen
Keine.
