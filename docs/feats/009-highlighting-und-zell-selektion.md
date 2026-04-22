# Feature 009 — Highlighting & Zell-Selektion

Basiert auf: `docs/specs/009-highlighting-und-zell-selektion.md`
Plan: `docs/plans/009-highlighting-und-zell-selektion.md`

## Was wurde umgesetzt

- **Leere Zelle selektiert**: Zeile, Spalte und Haus werden wie bisher highlighted
- **Zelle mit Zahl selektiert**: kein Zeile/Spalte/Haus-Highlighting; alle anderen Zellen mit gleichem Wert erhalten schwächeren Glow (`isSameNumber`)
- `isSameNumber`-Glow: `box-shadow: 0 0 4px 1px` (schwächer als Selected `0 0 6px 1px`), leicht hellere Border
- Zelle bleibt nach korrektem Eintrag selektiert — `setSelectedCell(null)` entfernt

## Betroffene Dateien

- `src/hooks/useSudokuGame.ts` — `setSelectedCell(null)` nach korrektem Eintrag entfernt
- `src/components/SudokuGrid.tsx` — `selectedValue` berechnet, Highlighting-Logik aufgeteilt, `isSameNumber` an SudokuCell
- `src/components/SudokuCell.tsx` — `$isSameNumber`-Prop, schwächerer Glow in `box-shadow` und `border-color`

## Auswirkungen

- `SudokuGrid` benötigt kein `solution`-Prop mehr (entfernt)

## Status

Abgeschlossen
