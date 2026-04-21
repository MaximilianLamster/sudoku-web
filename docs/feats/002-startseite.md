# Feature 002 — Startseite

Basiert auf: `docs/specs/002-startseite.md`
Plan: `docs/plans/002-startseite.md`

## Was wurde umgesetzt
- React Router mit zwei Routes: `/` (HomePage) und `/play/:difficulty` (PlayPage Platzhalter)
- Startseite mit türkis/grünem Gradient-Hintergrund (135deg, #00bcd4 → #4caf50)
- Drei zentrierte Difficulty-Buttons: Easy (grün), Medium (gelb), Hard (rot)
- Hover-Effekt: Glow via box-shadow + leichtes Scale-Up
- GlobalStyle mit CSS-Reset
- Styled Components als Styling-Lösung

## Betroffene Dateien
- `src/App.tsx` — Routing-Struktur, alte Test-UI entfernt
- `src/pages/HomePage.tsx` — Startseite mit Buttons
- `src/pages/PlayPage.tsx` — Platzhalter für Puzzle-Seite
- `src/styles/GlobalStyle.ts` — CSS-Reset

## Auswirkungen
- Alte Test-UI (inline Grid) wurde entfernt — Engine-Logik bleibt unberührt
- Neue Dependencies: `react-router-dom`, `styled-components`

## Status
Abgeschlossen
