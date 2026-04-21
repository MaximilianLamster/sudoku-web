# Plan 005 — Hints (Notizen)

Basiert auf: `docs/specs/005-hints.md`

## Änderungen

### Schritt 1 — Game-Hook erweitern
- Datei: `src/hooks/useSudokuGame.ts`
- Was:
  - Neuer State: `hints: Map<string, Set<number>>` (Key: `"row-col"`)
  - Neuer State: `isHintMode: boolean` (initial false)
  - Neue Methode: `toggleHintMode()` — toggled `isHintMode`
  - Neue Methode: `toggleHint(value: number)` — toggle Hint in aktiver Zelle
    - Ignorieren wenn keine Zelle selektiert, vorgegebene Zelle, oder Zelle hat Wert > 0
    - Wenn Hint vorhanden: entfernen
    - Wenn nicht vorhanden: Kollisionsprüfung (Zahl in Zeile/Spalte/Box als platzierte Zahl), bei Konflikt ignorieren, sonst hinzufügen
  - Neue Methode: `clearHints()` — alle Hints der aktiven Zelle löschen
  - `setCellValue` erweitern:
    - Beim Setzen einer Zahl: Hints der Zelle löschen
    - Bei korrekter Eingabe: `removeHintsForNumber(row, col, value)` aufrufen — entfernt den Hint `value` aus allen Zellen in gleicher Zeile/Spalte/Box
  - Hilfsfunktion: `removeHintsForNumber(row, col, value)` — iteriert über Zeile/Spalte/Box und entfernt `value` aus den Hint-Sets
  - Keyboard-Listener erweitern: wenn `isHintMode`, Ziffern → `toggleHint` statt `setCellValue`, Backspace/Delete → `clearHints` statt `clearCell`
- Return erweitern: `hints`, `isHintMode`, `toggleHintMode`

### Schritt 2 — SudokuCell erweitern
- Datei: `src/components/SudokuCell.tsx`
- Was:
  - Neue Prop: `hints: Set<number> | undefined`
  - Wenn `value === 0` und Hints vorhanden: 3x3 Mini-Grid rendern statt Zahl
  - Mini-Grid: 3 Zeilen × 3 Spalten, Position 1-9 fest zugeordnet
  - Styling: kleine Schrift (~0.45rem), dezente Farbe (z.B. rgba(255,255,255,0.6))
  - Wenn `value > 0`: Hints werden nicht angezeigt (Zahl hat Vorrang)

### Schritt 3 — NumberPad erweitern
- Datei: `src/components/NumberPad.tsx`
- Was:
  - Neuer Toggle-Button (z.B. ✏️ oder "Hints"-Label)
  - Visuell hervorgehoben wenn aktiv (z.B. andere Hintergrundfarbe, Border)
  - Neue Props: `isHintMode: boolean`, `onToggleHintMode: () => void`

### Schritt 4 — SudokuGrid anpassen
- Datei: `src/components/SudokuGrid.tsx`
- Was:
  - Neue Prop: `hints: Map<string, Set<number>>`
  - Pro Zelle: `hints.get("row-col")` an SudokuCell übergeben

### Schritt 5 — PlayPage durchreichen
- Datei: `src/pages/PlayPage.tsx`
- Was: `hints`, `isHintMode`, `toggleHintMode` aus Hook an NumberPad und SudokuGrid durchreichen

## Abhängigkeiten
- Keine neuen Packages

## Risiken
- Hint-Darstellung bei vielen Hints (z.B. 6+) kann in kleinen Zellen eng werden — Schriftgröße muss klein genug sein
- Performance: Hints-Map wird bei jeder korrekten Eingabe durchiteriert — bei 81 Zellen vernachlässigbar
