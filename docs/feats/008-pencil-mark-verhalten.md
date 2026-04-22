# Feature 008 — Pencil Mark Verhalten

Basiert auf: `docs/specs/008-pencil-mark-verhalten.md`
Plan: `docs/plans/008-pencil-mark-verhalten.md`

## Was wurde umgesetzt

- Pencil Marks nur auf leeren Zellen setzbar (Guard `puzzle[row][col] > 0` war bereits vorhanden, bestätigt)
- Beim Eintragen einer Zahl werden Hints der Zelle automatisch gelöscht (war bereits vorhanden, bestätigt)
- Neue unified `erase()`-Funktion ersetzt die split `clearCell`/`clearHints`-Logik:
  - Zelle mit falschem Wert → Wert löschen
  - Leere Zelle mit Hints → Hints löschen
  - Sonst → keine Aktion
- Keyboard-Handler (`Backspace`/`Delete`) nutzt `erase()` — kein `isHintMode`-Branch mehr beim Löschen

## Betroffene Dateien

- `src/hooks/useSudokuGame.ts` — `erase()` hinzugefügt, `clearCell`/`clearHints` intern, Keyboard-Handler vereinfacht
- `src/pages/PlayPage.tsx` — `erase` aus Hook, `handleErase` entfällt

## Auswirkungen

- `clearHints` und `clearCell` werden nicht mehr aus dem Hook exportiert

## Status

Abgeschlossen
