# 008 — Pencil Mark Verhalten

## Kontext
Pencil Marks (Hint-Mode) sollen nur auf leeren Zellen funktionieren. Das Löschen-Verhalten (Rücktaste/Erase) wird vereinheitlicht: die Taste reagiert kontextsensitiv auf den Zustand der selektierten Zelle, unabhängig vom Hint-Mode-Toggle.

## Features

- [ ] Pencil Marks können nur auf leeren Zellen (Wert = 0) gesetzt oder getoggelt werden
- [ ] Beim Eintragen einer Zahl werden alle bestehenden Pencil Marks dieser Zelle automatisch gelöscht
- [ ] Rücktaste / Erase-Button verhält sich kontextsensitiv:
  - Zelle hat eine (falsche) Zahl → Zahl wird gelöscht
  - Zelle hat nur Pencil Marks (keine Zahl) → Pencil Marks werden gelöscht
  - Zelle ist leer und hat keine Hints → keine Aktion

## Akzeptanzkriterien

- [ ] `toggleHint(n)` auf einer befüllten Zelle (Wert ≠ 0) hat keinen Effekt
- [ ] Nach Eintragen einer Zahl sind Pencil Marks der Zelle weg
- [ ] Rücktaste auf Zelle mit falschem Wert löscht den Wert (wie bisher, per Spec 007)
- [ ] Rücktaste auf Zelle mit nur Pencil Marks löscht alle Hints — unabhängig vom Hint-Mode-Toggle
- [ ] Rücktaste auf leere Zelle ohne Hints hat keinen Effekt
- [ ] Hint-Mode-Toggle beeinflusst weiterhin ob `toggleHint` oder `setCellValue` bei Zahl-Buttons ausgelöst wird — nur das Löschen wird vereinheitlicht
