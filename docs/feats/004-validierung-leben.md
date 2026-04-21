# Feature 004 — Validierung & Leben

Basiert auf: `docs/specs/004-validierung-leben.md`
Plan: `docs/plans/004-validierung-leben.md`

## Was wurde umgesetzt
- 3 Herzen als Leben oben rechts über dem Grid (verlorene Herzen ausgegraut)
- Validierung jeder Eingabe gegen die Lösung
- Falsche Eingabe: Leben -1, Schrift der Zelle dauerhaft rot
- Kollidierende Zellen (gleiche Zahl in Zeile/Spalte/Box) blitzen 2s rot auf (individueller Timer pro Zelle)
- clearCell entfernt rote Markierung
- Game Over Overlay ("You lost") bei 0 Leben mit Blur-Effekt
- Win Overlay ("Congratulations, You Win") bei vollständiger korrekter Lösung
- Okay-Button in beiden Overlays navigiert zurück zu `/`
- Keine Eingabe möglich nach Game Over/Win

## Betroffene Dateien
- `src/hooks/useSudokuGame.ts` — erweitert: lives, errorCells, flashCells, gameState, Validierung
- `src/components/SudokuCell.tsx` — erweitert: isError (rote Schrift), isFlash (roter Hintergrund)
- `src/components/SudokuGrid.tsx` — erweitert: errorCells/flashCells Props
- `src/components/Lives.tsx` — neu: Herzen-Anzeige
- `src/components/GameOverlay.tsx` — neu: Win/Loss Overlay
- `src/pages/PlayPage.tsx` — erweitert: Lives + GameOverlay eingebunden

## Auswirkungen
- Engine-Logik unverändert
- Spielfeld (003) erweitert um Validierung und Feedback

## Status
Abgeschlossen
