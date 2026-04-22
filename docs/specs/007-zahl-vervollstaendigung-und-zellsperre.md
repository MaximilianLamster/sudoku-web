# 007 — Zahl-Vervollständigung & Zellsperre

## Kontext
Wenn alle 9 Instanzen einer Zahl korrekt im Sudoku eingetragen sind, soll der zugehörige Zahl-Button deaktiviert werden. Zusätzlich sollen korrekt befüllte Zellen (vorgegebene und vom User korrekt eingetragene) nicht mehr veränderbar sein. Der Lösch-Button ist nur für falsch eingetragene Zellen aktiv.

## Features

- [ ] Zahl-Button wird disabled und nahezu transparent, sobald alle 9 Instanzen dieser Zahl korrekt platziert sind
- [ ] Korrekt eingetragene Zellen (inkl. vorgegebene Puzzle-Zellen und via Hint befüllte) sind selektierbar aber nicht veränderbar
- [ ] Keyboard-Input und Button-Klick haben auf korrekte Zellen keinen Effekt
- [ ] Lösch-Button ist immer sichtbar, aber nur aktiv (nicht transparent) wenn die selektierte Zelle falsch eingetragen ist
- [ ] Lösch-Button ist disabled (nahezu transparent) bei: keiner Selektion, korrekt befüllter Zelle, vorgegebener Puzzle-Zelle, via Hint befüllter Zelle

## Akzeptanzkriterien

- [ ] Sind alle 9 einer Zahl eingetragen: Zahl-Button ist nicht klickbar, optisch nahezu transparent
- [ ] Wird eine korrekte Zahl wieder gelöscht (nur bei falsch eingetragenen möglich), reaktiviert sich der Button sofort
- [ ] Klick auf korrekte Zelle selektiert sie (Highlighting), ändert aber nichts
- [ ] Tastatureingabe auf selektierter korrekter Zelle wird ignoriert
- [ ] Lösch-Button löscht nur falsch eingetragene Zahlen
- [ ] Lösch-Button bei vorgegebener, korrekter oder Hint-Zelle: sichtbar aber disabled (nahezu transparent)
