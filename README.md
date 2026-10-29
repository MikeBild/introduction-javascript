# Übungen: JavaScript & TypeScript

Übungs-Repo zu den Workshops „JavaScript und TypeScript von Grund auf“ und „TypeScript für JavaScript-Teams“;
der Workshop „Fullstack mit TypeScript, Node.js, GraphQL und React in 6 Tagen“ nutzt einen Teil der Lektionen.
Zu jeder Lektion gibt es eine kurze Übung (10 bis 25 Minuten) mit Startpunkt, Tests und Lösung.
Alle Übungen arbeiten mit demselben durchgehenden Beispiel, dem Werkstatt-Shop.

## Was du lernst

- Listen mit map, filter und reduce verarbeiten und Objekte über Kopien ändern
- Generic Functions mit Constraints schreiben, die Type-Informationen erhalten
- Externe Daten mit zod validieren und die Types aus dem Schema ableiten

## Voraussetzungen

- **Node.js 26** – `nvm use` liest die Version aus [`.nvmrc`](.nvmrc).

## Einrichten

```bash
git clone https://github.com/MikeBild/introduction-javascript.git
cd introduction-javascript
nvm use
npm ci
npm run check    # Typecheck und Tests gegen die Lösungen
```

## So arbeitest du mit einer Übung

1. Öffne `exercises/<lektion>/index.ts`. Oben steht die Aufgabe, darunter der Startpunkt mit `TODO`s.
   Ausnahme: `js-error-handling` ist reines JavaScript ohne Typen, dort arbeitest du in `index.js`.
2. Starte die Tests für diese Lektion:
   ```bash
   npm test -- ts-generics            # einmal
   npm run test:watch -- ts-generics  # bei jeder Änderung neu
   ```
   Am Anfang sind die Tests rot. Du bist fertig, wenn sie grün sind.
3. Bei den TypeScript-Übungen prüfen die Tests auch Types (`expectTypeOf`, `@ts-expect-error`). Die prüft nur der Compiler:
   ```bash
   npm run typecheck:start
   ```
   Fehler in den TS-Übungen, die du noch nicht gemacht hast, sind normal.
4. Hängst du fest, schau in `exercises/<lektion>/solution/index.ts`. Dieselben Tests laufen auch gegen die Lösung:
   ```bash
   npm run test:solution -- ts-generics
   ```

Wie die Umschaltung funktioniert: Die Tests importieren `#ex/<lektion>`. Die `imports` in der
[`package.json`](package.json) zeigen damit auf `index.ts` (bei `js-error-handling` auf `index.js`) – mit der Condition `solution` auf die Lösung.

## Übungen

Die Reihenfolge folgt dem Workshop „JavaScript und TypeScript von Grund auf“ (3 Tage); die Übungen werden von oben
nach unten schwerer. Die Spalte **TypeScript** markiert die Lektionen des Workshops „TypeScript für JavaScript-Teams“,
die Spalte **Fullstack** die des Workshops „Fullstack mit TypeScript, Node.js, GraphQL und React in 6 Tagen“.

| # | Tag | Lektion | ID | Dauer | TypeScript | Fullstack |
|---|-----|---------|----|-------|------------|-----------|
| 1 | Tag 1 | Wann sind zwei Werte in JavaScript gleich? | [`js-values-types`](exercises/js-values-types/) | 15 Min | ✓ | ✓ |
| 2 | Tag 1 | Was merkt sich eine Closure? | [`js-functions-closures`](exercises/js-functions-closures/) | 15 Min | ✓ | ✓ |
| 3 | Tag 1 | Neue Werte erzeugen statt alte ändern | [`js-objects-arrays`](exercises/js-objects-arrays/) | 20 Min | ✓ | ✓ |
| 4 | Tag 1 | Hinter jeder class steht ein Prototyp | [`js-prototypes`](exercises/js-prototypes/) | 20 Min |  |  |
| 5 | Tag 1 | map, filter, reduce statt Loops | [`js-array-methods`](exercises/js-array-methods/) | 20 Min | ✓ | ✓ |
| 6 | Tag 1 | ES Modules statt require und Global Scope | [`js-modules-esm`](exercises/js-modules-esm/) | 15 Min | ✓ | ✓ |
| 7 | Tag 1 | Mit async/await warten, ohne zu blockieren | [`js-async-promises`](exercises/js-async-promises/) | 20 Min | ✓ | ✓ |
| 8 | Tag 1 | Wann wirfst du, wann lieferst du ein Result? | [`js-error-handling`](exercises/js-error-handling/) | 20 Min | ✓ |  |
| 9 | Tag 2 | Grenzen annotieren, den Rest inferieren | [`ts-basics`](exercises/ts-basics/) | 15 Min | ✓ | ✓ |
| 10 | Tag 2 | Ein Projekt-Setup, das Stilfragen beendet | [`ts-tooling`](exercises/ts-tooling/) | 20 Min | ✓ |  |
| 11 | Tag 2 | Types beschreiben genau die erlaubten Werte | [`ts-objects-unions`](exercises/ts-objects-unions/) | 20 Min | ✓ | ✓ |
| 12 | Tag 2 | Ungültige States unmöglich machen | [`ts-narrowing`](exercises/ts-narrowing/) | 20 Min | ✓ | ✓ |
| 13 | Tag 2 | Generics erhalten, was any wegwirft | [`ts-generics`](exercises/ts-generics/) | 20 Min | ✓ | ✓ |
| 14 | Tag 2 | Types ableiten statt kopieren | [`ts-utility-types`](exercises/ts-utility-types/) | 20 Min | ✓ |  |
| 15 | Tag 2 | Pure Functions im Core, Side Effects am Rand | [`js-functional-patterns`](exercises/js-functional-patterns/) | 20 Min |  |  |
| 16 | Tag 3 | Mit Vitest Behavior testen statt Details | [`js-testing-vitest`](exercises/js-testing-vitest/) | 25 Min | Zusatzkapitel |  |
| 17 | Tag 3 | Generators liefern Werte erst auf Nachfrage | [`js-iterators-generators`](exercises/js-iterators-generators/) | 20 Min |  |  |
| 18 | Tag 3 | Async-Arbeit abbrechen, begrenzen und streamen | [`js-async-advanced`](exercises/js-async-advanced/) | 25 Min |  |  |
| 19 | Tag 3 | Types berechnen, wo es Bugs verhindert | [`ts-advanced-types`](exercises/ts-advanced-types/) | 25 Min | ✓ |  |
| 20 | Tag 3 | zod prüft, was Types nicht sehen | [`ts-runtime-validation`](exercises/ts-runtime-validation/) | 20 Min | ✓ |  |
| 21 | Tag 3 | Branded Types verhindern vertauschte IDs | [`ts-branded-types`](exercises/ts-branded-types/) | 20 Min | ✓ |  |

Zwei Übungen sind etwas anders aufgebaut:

- **`js-testing-vitest`**: Hier schreibst du die Tests selbst. Der Code unter Test steht fertig in `index.ts`, deine Aufgabe in `index.test.ts`.
- **`ts-tooling`**: Du modernisierst die `tsconfig.exercise.json` im Ordner. Die `tsconfig.json` dieses Repos dient als Vorbild.

### Zusatzkapitel

Die Zusatzkapitel kannst du nach dem Workshop machen.

| # | Lektion | ID | Dauer | TypeScript |
|---|---------|----|-------|------------|
| 22 | Erst messen, dann optimieren | [`js-performance-memory`](exercises/js-performance-memory/) | 20 Min |  |
| 23 | Was läuft in Browser, Node, Deno und Bun? | [`js-runtimes`](exercises/js-runtimes/) | 20 Min |  |
| 24 | APIs, die falsche Aufrufe unmöglich machen | [`ts-library-design`](exercises/ts-library-design/) | 25 Min | Zusatzkapitel |

## Der Werkstatt-Shop

Der Werkstatt-Shop zieht sich durch alle Workshops – von JavaScript über Node.js und GraphQL bis React.

- **Product** `{ id, name, priceCents, stock }`
- **Order** `{ id, customerId, items, status, createdAt }` mit Status `draft → placed → paid → shipped`, `cancelled` nur aus `draft` oder `placed`
- **OrderItem** `{ productId, quantity, priceCents }`
- **Customer** `{ id, name, email }`
- Geld immer als ganze Cent, nie als Kommazahl. Gesamtsumme = Σ quantity × priceCents.

Types und Beispieldaten liegen in [`shop/`](shop/). Du importierst sie mit `import { products, type Order } from '#shop'`.
Die IDs sind dort noch einfache Strings – in [`ts-branded-types`](exercises/ts-branded-types/) machst du Branded Types daraus,
in [`ts-runtime-validation`](exercises/ts-runtime-validation/) schreibst du das gemeinsame zod-Schema `PlaceOrderInput`.

## Aufbau

```
shop/                         Types und Beispieldaten des Werkstatt-Shops
exercises/<lektion>/
  index.ts                    Aufgabe und Startpunkt mit TODOs
  index.test.ts               Tests (laufen gegen Startpunkt oder Lösung)
  solution/index.ts           Lösung
tsconfig.json                 strikt, ESM (nodenext), erasableSyntaxOnly – prüft die Lösungen
tsconfig.start.json           dasselbe für deinen Startpunkt
vitest.config.ts              schaltet zwischen Startpunkt und Lösung um
```

Das Projekt kommt mit vier Paketen aus: `typescript`, `vitest`, `zod` und `@types/node`.
Node 26 führt TypeScript-Dateien direkt aus, z. B. `node exercises/js-runtimes/serve-node.ts`.

## Scripts

| Script | Was es tut |
|--------|------------|
| `npm test [-- <lektion>]` | Tests gegen deinen Startpunkt |
| `npm run test:watch [-- <lektion>]` | dasselbe im Watch Mode |
| `npm run test:solution [-- <lektion>]` | Tests gegen die Lösungen |
| `npm run typecheck:start` | Typecheck deines Startpunkts |
| `npm run typecheck` | Typecheck der Lösungen und Tests |
| `npm run check` | Typecheck und Lösungstests, wie in der CI |

## Workshop und Folien

- Workshop: [„JavaScript und TypeScript von Grund auf“](https://workshops.mikebild.dev/w/javascript-typescript/remote/)
- Workshop: [„TypeScript für JavaScript-Teams“](https://workshops.mikebild.dev/w/typescript/remote/)
- Workshop: [„Fullstack mit TypeScript, Node.js, GraphQL und React in 6 Tagen“](https://workshops.mikebild.dev/w/fullstack/onsite/)
- Folien: [slides.mikebild.dev/introduction-javascript-typescript](https://slides.mikebild.dev/introduction-javascript-typescript.html)
