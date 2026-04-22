# 009 — Highlighting & Zell-Selektion

## Kontext
Das Highlighting-Verhalten beim Selektieren von Zellen wird überarbeitet: Zellen mit einer Zahl heben statt Zeile/Spalte/Haus alle gleichen Zahlen im Grid hervor. Zusätzlich bleibt eine Zelle nach dem Eintragen einer Zahl selektiert, sodass das neue Highlighting sofort greift.

## Features

- [ ] **Leere Zelle selektiert**: Zeile, Spalte und Haus werden wie bisher highlighted
- [ ] **Zelle mit Zahl selektiert**: Zeile, Spalte und Haus werden *nicht* highlighted — stattdessen "scheinen" alle anderen Zellen im Grid mit demselben Wert (schwächer als der Border der selektierten Zelle)
- [ ] Nach dem Eintragen einer Zahl bleibt die Zelle selektiert (kein automatisches Deselektieren)

## Akzeptanzkriterien

- [ ] Leere Zelle selektiert → Zeile/Spalte/Haus-Highlighting wie bisher, kein Zahlen-Glow
- [ ] Zelle mit Zahl selektiert → kein Zeile/Spalte/Haus-Highlighting; alle Zellen mit gleichem Wert haben einen Glow-Effekt
- [ ] Glow der gleichen Zahlen ist sichtbar schwächer als der Border-Glow der selektierten Zelle
- [ ] Nach Eintragen einer Zahl: Zelle bleibt selektiert, neues Highlighting greift sofort für die eingetragene Zahl
- [ ] Wird eine Zelle durch Klick auf eine andere Zelle oder Escape deselektiert, entfällt das Highlighting vollständig
- [ ] Fehler-Zellen (rot) behalten ihre Fehler-Darstellung auch wenn sie als "gleiche Zahl" geglowed werden
