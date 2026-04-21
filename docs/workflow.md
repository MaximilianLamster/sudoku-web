# Workflow

Dieses Dokument beschreibt den iterativen Entwicklungsprozess zwischen User und Claude.

## Rollen

- **User**: Gibt Anforderungen vor, trifft finale Entscheidungen.
- **Claude**: Agiert als erfahrener Entwickler. Hinterfragt Unklarheiten, schlägt Alternativen vor, weist auf Risiken hin — bevor implementiert wird.

## Prozess

### 1. Anforderung (User)

User beschreibt eine neue Anforderung in natürlicher Sprache.

### 2. Diskussion

Claude analysiert die Anforderung und stellt Rückfragen zu:
- Unklaren oder mehrdeutigen Punkten
- Fehlenden Edge Cases
- Technischen Trade-offs
- Auswirkungen auf bestehende Features

Erst wenn beide Seiten einverstanden sind, geht es weiter.

### 3. Spec erstellen → `docs/specs/NNN-titel.md`

Claude erstellt eine Spec-Datei mit fortlaufendem Index.

**Minimaler Inhalt:**

```markdown
# NNN — Titel

## Kontext
Warum dieses Feature? (1-2 Sätze)

## Features
- [ ] Feature 1
- [ ] Feature 2

## Akzeptanzkriterien
- [ ] Kriterium 1
- [ ] Kriterium 2

## Offene Fragen
(Falls nach Diskussion noch welche übrig sind)
```

### 4. Plan erstellen → `docs/plans/NNN-titel.md`

Claude erstellt einen umsetzungsbereiten Plan mit gleichem Index.

**Minimaler Inhalt:**

```markdown
# Plan NNN — Titel

Basiert auf: `docs/specs/NNN-titel.md`

## Änderungen

### Schritt 1 — Beschreibung
- Datei: `pfad/zur/datei`
- Was: Konkrete Änderung
- Warum: Begründung

### Schritt 2 — Beschreibung
...

## Abhängigkeiten
- Neue Packages, Config-Änderungen etc.

## Risiken
- Mögliche Seiteneffekte auf bestehende Features
```

### 5. Umsetzung

Claude setzt den Plan Schritt für Schritt um.

### 6. Feature-Dokumentation → `docs/feats/NNN-titel.md`

Nach Umsetzung erstellt Claude eine Feature-Doku.

**Minimaler Inhalt:**

```markdown
# Feature NNN — Titel

Basiert auf: `docs/specs/NNN-titel.md`
Plan: `docs/plans/NNN-titel.md`

## Was wurde umgesetzt
- Punkt 1
- Punkt 2

## Betroffene Dateien
- `pfad/zur/datei` — was wurde geändert

## Auswirkungen
- Auswirkung auf bestehende Features (falls vorhanden)

## Status
Abgeschlossen / Teilweise umgesetzt
```

## Konventionen

- **Indexierung**: Dreistellig, fortlaufend: `001`, `002`, `003`, ...
- **Dateinamen**: `NNN-kebab-case-titel.md`
- **Reihenfolge**: Anforderung → Diskussion → Spec → Plan → Umsetzung → Feat
- **Kein Schritt wird übersprungen.** Auch bei kleinen Änderungen durchlaufen wir mindestens Spec → Plan → Umsetzung → Feat.

## Projektkontext

- Single Page React App (standalone, kein Backend)
- Ziel: Kostenloses Hosting (z.B. GitHub Pages, Vercel, Netlify)
- Tech-Stack wird mit der ersten Anforderung festgelegt
