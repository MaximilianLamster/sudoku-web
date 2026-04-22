# 010 — Mobile Responsive Layout

## Kontext
Das Spiel soll auf Smartphones ab 375px Viewport-Breite im Portrait-Modus spielbar sein. Grid und Buttons müssen proportional schrumpfen, da die aktuellen Größen (Grid ~552px, NumberPad ~650px) nicht auf mobile Screens passen.

## Features

- [ ] Sudoku-Grid skaliert auf Mobile proportional kleiner (Zellen, Spacer, Gaps)
- [ ] NumberPad: Ziffern 1–9 bleiben immer in einer Zeile; Erase und Hint-Button umbrechen in eine zentrierte zweite Zeile
- [ ] Schriftgrößen in Zellen und Hints skalieren mit
- [ ] Seitenpadding auf Mobile reduziert
- [ ] Nur Portrait-Modus unterstützt (kein Landscape-Handling)

## Akzeptanzkriterien

- [ ] Auf 375px Viewport passt das Grid vollständig horizontal ohne horizontales Scrollen
- [ ] Auf 375px Viewport passt der NumberPad (1–9 Zeile) vollständig ohne horizontales Scrollen
- [ ] Erase und Hint erscheinen zentriert unter der 1–9-Zeile
- [ ] Tap-Targets sind groß genug für Touch-Bedienung (min. 30px)
- [ ] Desktop-Layout (≥600px) bleibt unverändert

## Offene Fragen

Keine.
