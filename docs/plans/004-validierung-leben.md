# Plan 004 — Validierung & Leben

Basiert auf: `docs/specs/004-validierung-leben.md`

## Änderungen

### Schritt 1 — Game-Hook erweitern
- Datei: `src/hooks/useSudokuGame.ts`
- Was:
  - Neuer State: `lives: number` (initial 3)
  - Neuer State: `errorCells: Set<string>` (Zellen mit dauerhaft roter Schrift)
  - Neuer State: `flashCells: Set<string>` (temporär rot markierte Zellen, 2s)
  - Neuer State: `gameState: "playing" | "won" | "lost"`
  - `setCellValue` erweitern:
    - Wenn `gameState !== "playing"`: ignorieren
    - Eingabe gegen `solution` prüfen
    - Falsch: `lives -= 1`, Zelle zu `errorCells` hinzufügen, kollidierende Zellen berechnen und zu `flashCells` hinzufügen, 2s Timer zum Entfernen der `flashCells`
    - Wenn `lives === 0`: `gameState = "lost"`
    - Nach Eingabe prüfen: alle Zellen gefüllt und === solution → `gameState = "won"`
  - Hilfsfunktion: `getConflictingCells(row, col, value, puzzle)` — findet Zellen mit gleicher Zahl in gleicher Zeile/Spalte/Box
- Rückgabe erweitern: `lives`, `errorCells`, `flashCells`, `gameState`

### Schritt 2 — Lives-Anzeige Komponente
- Datei: `src/components/Lives.tsx`
- Was: Reihe von 3 Herzen, volle Herzen (rot/❤️) und verlorene Herzen (ausgegraut)
- Props: `lives: number`
- Styling: Styled Components, oben rechts über dem Grid positioniert

### Schritt 3 — SudokuCell erweitern
- Datei: `src/components/SudokuCell.tsx`
- Was:
  - Neue Props: `isError` (dauerhaft rote Schrift), `isFlash` (temporär roter Hintergrund/Border)
  - `isError`: `color: #F44336` (rot) statt grau
  - `isFlash`: roter Border/Hintergrund-Flash (z.B. `rgba(244, 67, 54, 0.3)`)

### Schritt 4 — GameOverlay Komponente
- Datei: `src/components/GameOverlay.tsx`
- Was:
  - Fullscreen-Overlay mit `backdrop-filter: blur(8px)` + `rgba(255,255,255,0.15)`
  - Zentrierter Text (Titel: "You lost" oder "Congratulations, You Win")
  - "Okay" Button, navigiert zu `/` via `useNavigate`
- Props: `type: "won" | "lost"`, `onClose: () => void` oder direkt Navigation

### Schritt 5 — PlayPage zusammenbauen
- Datei: `src/pages/PlayPage.tsx`
- Was:
  - Lives-Komponente über dem Grid einbinden
  - `errorCells` und `flashCells` an SudokuGrid durchreichen
  - GameOverlay rendern wenn `gameState !== "playing"`

### Schritt 6 — SudokuGrid erweitern
- Datei: `src/components/SudokuGrid.tsx`
- Was:
  - Neue Props: `errorCells`, `flashCells`
  - Pro Zelle `isError` und `isFlash` berechnen und an SudokuCell übergeben

## Abhängigkeiten
- Keine neuen Packages

## Risiken
- Timer-Cleanup: `setTimeout` für Flash muss bei Unmount aufgeräumt werden (Cleanup in useEffect)
- Mehrere schnelle Fehleingaben: Flash-Timer müssen sich korrekt akkumulieren, nicht gegenseitig überschreiben
