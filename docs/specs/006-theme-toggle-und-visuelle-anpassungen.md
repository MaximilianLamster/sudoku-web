# 006 — Theme Toggle & Visuelle Anpassungen

## Kontext
Das Spiel soll zwischen Dark Mode (Standard) und Light Mode umschaltbar sein. Zusätzlich werden im Dark Mode Ränder, Linien und Schriften auf Weiß umgestellt, und manuell eingetragene Zahlen erhalten einen dezenten Türkis-Akzent zur Unterscheidung von vorgegebenen Zellen. Der App-Titel wird von "Designer Sudoku" auf "Simple Sudoku" geändert.

## Features

- [ ] Sun/Moon-Icon oben links als Theme-Toggle — auf Startseite und Spielseite, konsistent positioniert (Outline-Stil, keine Füllung, Farbe passt sich dem aktiven Theme an)
- [ ] Dark Mode (Standard): Ränder, Linien und Schrift in Weiß; Hintergrund wie bisher dunkel; Übergänge/Highlights in Weiß
- [ ] Light Mode: Ränder, Linien und Schrift in Schwarz; Hintergrund Weiß; Übergänge/Highlights in Weiß
- [ ] Manuell eingetragene Zahlen (korrekt oder falsch): Weiß (Dark) / Schwarz (Light), jeweils mit minimalem Türkis-Akzent zur Unterscheidung von vorgegebenen Zellen
- [ ] Hint-Zellen: Font-Size leicht größer als reguläre Zellen
- [ ] Gewählter Theme-Mode wird im `localStorage` gespeichert und nach Reload wiederhergestellt
- [ ] App-Titel überall von "Designer Sudoku" auf "Simple Sudoku" geändert (inkl. HTML `<title>`)

## Akzeptanzkriterien

- [ ] Toggle wechselt sichtbar zwischen Dark und Light Mode ohne Reload
- [ ] Toggle ist auf Startseite und Spielseite oben links sichtbar und funktional
- [ ] Vorgegebene Puzzle-Zahlen haben keinen Türkis-Akzent
- [ ] Manuell eingetragene Zahlen (korrekt und falsch) haben in beiden Modes den Türkis-Akzent
- [ ] Hint-Zellen sind optisch durch größere Schrift von regulären Zellen unterscheidbar
- [ ] Theme bleibt nach Seitenreload erhalten
- [ ] Sun-Icon bei Dark Mode, Moon-Icon bei Light Mode (oder umgekehrt, konsistent)
- [ ] Icons sind reine Outlines (keine Füllfläche), Farbe passend zum Theme (weiß im Dark Mode, schwarz im Light Mode)
- [ ] Titel lautet überall "Simple Sudoku"

## Offene Fragen

- Exakter Türkis-Farbwert noch festzulegen (während Umsetzung abzustimmen)
- Wie stark soll die Hint-Schriftgröße von der Standard-Schriftgröße abweichen (z.B. +2px, +10%)?
