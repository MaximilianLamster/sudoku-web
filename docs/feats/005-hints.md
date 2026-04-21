# Feature 005 — Hints (Notizen)

Basiert auf: `docs/specs/005-hints.md`
Plan: `docs/plans/005-hints.md`

## Was wurde umgesetzt
- Toggle-Button (✏️) in der NumberPad-Leiste zum Wechsel zwischen Lösungs- und Hint-Modus
- Im Hint-Modus: Ziffern 1-9 togglen Hints in aktiver Zelle als 3x3 Mini-Grid
- Kollisionsprüfung: Hints die mit platzierten Zahlen in Zeile/Spalte/Box kollidieren können nicht gesetzt werden
- Backspace/Delete/Radiergummi löscht alle Hints einer Zelle
- Lösungseingabe auf Zelle mit Hints löscht alle Hints
- Korrekte Lösungszahl entfernt gleiche Hints in Zeile/Spalte/Box automatisch
- Vorgegebene Zellen und Zellen mit Wert ignorieren Hint-Eingaben
- Keyboard-Listener routet nach aktivem Modus

## Betroffene Dateien
- `src/hooks/useSudokuGame.ts` — erweitert: hints, isHintMode, toggleHint, clearHints, removeHintsForNumber
- `src/components/SudokuCell.tsx` — erweitert: hints Prop, 3x3 HintGrid Darstellung
- `src/components/NumberPad.tsx` — erweitert: Toggle-Button mit Active-State
- `src/components/SudokuGrid.tsx` — erweitert: hints Map durchreichen
- `src/pages/PlayPage.tsx` — erweitert: Modus-abhängiges Routing der Callbacks

## Auswirkungen
- Engine-Logik unverändert
- Bestehende Features (Validierung, Leben, Highlighting) unverändert

## Status
Abgeschlossen
