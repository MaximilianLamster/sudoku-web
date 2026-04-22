# Plan 009 — Highlighting & Zell-Selektion

Basiert auf: `docs/specs/009-highlighting-und-zell-selektion.md`

## Übersicht

Die Highlighting-Logik liegt in `SudokuGrid.tsx` (`isHighlighted`-Funktion). Die Zell-Deselektierung nach korrektem Eintrag liegt in `useSudokuGame.ts`. `SudokuCell.tsx` bekommt ein neues `isSameNumber`-Prop für den schwächeren Glow-Effekt.

---

## Änderungen

### Schritt 1 — Zelle bleibt nach korrektem Eintrag selektiert (`useSudokuGame.ts`)
- Datei: `src/hooks/useSudokuGame.ts` (Funktion `setCellValue`, ca. Zeile 194)
- Was: `setSelectedCell(null)` nach korrektem Eintrag entfernen — Zelle bleibt selektiert
- Warum: Nach Eintrag soll das neue Highlighting sofort für die eingetragene Zahl greifen

### Schritt 2 — Highlighting-Logik in `SudokuGrid.tsx` anpassen
- Datei: `src/components/SudokuGrid.tsx`
- Was:
  - `selectedValue` berechnen: `puzzle[selectedCell.row][selectedCell.col]` (0 wenn keine Selektion)
  - `isHighlighted`-Aufruf: nur wenn `selectedValue === 0` (leere Zelle) → Zeile/Spalte/Haus wie bisher
  - Wenn `selectedValue > 0`: `highlighted = false` für alle Zellen
  - Neues `isSameNumber` berechnen: `selectedValue > 0 && value === selectedValue && !isSelected`
  - `isSameNumber` als Prop an `SudokuCell` weitergeben
- Warum: Trennung der zwei Highlighting-Modi basierend auf dem Wert der selektierten Zelle

### Schritt 3 — `SudokuGrid` Props-Interface und `SudokuCell`-Aufruf erweitern
- Datei: `src/components/SudokuGrid.tsx`
- Was: `isSameNumber={isSameNumber}` zu `<SudokuCell>` hinzufügen
- Warum: Prop-Durchleitung

### Schritt 4 — `isSameNumber`-Styling in `SudokuCell.tsx`
- Datei: `src/components/SudokuCell.tsx`
- Was:
  - `$isSameNumber: boolean` zu `StyledCellProps` und `SudokuCellProps` hinzufügen
  - `box-shadow`: bei `$isSameNumber` schwächerer Glow als bei `$isSelected`
    - Selected: `0 0 6px 1px rgba(255,255,255,0.4)` (dark) / `rgba(0,0,0,0.3)` (light)
    - SameNumber: `0 0 4px 1px rgba(255,255,255,0.2)` (dark) / `rgba(0,0,0,0.15)` (light)
  - `border-color`: bei `$isSameNumber` leicht heller als Standard, schwächer als Selected
  - Prop `isSameNumber` im JSX weiterreichen
- Warum: Visueller "Glow"-Effekt der gleichen Zahlen, klar schwächer als die selektierte Zelle

## Abhängigkeiten

- Keine neuen Packages, keine neuen Dateien
- Abhängig von Plan 006 (Theme-Tokens werden in Schritt 4 für `box-shadow`-Farben verwendet)

## Risiken

- **Win-Check**: Die Win-Prüfung läuft via `setPuzzle` callback — das `setSelectedCell(null)` war nur UX, kein funktionaler Schritt. Entfernen ist sicher.
- **Flash-Zellen und SameNumber**: Eine Flash-Zelle (rot, Konflikt) könnte gleichzeitig `isSameNumber` sein — Flash hat Priorität (wird zuerst geprüft in den CSS-Regeln)
