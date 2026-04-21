# 005 — Hints (Notizen)

## Kontext
Spieler sollen sich Kandidaten-Zahlen als Hints in leeren Zellen notieren können. Ein Toggle in der Toolbar schaltet zwischen Lösungs- und Hint-Modus um.

## Features
- [ ] Toggle-Button in der NumberPad-Toolbar: Lösungsmodus ↔ Hint-Modus
- [ ] Im Hint-Modus: Tasten/Buttons 1-9 togglen Hints in der aktiven Zelle
- [ ] Hints als 3x3 Mini-Grid in der Zelle dargestellt (klein, Position entspricht Zahl)
- [ ] Backspace/Delete/Radiergummi löscht alle Hints einer Zelle
- [ ] Keine kollidierenden Hints erlaubt (gleiche Zahl in Zeile/Spalte/Box bereits vorhanden)
- [ ] Beim Eintragen einer Lösungszahl: alle Hints in der Zelle werden gelöscht
- [ ] Beim Platzieren einer korrekten Zahl: Hints mit dieser Zahl in gleicher Zeile/Spalte/Box automatisch entfernen
- [ ] Vorgegebene Zellen ignorieren auch Hint-Eingaben

## Technische Details

### Toggle
- Button in der NumberPad-Leiste (z.B. Stift-Icon ✏️ oder "Hints")
- State: `isHintMode: boolean`
- Visuell klar erkennbar welcher Modus aktiv ist (z.B. aktiver Button hervorgehoben)

### Hint-State
- `hints: Map<string, Set<number>>` (Key: `"row-col"`, Value: Set der Hint-Ziffern 1-9)
- Oder alternativ: `number[][][]` — aber Map/Set ist flexibler

### Hint-Darstellung in der Zelle
- 3x3 Mini-Grid innerhalb der Zelle
- Position der Ziffern:
  ```
  1 2 3
  4 5 6
  7 8 9
  ```
- Kleine Schrift, halbtransparent/dezent

### Hint-Validierung
- Beim Setzen eines Hints: Prüfen ob die Zahl bereits in gleicher Zeile/Spalte/Box als platzierte Zahl existiert
- Falls Konflikt: Hint wird nicht gesetzt (ignoriert)

### Auto-Entfernung
- Wenn eine korrekte Lösungszahl in eine Zelle eingetragen wird:
  - Alle Hints dieser Zelle werden gelöscht
  - Alle Hints mit gleicher Zahl in gleicher Zeile/Spalte/Box werden entfernt

### Eingabe-Logik
- Hint-Modus aktiv + Zelle selektiert + Taste/Button 1-9:
  - Hint bereits vorhanden → entfernen (toggle)
  - Hint nicht vorhanden + kein Konflikt → hinzufügen
  - Hint nicht vorhanden + Konflikt → ignorieren
- Hint-Modus aktiv + Backspace/Delete/Radiergummi: alle Hints der Zelle löschen
- Lösungsmodus aktiv + Zelle hat Hints + Zahl eingeben: Hints löschen, Zahl setzen (wie bisher)

## Akzeptanzkriterien
- [ ] Toggle-Button wechselt sichtbar zwischen Hint- und Lösungsmodus
- [ ] Im Hint-Modus werden Ziffern als kleine Notizen im 3x3-Layout angezeigt
- [ ] Erneutes Drücken einer Hint-Ziffer entfernt den Hint (Toggle)
- [ ] Backspace/Delete/Radiergummi löscht alle Hints einer Zelle
- [ ] Hints die mit platzierten Zahlen kollidieren können nicht gesetzt werden
- [ ] Lösungseingabe auf Zelle mit Hints löscht alle Hints
- [ ] Korrekte Lösungszahl entfernt gleiche Hints in Zeile/Spalte/Box automatisch
- [ ] Vorgegebene Zellen ignorieren Hint-Eingaben
- [ ] Hints werden nur in leeren Zellen angezeigt (Zellen mit Wert > 0 zeigen keine Hints)

## Offene Fragen
Keine.
