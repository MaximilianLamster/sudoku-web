# 001 — Sudoku Generator

## Kontext
Wir brauchen eine Kernlogik, die gültige Sudoku-Puzzles erzeugt, die ausschließlich mit Naked Singles und Hidden Singles lösbar sind. Drei Schwierigkeitsgrade steuern die Anzahl fehlender Zellen.

## Features
- [ ] Vollständiges, gültiges 9x9 Sudoku-Board generieren (Lösung)
- [ ] Zellen entfernen, sodass das Puzzle nur mit Naked/Hidden Singles lösbar bleibt
- [ ] Drei Schwierigkeitsgrade via Enum: EASY, MEDIUM, HARD
- [ ] Rückgabe als Datenstruktur mit `solution` (komplett) und `puzzle` (mit Nullen)

## Technische Details

### Datenstruktur
```typescript
type Board = number[][];  // 9x9, Werte 1-9 (Lösung) bzw. 0-8 (Puzzle, 0 = leer)

interface SudokuBoard {
  solution: Board;
  puzzle: Board;
  difficulty: Difficulty;
}
```

### Schwierigkeitsgrade
```typescript
enum Difficulty {
  EASY = "EASY",       // 30–35 fehlende Zellen
  MEDIUM = "MEDIUM",   // 36–45 fehlende Zellen
  HARD = "HARD",       // 46–53 fehlende Zellen
}
```

### Lösungstechniken
- **Naked Single**: Eine Zelle hat nur einen möglichen Kandidaten.
- **Hidden Single**: Ein Kandidat kommt in einer Zeile/Spalte/Box nur in einer Zelle vor.

### Generator-Algorithmus (Übersicht)
1. Erzeuge ein vollständiges gültiges Board (Backtracking mit Zufallsreihenfolge)
2. Erstelle eine zufällige Reihenfolge aller 81 Zellen
3. Entferne Zellen einzeln:
   - Prüfe nach jeder Entfernung, ob das Puzzle noch mit Naked/Hidden Singles allein lösbar ist
   - Falls nicht: Zelle wieder einsetzen
4. Wiederhole bis die Zielanzahl fehlender Zellen erreicht ist oder keine weiteren entfernt werden können

### API
```typescript
function generateSudoku(difficulty: Difficulty): SudokuBoard
```

## Akzeptanzkriterien
- [ ] `generateSudoku` gibt ein valides `SudokuBoard` zurück
- [ ] `solution` ist ein vollständig gefülltes, regelkonformes 9x9 Board
- [ ] `puzzle` enthält exakt so viele Nullen wie der Schwierigkeitsgrad vorgibt (innerhalb des Bereichs)
- [ ] Das Puzzle ist mit ausschließlich Naked/Hidden Singles lösbar
- [ ] Das Puzzle hat genau eine eindeutige Lösung
- [ ] Die Funktion ist als reine Funktion ohne Seiteneffekte implementiert
- [ ] React-App (Vite + TypeScript) ist aufgesetzt und lauffähig

## Offene Fragen
Keine — in Diskussion geklärt.
