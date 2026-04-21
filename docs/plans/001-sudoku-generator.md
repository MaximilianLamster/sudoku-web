# Plan 001 — Sudoku Generator

Basiert auf: `docs/specs/001-sudoku-generator.md`

## Änderungen

### Schritt 1 — Projekt-Setup mit Vite + React + TypeScript
- Vite-Projekt initialisieren im aktuellen Verzeichnis
- Überflüssige Boilerplate-Dateien aufräumen
- Sicherstellen, dass `npm run dev` funktioniert

### Schritt 2 — Typen und Enum definieren
- Datei: `src/engine/types.ts`
- Was: `Board`-Type, `SudokuBoard`-Interface, `Difficulty`-Enum mit Zellbereichen
- Warum: Zentrale Typdefinitionen, die von Generator und Solver genutzt werden

### Schritt 3 — Solver implementieren (Naked & Hidden Singles)
- Datei: `src/engine/solver.ts`
- Was: `solveBySingles(puzzle: Board): Board | null`
  - Iterativ Naked Singles und Hidden Singles anwenden
  - Gibt gelöstes Board zurück oder `null` wenn nicht lösbar mit diesen Techniken
- Warum: Wird vom Generator benötigt, um zu validieren, dass ein Puzzle nur mit Singles lösbar ist

### Schritt 4 — Board-Generator implementieren
- Datei: `src/engine/generator.ts`
- Was:
  - `generateFullBoard(): Board` — Backtracking mit zufälliger Ziffernreihenfolge
  - `generateSudoku(difficulty: Difficulty): SudokuBoard` — Hauptfunktion
    1. Vollständiges Board erzeugen
    2. Zufällige Zellreihenfolge erstellen
    3. Zellen einzeln entfernen + Solver-Check
    4. Abbruch wenn Zielbereich erreicht oder keine Zellen mehr entfernbar
- Warum: Kernlogik des Features

### Schritt 5 — Minimale UI zum Testen
- Datei: `src/App.tsx`
- Was: Button "Neues Sudoku" mit Difficulty-Auswahl, Board als 9x9 Grid anzeigen (minimales Styling)
- Warum: Visuelle Verifikation, dass der Generator funktioniert

## Abhängigkeiten
- Vite, React, TypeScript (via `create-vite`)
- Keine externen Packages für die Sudoku-Logik

## Risiken
- Generator-Performance: Bei HARD kann die Suche nach entfernbaren Zellen länger dauern. Mitigation: Timeout/Max-Retries einbauen, falls der Generator in eine Sackgasse läuft (neues Board starten).
