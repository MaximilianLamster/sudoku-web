# Plan 011 — Lives & Toggle Position

Basiert auf: `docs/specs/011-lives-und-toggle-position.md`

## Änderungen

### Schritt 1 — TopBar bereinigen (`PlayPage.tsx`)
- `Lives` aus der `TopBar` entfernen
- TopBar enthält nur noch `BackButton` (links) und `ThemeToggle` (rechts)

### Schritt 2 — Lives über Grid platzieren (`PlayPage.tsx`)
- Neues `LivesRow` styled-component: `display: flex; justify-content: flex-end; width: 100%`
- `<LivesRow><Lives lives={lives} /></LivesRow>` direkt vor `<SudokuGrid>` in `GameContent`

## Abhängigkeiten
- Keine neuen Packages oder Dateien
