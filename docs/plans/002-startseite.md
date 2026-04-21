# Plan 002 — Startseite

Basiert auf: `docs/specs/002-startseite.md`

## Änderungen

### Schritt 1 — Dependencies installieren
- `react-router-dom` für Routing
- `styled-components` für Styling
- `@types/styled-components` falls nötig (prüfen ob in styled-components v6+ enthalten)

### Schritt 2 — Routing-Grundstruktur
- Datei: `src/App.tsx` (komplett überarbeiten)
- Was: BrowserRouter mit zwei Routes einrichten
  - `/` → `HomePage`
  - `/play/:difficulty` → `PlayPage` (Platzhalter)
- Warum: Navigation zwischen Start- und Puzzle-Seite

### Schritt 3 — GlobalStyle erstellen
- Datei: `src/styles/GlobalStyle.ts`
- Was: CSS-Reset (margin, padding, box-sizing) via `createGlobalStyle`
- Warum: Konsistente Basis, keine Browser-Defaults

### Schritt 4 — HomePage-Komponente
- Datei: `src/pages/HomePage.tsx`
- Was:
  - Fullscreen-Container mit türkis/grünem Gradient
  - Drei Buttons (Easy/Medium/Hard) zentriert via Flexbox
  - Styled Components für Container und Buttons
  - Button-Farben: grün (#4CAF50), gelb (#FFC107), rot (#F44336)
  - Hover: `box-shadow` Glow in jeweiliger Farbe, leichte Transition
  - `useNavigate()` für Navigation zu `/play/{difficulty}`

### Schritt 5 — PlayPage-Platzhalter
- Datei: `src/pages/PlayPage.tsx`
- Was: Minimaler Platzhalter, zeigt gewählte Difficulty an, Link zurück zur Startseite
- Warum: Route muss existieren, Inhalt kommt in späterer Spec

### Schritt 6 — Alte Test-UI entfernen
- Datei: `src/App.css` löschen (falls vorhanden)
- Alle Inline-Styles aus der alten App.tsx entfernen
- Warum: Wird durch Styled Components ersetzt

## Abhängigkeiten
- `react-router-dom` (neu)
- `styled-components` (neu)

## Risiken
- Keine — bestehende Engine-Logik wird nicht verändert
