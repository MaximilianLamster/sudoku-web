# 002 — Startseite

## Kontext
Die App braucht eine Startseite, auf der der Nutzer den Schwierigkeitsgrad wählt. Per Klick navigiert er zur Puzzle-Seite (Umsetzung der Puzzle-Seite in einer späteren Spec).

## Features
- [ ] Türkis/Grüner Gradient als Fullscreen-Hintergrund
- [ ] Drei Buttons zentriert auf der Seite: Easy (grün), Medium (gelb), Hard (rot)
- [ ] Hover-Effekt: Buttons leuchten/scheinen beim Hovern
- [ ] Klick navigiert zur Puzzle-Seite mit entsprechender Difficulty via React Router
- [ ] Routing-Grundstruktur mit React Router

## Technische Details

### Routing
```
/          → Startseite (Difficulty-Auswahl)
/play/:difficulty  → Puzzle-Seite (Platzhalter, spätere Spec)
```

### Styling
- Styled Components für alle Komponenten
- Gradient: linear-gradient von Türkis zu Grün (fullscreen, `min-height: 100vh`)
- Button-Farben: Easy = grün, Medium = gelb, Hard = rot
- Hover: `box-shadow` Glow-Effekt in der jeweiligen Buttonfarbe

## Akzeptanzkriterien
- [ ] Startseite zeigt drei Buttons zentriert auf Gradient-Hintergrund
- [ ] Jeder Button hat seine korrekte Farbe (grün/gelb/rot)
- [ ] Hover-Effekt erzeugt sichtbaren Glow/Leucht-Effekt
- [ ] Klick auf einen Button navigiert zu `/play/easy`, `/play/medium` bzw. `/play/hard`
- [ ] Browser-Back von der Puzzle-Route führt zurück zur Startseite
- [ ] Puzzle-Route zeigt einen Platzhalter (wird in späterer Spec umgesetzt)

## Offene Fragen
Keine.
