# Plan 010 — Mobile Responsive Layout

Basiert auf: `docs/specs/010-mobile-responsive.md`

## Übersicht

Breakpoint bei `max-width: 599px`. Mobile-Zielwerte (bei 375px, 16px Padding je Seite → 343px verfügbar):
- Zelle: 35px (Desktop: 56px), Spacer: 5px (8px), Gap: 2px (4px) → Grid: 341px
- Button: 33px (52px), Gap: 4px (8px) → 1–9-Zeile: 329px
- Zell-Font: 1.1rem (1.5rem), Hint-Font: 0.4rem (0.58rem)

---

## Änderungen

### Schritt 1 — `SudokuGrid.tsx` responsive machen
- Datei: `src/components/SudokuGrid.tsx`
- Was:
  - `Grid` styled-component: `@media (max-width: 599px)` mit `grid-template-columns/rows: 35px 35px 35px 5px 35px 35px 35px 5px 35px 35px 35px` und `gap: 2px`
- Warum: Grid-Dimensionen schrumpfen proportional

### Schritt 2 — `SudokuCell.tsx` responsive Font-Größen
- Datei: `src/components/SudokuCell.tsx`
- Was:
  - `Cell`: `@media (max-width: 599px)` mit `width: 35px; height: 35px; font-size: 1.1rem`
  - `HintDigit`: `@media (max-width: 599px)` mit `font-size: 0.4rem`
- Warum: Schrift passt zur kleineren Zellgröße

### Schritt 3 — `NumberPad.tsx` responsive und Wrap
- Datei: `src/components/NumberPad.tsx`
- Was:
  - `PadContainer`: `@media (max-width: 599px)` mit `flex-wrap: wrap; gap: 4px; width: 329px; justify-content: center`
  - `PadButton`: `@media (max-width: 599px)` mit `width: 33px; height: 33px; font-size: 1rem`
  - Die letzten beiden Buttons (Erase, Hint) umbrechen automatisch durch `flex-wrap`; `justify-content: center` zentriert sie
- Warum: 1–9 passt exakt in 329px (9×33 + 8×4), Erase+Hint wrappen zentriert darunter

### Schritt 4 — `PlayPage.tsx` Padding reduzieren
- Datei: `src/pages/PlayPage.tsx`
- Was: `Container`: `@media (max-width: 599px)` mit `padding: 5rem 1rem 1rem`
  - 5rem oben wegen fixierter TopBar, 1rem (16px) seitlich
- Warum: Mehr horizontaler Platz für Grid und NumberPad

---

## Abhängigkeiten

- Keine neuen Packages, keine neuen Dateien

## Risiken

- **Hint-Schrift auf 35px Zellen**: `0.4rem` (6.4px) ist sehr klein — falls unleserlich, auf `0.42rem` anpassen
- **flex-wrap Wrapping**: Nur wenn `PadContainer` auf genau 329px begrenzt ist, wrappen Erase+Hint zuverlässig in die zweite Zeile
