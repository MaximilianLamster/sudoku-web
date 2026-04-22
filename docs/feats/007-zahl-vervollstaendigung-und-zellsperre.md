# Feature 007 — Zahl-Vervollständigung & Zellsperre

Basiert auf: `docs/specs/007-zahl-vervollstaendigung-und-zellsperre.md`
Plan: `docs/plans/007-zahl-vervollstaendigung-und-zellsperre.md`

## Was wurde umgesetzt

- `completedNumbers` (Set<number>): reaktives useMemo — enthält alle Zahlen, deren 9 Instanzen korrekt platziert sind
- Zahl-Buttons werden disabled + nahezu transparent (`opacity: 0.15`), sobald eine Zahl vollständig ist
- Korrekte Zellen (vorgegebene, korrekt eingetragene, via Hint befüllte) können nicht überschrieben werden (`setCellValue`-Guard)
- Keyboard-Handler ignoriert completedNumbers beim Zifferndruck
- Erase-Button: `isSelectedCellErasable` steuert disabled-State (kombiniert mit Spec 008)

## Betroffene Dateien

- `src/hooks/useSudokuGame.ts` — `completedNumbers`, `isSelectedCellErasable`, Guard in `setCellValue`
- `src/pages/PlayPage.tsx` — `completedNumbers` und `isSelectedCellErasable` an `NumberPad` weitergegeben
- `src/components/NumberPad.tsx` — `$disabled`-Prop mit `opacity: 0.15` und `pointer-events: none`

## Auswirkungen

- Keine Auswirkung auf Pencil Marks (können weiterhin auf leeren Zellen gesetzt werden)

## Status

Abgeschlossen
