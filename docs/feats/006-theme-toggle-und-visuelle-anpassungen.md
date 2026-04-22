# Feature 006 — Theme Toggle & Visuelle Anpassungen

Basiert auf: `docs/specs/006-theme-toggle-und-visuelle-anpassungen.md`
Plan: `docs/plans/006-theme-toggle-und-visuelle-anpassungen.md`

## Was wurde umgesetzt

- Dark Mode (Standard) und Light Mode mit vollständigem Theme-System
- Sonne/Mond-Icon oben links auf Startseite und Spielseite (Outline-Stil, themekonsistent)
- Theme-Persistenz via `localStorage` (`key: sudoku-theme`)
- Manuell eingetragene Zahlen mit Türkis-Akzent (`#4dd0c4` dark / `#00897b` light)
- Pencil-Mark-Hints: Font-Size von `0.45rem` auf `0.58rem` erhöht
- App-Titel überall auf "Simple Sudoku" geändert (inkl. `index.html`)

## Betroffene Dateien

- `src/styled.d.ts` (neu) — DefaultTheme-Interface für styled-components
- `src/styles/theme.ts` (neu) — `darkTheme` und `lightTheme` Token-Objekte
- `src/context/ThemeContext.tsx` (neu) — Context mit `mode` und `toggleTheme()`
- `src/components/ThemeToggle.tsx` (neu) — Sonne/Mond SVG Toggle-Button
- `src/App.tsx` — `ThemeContextProvider` + `ThemeProvider` eingebunden
- `src/styles/GlobalStyle.ts` — Hintergrund aus Theme-Token
- `src/pages/HomePage.tsx` — Theme-Tokens, ThemeToggle, Titel "Simple Sudoku"
- `src/pages/PlayPage.tsx` — Theme-Tokens, ThemeToggle
- `src/components/SudokuCell.tsx` — Theme-Tokens, Türkis-Akzent, Hint-Schriftgröße
- `src/components/SudokuGrid.tsx` — Theme-Tokens
- `src/components/NumberPad.tsx` — Theme-Tokens
- `src/components/Lives.tsx` — Theme-Tokens
- `src/components/GameOverlay.tsx` — Theme-Tokens
- `index.html` — Titel "Simple Sudoku"

## Auswirkungen

- Alle Komponenten nutzen nun `props.theme` statt hartcodierter Farben
- Theme-Toggle ist auf beiden Seiten konsistent oben links positioniert

## Status

Abgeschlossen
