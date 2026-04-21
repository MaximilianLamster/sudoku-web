# Feature 003 — Sudoku Spielfeld

Basiert auf: `docs/specs/003-sudoku-spielfeld.md`
Plan: `docs/plans/003-sudoku-spielfeld.md`

## Was wurde umgesetzt
- 9x9 Grid aus weißen, abgerundeten Zellen mit 2px Gap und 4px extra Gap an 3x3-Block-Grenzen
- Vorgegebene Zellen in weiß, eingegebene Zellen in hellgrau
- Zellauswahl per Klick mit Highlighting (Zeile, Spalte, 3x3-Box) und Glow auf aktiver Zelle
- Toggle: erneuter Klick auf aktive Zelle deselektiert
- Eingabe via Tastatur (Digit1-9, Numpad1-9) und UI-Zahlenleiste (1-9 + Radiergummi)
- Backspace/Delete leert editierbare Zellen
- Vorgegebene Zellen sind nicht editierbar
- PlayPage liest Difficulty aus URL, mappt auf Enum, generiert Puzzle

## Betroffene Dateien
- `src/hooks/useSudokuGame.ts` — neu: Game-State Hook
- `src/components/SudokuGrid.tsx` — neu: 9x9 Grid-Komponente
- `src/components/SudokuCell.tsx` — neu: Einzelne Zelle mit Highlighting
- `src/components/NumberPad.tsx` — neu: Zahlenleiste 1-9 + Radiergummi
- `src/pages/PlayPage.tsx` — überarbeitet: Puzzle-Seite mit Grid und NumberPad

## Auswirkungen
- Engine-Logik (types, solver, generator) unverändert
- PlayPage-Platzhalter aus 002 wurde durch vollständige Implementierung ersetzt

## Status
Abgeschlossen
