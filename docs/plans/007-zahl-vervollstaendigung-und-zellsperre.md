# Plan 007 — Zahl-Vervollständigung & Zellsperre

Basiert auf: `docs/specs/007-zahl-vervollstaendigung-und-zellsperre.md`

## Übersicht

Alle Game-Logik liegt in `useSudokuGame.ts`. Die Änderungen betreffen dort die Eingabe-Guards für korrekte Zellen und die Berechnung der vollständigen Zahlen. `NumberPad.tsx` erhält neue Props für disabled-States. `PlayPage.tsx` verdrahtet alles.

---

## Änderungen

### Schritt 1 — `completedNumbers` in `useSudokuGame.ts` berechnen
- Datei: `src/hooks/useSudokuGame.ts`
- Was: Neues `useMemo` das ein `Set<number>` zurückgibt — enthält alle Zahlen 1–9, bei denen genau 9 Zellen im `puzzle` den korrekten Wert aus `solution` haben
  ```ts
  const completedNumbers = useMemo(() => {
    const counts = new Map<number, number>();
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const val = puzzle[r][c];
        if (val !== 0 && val === solution[r][c]) {
          counts.set(val, (counts.get(val) ?? 0) + 1);
        }
      }
    }
    const completed = new Set<number>();
    counts.forEach((count, num) => {
      if (count === 9) completed.add(num);
    });
    return completed;
  }, [puzzle, solution]);
  ```
- `completedNumbers` im Return-Objekt des Hooks exportieren
- Warum: Reaktiver Wert — aktualisiert sich automatisch wenn `puzzle` sich ändert

### Schritt 2 — `setCellValue` gegen korrekte Zellen absichern
- Datei: `src/hooks/useSudokuGame.ts` (Funktion `setCellValue`, ca. Zeile 195)
- Was: Early Return hinzufügen, wenn der aktuelle Zellwert bereits korrekt ist:
  ```ts
  const currentValue = puzzle[row][col];
  if (currentValue !== 0 && currentValue === solution[row][col]) return;
  ```
  — direkt nach dem bestehenden Check auf `isGiven` / `gameState`
- Warum: Korrekte Zellen dürfen nicht überschrieben werden, unabhängig davon ob der Zahl-Button noch aktiv ist

### Schritt 3 — Keyboard-Handler gegen vollständige Zahlen und korrekte Zellen absichern
- Datei: `src/hooks/useSudokuGame.ts` (Keyboard-Handler, ca. Zeile 360)
- Was: Vor `setCellValue(num)` prüfen ob `completedNumbers.has(num)` — falls ja, return
  - Korrekte-Zell-Guard entfällt hier, da `setCellValue` (Schritt 2) das bereits behandelt
- Warum: Keyboard-Input soll genauso reagieren wie UI-Buttons

### Schritt 4 — `clearCell` gegen korrekte und vorgegebene Zellen absichern
- Datei: `src/hooks/useSudokuGame.ts` (Funktion `clearCell`, ca. Zeile 257)
- Was: Bestehender Guard prüft bereits auf `isGiven`. Zusätzlich prüfen ob Zellwert korrekt ist:
  ```ts
  if (puzzle[row][col] === solution[row][col]) return;
  ```
  — nur Zellen in `errorCells` können gelöscht werden
- Warum: Auch korrekt eingetragene User-Zahlen (die nicht in `errorCells` sind) dürfen nicht gelöscht werden

### Schritt 5 — `isSelectedCellErasable` in `useSudokuGame.ts` berechnen
- Datei: `src/hooks/useSudokuGame.ts`
- Was: Neuer berechneter Boolean (als `useMemo` oder inline):
  ```ts
  const isSelectedCellErasable = useMemo(() => {
    if (!selectedCell) return false;
    const { row, col } = selectedCell;
    return errorCells.has(`${row}-${col}`);
  }, [selectedCell, errorCells]);
  ```
- Im Return-Objekt des Hooks exportieren
- Warum: Kapselt die Logik zentral, `NumberPad` braucht keinen Zugriff auf `errorCells` direkt

### Schritt 6 — `PlayPage.tsx` neue Props verdrahten
- Datei: `src/pages/PlayPage.tsx`
- Was:
  - `completedNumbers` und `isSelectedCellErasable` aus `useSudokuGame` destructuren
  - Beides als Props an `<NumberPad>` übergeben
- Warum: Datenfluss von Hook → UI

### Schritt 7 — `NumberPad.tsx` Props erweitern und UI anpassen
- Datei: `src/components/NumberPad.tsx`
- Was:
  - Props erweitern: `completedNumbers: Set<number>`, `isErasable: boolean`
  - Zahl-Buttons (1–9): `disabled={completedNumbers.has(n)}`, bei disabled `opacity: 0.15` und `cursor: default`
  - Erase-Button: `disabled={!isErasable}`, bei disabled `opacity: 0.15` und `cursor: default`
  - Styled-Component `PadButton` bekommt `$disabled?: boolean` prop für Styling (kein natives HTML `disabled` auf `<button>` nötig, oder natives `disabled` mit CSS-Override)
- Warum: Visuelle Rückmeldung für nicht verfügbare Aktionen

---

## Abhängigkeiten

- Keine neuen Packages
- Keine neuen Dateien — alle Änderungen in bestehenden Files

## Risiken

- **`completedNumbers` und Fehler-Zellen**: Eine Zahl die 9× eingetragen ist, aber eine davon falsch, landet nicht in `completedNumbers` — korrekt, da wir nur `puzzle[r][c] === solution[r][c]` zählen
- **Reihenfolge der Guards in `setCellValue`**: Der neue Korrekt-Zell-Guard muss nach dem `isGiven`-Check stehen, damit die Logik sauber bleibt
- **Hint-Mode Interaktion**: `toggleHint` und `clearHints` sind von diesen Guards nicht betroffen — Pencil Marks können weiterhin auf allen nicht-gegebenen Zellen gesetzt werden (auch auf korrekten). Falls das unerwünscht ist, separates Ticket
- **`disabled` auf `<button>`**: Native `disabled` verhindert Click-Events nativ — kein zusätzlicher JS-Guard nötig für Button-Klicks; Keyboard-Handler muss aber separat (Schritt 3) abgesichert werden
