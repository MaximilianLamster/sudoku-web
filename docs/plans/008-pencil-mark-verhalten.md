# Plan 008 — Pencil Mark Verhalten

Basiert auf: `docs/specs/008-pencil-mark-verhalten.md`

## Übersicht

`toggleHint` und `setCellValue` erfüllen bereits Teile der Spec (`puzzle[row][col] > 0`-Guard und Hint-Löschung beim Eintragen). Die einzige echte Änderung ist die Vereinheitlichung des Erase-Verhaltens in einer neuen `erase()`-Funktion im Hook.

---

## Änderungen

### Schritt 1 — Unified `erase()` in `useSudokuGame.ts`
- Datei: `src/hooks/useSudokuGame.ts`
- Was: Neue `erase()`-Funktion ersetzt die separate `clearCell`/`clearHints`-Logik:
  - Wenn `errorCells.has(cellKey)`: Wert löschen (bisherige `clearCell`-Logik)
  - Sonst wenn `puzzle[row][col] === 0 && hints.has(cellKey)`: Hints löschen
  - Sonst: keine Aktion
  - `erase()` wird im Return-Objekt exportiert
- Warum: Kontextsensitives Löschen ohne abhängig vom Hint-Mode-Toggle zu sein

### Schritt 2 — Keyboard-Handler auf `erase()` umstellen
- Datei: `src/hooks/useSudokuGame.ts` (keyboard handler, ca. Zeile 373)
- Was: `Backspace`/`Delete` ruft immer `erase()` auf — kein `isHintMode`-Branch mehr beim Löschen
- Warum: Tastatur-Verhalten konsistent mit Button-Verhalten

### Schritt 3 — `PlayPage.tsx` auf `erase()` umstellen
- Datei: `src/pages/PlayPage.tsx`
- Was:
  - `erase` aus Hook destructuren
  - `handleErase` vereinfacht: ruft direkt `erase()` auf, kein `isHintMode`-Branch
  - `clearHints` nicht mehr aus Hook importieren (wird intern)
- Warum: Vereinfachte Logik in der Page-Komponente

## Abhängigkeiten

- Keine neuen Packages, keine neuen Dateien

## Risiken

- `clearCell` und `clearHints` bleiben intern im Hook — falls andere Stellen sie direkt nutzen, müssen diese auf `erase()` umgestellt werden
- `toggleHint` hat bereits `if (puzzle[row][col] > 0) return;` — kein Risiko für bereits befüllte Zellen
- `setCellValue` löscht bereits die Hints der Zelle — kein Risiko
