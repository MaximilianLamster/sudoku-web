# Plan 006 — Theme Toggle & Visuelle Anpassungen

Basiert auf: `docs/specs/006-theme-toggle-und-visuelle-anpassungen.md`

## Übersicht

Styled-Components wird bereits verwendet. Wir erweitern es um ein `ThemeProvider`-basiertes Light/Dark-System. Der Toggle-Button (Sonne/Mond) wird oben links auf beiden Seiten (Startseite und Spielseite) platziert. Das Theme wird in `localStorage` persistiert. Der App-Titel wird auf "Simple Sudoku" geändert.

---

## Änderungen

### Schritt 1 — ThemeContext erstellen
- Datei: `src/context/ThemeContext.tsx` (neu)
- Was: React Context mit `theme: 'dark' | 'light'` und `toggleTheme()`
- Liest beim Init aus `localStorage` (`key: 'sudoku-theme'`), Default: `'dark'`
- Schreibt bei jedem Toggle in `localStorage`
- Warum: Zentraler State für das Theme, zugänglich von allen Komponenten

### Schritt 2 — App.tsx mit ThemeContext und styled-components ThemeProvider wrappen
- Datei: `src/App.tsx`
- Was: `ThemeContext.Provider` und `ThemeProvider` aus styled-components um den App-Tree legen; Theme-Objekt (dark/light Tokens) an `ThemeProvider` übergeben
- Warum: Styled-Components greift per `props.theme` auf Token zu — kein Prop-Drilling nötig

### Schritt 3 — Theme-Tokens definieren
- Datei: `src/styles/theme.ts` (neu)
- Was: Zwei Objekte `darkTheme` und `lightTheme` mit gemeinsamen Token-Namen:
  ```
  background, backgroundGradient,
  borderColor, lineColor,
  textGiven, textUserEntered, textUserEnteredAccent (Türkis),
  textError,
  cellHighlight, cellFlash, cellSelected,
  buttonBg, buttonBorder, buttonText
  ```
  - Dark: Werte wie bisher (weiße Linien, dunkler Hintergrund, Türkis-Akzent z.B. `#4dd0c4`)
  - Light: Schwarze Linien/Text, weißer Hintergrund, selber Türkis-Akzent
- Warum: Einmalige Änderung am Theme-Objekt steuert alles

### Schritt 4 — GlobalStyle.ts auf Theme-Tokens umstellen
- Datei: `src/styles/GlobalStyle.ts`
- Was: `background` und `color` aus `props.theme` statt hartcodierten Werten
- Warum: Hintergrund wechselt beim Theme-Toggle

### Schritt 5 — Sun/Moon Toggle-Button als gemeinsame Komponente
- Datei: `src/components/ThemeToggle.tsx` (neu)
- Was:
  - Shared Komponente die `useTheme()` aus `ThemeContext` konsumiert
  - Styled Button `ThemeToggleButton`, oben links positioniert
  - SVG-Icons: Sonne (Dark Mode aktiv) und Mond (Light Mode aktiv), Outline-Stil, Farbe aus Theme-Token
  - Bei Click: `toggleTheme()` aufrufen
- Datei: `src/pages/PlayPage.tsx` — `<ThemeToggle />` oben links einbinden
- Datei: `src/pages/HomePage.tsx` — `<ThemeToggle />` oben links einbinden
- Warum: Eine Komponente, zwei Seiten — konsistente Position und Verhalten

### Schritt 6 — SudokuCell.tsx auf Theme-Tokens umstellen
- Datei: `src/components/SudokuCell.tsx`
- Was:
  - Alle hardcodierten Farben (`rgba(255,255,255,...)`, `#e57373` etc.) durch Theme-Token ersetzen
  - User-eingetragene Zellen (nicht `isGiven`, nicht `isError`): Türkis-Akzent-Farbe (`theme.textUserEnteredAccent`) statt reinem Weiß
  - Hint-Grid (Pencil Marks): Font-Size von `0.45rem` auf `0.58rem` erhöhen
- Warum: Theme-Responsivität; Türkis-Akzent unterscheidet vorgegebene von eingetragenen Zahlen

### Schritt 7 — SudokuGrid.tsx auf Theme-Tokens umstellen
- Datei: `src/components/SudokuGrid.tsx`
- Was: Spacer-Linien (die 8px-Tracks zwischen 3x3-Boxen) und Grid-Border nutzen `theme.lineColor`
- Warum: Linienfarbe wechselt mit Theme

### Schritt 8 — NumberPad.tsx auf Theme-Tokens umstellen
- Datei: `src/components/NumberPad.tsx`
- Was: Button-Border, Text und Hover-Hintergrund aus Theme-Tokens
- Warum: Konsistenz im Light Mode

### Schritt 9 — HomePage.tsx auf Theme-Tokens umstellen + Titel ändern
- Datei: `src/pages/HomePage.tsx`
- Was:
  - Hardcodierte Farben (#0d3d3d, #082020 etc.) durch Theme-Tokens ersetzen
  - `<ThemeToggle />` oben links einbinden
  - Titel-Text von "Designer Sudoku" auf "Simple Sudoku" ändern
- Warum: Auch die Startseite muss im Light Mode korrekt aussehen; Toggle muss auf beiden Seiten verfügbar sein

### Schritt 10 — HTML-Titel und App-weite Titelreferenzen ändern
- Datei: `index.html`
- Was: `<title>Designer Sudoku</title>` → `<title>Simple Sudoku</title>`
- Datei: alle weiteren Stellen wo "Designer Sudoku" vorkommt (per Grep prüfen)
- Warum: Konsistenter Titel im Browser-Tab und in der App

---

## Abhängigkeiten

- Keine neuen npm-Packages (styled-components `ThemeProvider` ist bereits enthalten)
- Neues File: `src/context/ThemeContext.tsx`
- Neues File: `src/styles/theme.ts`
- Neues File: `src/components/ThemeToggle.tsx`

## Risiken

- **Prop-Drilling vermeiden**: Alle Komponenten unter `ThemeProvider` können `props.theme` nutzen — kein manuelles Weiterreichen nötig
- **Türkis-Akzent auf Fehler-Zellen**: Error-Zellen bleiben rot; Türkis-Akzent gilt nur für korrekt/leer eingetragene User-Zellen
- **Hint-Schriftgröße**: Nur die Pencil-Mark-Hints (3x3-Grid in der Zelle) werden größer — nicht die normalen Zellzahlen
- **localStorage-Key Kollision**: Key `'sudoku-theme'` prüfen ob er anderswo bereits genutzt wird
