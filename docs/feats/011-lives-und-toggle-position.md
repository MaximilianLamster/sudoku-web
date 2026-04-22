# Feature 011 — Lives & Toggle Position

Basiert auf: `docs/specs/011-lives-und-toggle-position.md`
Plan: `docs/plans/011-lives-und-toggle-position.md`

## Was wurde umgesetzt

- `Lives` aus der fixen TopBar entfernt
- Neues `LivesRow` (rechtsbündig, volle Breite) direkt über dem Grid in `GameContent`
- TopBar enthält nur noch BackButton (links) und ThemeToggle (rechts)

## Betroffene Dateien

- `src/pages/PlayPage.tsx` — `LivesRow` hinzugefügt, `Lives` in GameContent verschoben

## Status

Abgeschlossen
