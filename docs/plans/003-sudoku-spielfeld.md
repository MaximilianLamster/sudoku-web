# Plan 003 — Sudoku Spielfeld

Basiert auf: `docs/specs/003-sudoku-spielfeld.md`

## Änderungen

### Schritt 1 — Game-State Hook
- Datei: `src/hooks/useSudokuGame.ts`
- Was: Custom Hook für den Spielzustand
  - `generateSudoku(difficulty)` beim Mount aufrufen
  - State: `solution`, `initialPuzzle`, `puzzle`, `selectedCell`
  - Methoden: `selectCell(row, col)`, `deselectCell()`, `setCellValue(value)`, `clearCell()`
  - `selectCell` togglet: gleiche Zelle → deselect, andere Zelle → wechsel
  - `setCellValue` / `clearCell` ignorieren vorgegebene Zellen (check gegen `initialPuzzle`)
  - Difficulty wird aus URL-Param gelesen und auf `Difficulty` Enum gemappt

### Schritt 2 — SudokuGrid-Komponente
- Datei: `src/components/SudokuGrid.tsx`
- Was: 9x9 Grid mit Styled Components
  - CSS Grid Layout
  - Gaps: kleiner Gap (2px) zwischen Zellen, größerer Gap (6px) an 3x3-Block-Grenzen
  - Umsetzung der variablen Gaps: `grid-template-columns`/`rows` mit dem Grid, Zellen bekommen extra Margin an Block-Grenzen (Index % 3 === 0)
- Props: `puzzle`, `initialPuzzle`, `selectedCell`, `onCellClick`

### Schritt 3 — SudokuCell-Komponente
- Datei: `src/components/SudokuCell.tsx`
- Was: Einzelne Zelle
  - Weißer Border, border-radius (~4px), halbtransparenter Hintergrund
  - Schriftfarbe: weiß wenn vorgegeben (`initialPuzzle[r][c] !== 0`), hellgrau wenn eingetragen
  - Highlighting-States via Props:
    - `isSelected`: stärkster Glow (box-shadow + hellerer Hintergrund)
    - `isHighlighted`: leichtes halbtransparentes Weiß (Zeile/Spalte/Box)
  - Klick-Handler: ruft `onCellClick(row, col)` auf

### Schritt 4 — NumberPad-Komponente
- Datei: `src/components/NumberPad.tsx`
- Was: Horizontale Leiste mit Buttons 1-9 + Radiergummi
  - Styled Components, passend zum Gesamtdesign
  - Klick auf Zahl → `setCellValue(n)`
  - Klick auf Radiergummi → `clearCell()`
  - Radiergummi-Icon: Unicode-Zeichen oder einfaches "✕"

### Schritt 5 — Keyboard-Eingabe
- Im `useSudokuGame` Hook oder in der PlayPage
- `useEffect` mit `keydown`-Listener
  - Tasten `1`-`9` (KeyCode `Digit1`-`Digit9` + `Numpad1`-`Numpad9`) → `setCellValue`
  - `Backspace` / `Delete` → `clearCell()`
- Listener nur aktiv wenn `selectedCell !== null`

### Schritt 6 — PlayPage zusammenbauen
- Datei: `src/pages/PlayPage.tsx` (überarbeiten)
- Was:
  - Difficulty aus URL-Param lesen und auf Enum mappen
  - `useSudokuGame(difficulty)` aufrufen
  - `SudokuGrid` + `NumberPad` rendern
  - Gleicher Gradient-Hintergrund
  - Grid und NumberPad zentriert

## Abhängigkeiten
- Keine neuen Packages

## Risiken
- Performance: `generateSudoku` kann bei HARD etwas dauern. Falls spürbar, können wir später einen Loading-State einbauen. Für jetzt akzeptabel.
