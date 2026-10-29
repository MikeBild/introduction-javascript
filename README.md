# Übungen: JavaScript & TypeScript

Übungs-Repo zum Workshop **JavaScript & TypeScript** (3 Tage) und zum Workshop **TypeScript in zwei Tagen**.
Zu jeder Lektion gibt es eine kurze Übung (10 bis 25 Minuten) mit Startpunkt, Tests und Lösung.

Mehr zu den Workshops findest du auf [workshops.mikebild.dev](https://workshops.mikebild.dev).

## Das durchgehende Beispiel: der Werkstatt-Shop

Alle Übungen arbeiten mit derselben kleinen Domäne. Sie zieht sich durch alle Workshops – von JavaScript über
Node.js und GraphQL bis React.

- **Product** `{ id, name, priceCents, stock }`
- **Order** `{ id, customerId, items, status, createdAt }` mit Status `draft → placed → paid → shipped`, `cancelled` nur aus `draft` oder `placed`
- **OrderItem** `{ productId, quantity, priceCents }`
- **Customer** `{ id, name, email }`
- Geld immer als ganze Cent, nie als Kommazahl. Gesamtsumme = Σ quantity × priceCents.

Types und Beispieldaten liegen in [`shop/`](shop/). Du importierst sie mit `import { products, type Order } from '#shop'`.
Die IDs sind dort noch einfache Strings – in [`ts-branded-types`](exercises/ts-branded-types/) machst du Branded Types daraus,
in [`ts-runtime-validation`](exercises/ts-runtime-validation/) schreibst du das gemeinsame zod-Schema `PlaceOrderInput`.

## Los geht's

Du brauchst **Node.js 26** oder neuer.

```bash
git clone https://github.com/MikeBild/introduction-javascript.git
cd introduction-javascript
nvm use          # liest .nvmrc, optional
npm ci
```

## So arbeitest du mit einer Übung

1. Öffne `exercises/<lektion>/index.ts`. Oben steht die Aufgabe, darunter der Startpunkt mit `TODO`s.
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
[`package.json`](package.json) zeigen damit auf `index.ts` – mit der Condition `solution` auf `solution/index.ts`.
`npm run typecheck` prüft die Lösungen, `npm run typecheck:start` deinen Startpunkt.

## Übersicht

Die Reihenfolge folgt dem 3-Tage-Workshop; die Übungen werden von oben nach unten schwerer. Die Zusatzkapitel kannst du
nach dem Workshop machen. Die Spalte **TS 2 Tage** markiert die Lektionen des Workshops „TypeScript in zwei Tagen“.

| # | Tag | Lektion | Thema | Ordner | Dauer | TS 2 Tage |
|---|-----|---------|-------|--------|-------|-----------|
| 1 | Tag 1 | `js-values-types` | Wann sind zwei Werte in JavaScript gleich? | [exercises/js-values-types](exercises/js-values-types/) | 15 min | ✓ |
| 2 | Tag 1 | `js-functions-closures` | Was merkt sich eine Closure? | [exercises/js-functions-closures](exercises/js-functions-closures/) | 15 min | ✓ |
| 3 | Tag 1 | `js-objects-arrays` | Neue Werte erzeugen statt alte ändern | [exercises/js-objects-arrays](exercises/js-objects-arrays/) | 20 min | ✓ |
| 4 | Tag 1 | `js-prototypes` | Hinter jeder class steht ein Prototyp | [exercises/js-prototypes](exercises/js-prototypes/) | 20 min |  |
| 5 | Tag 1 | `js-array-methods` | map, filter, reduce statt Loops | [exercises/js-array-methods](exercises/js-array-methods/) | 20 min | ✓ |
| 6 | Tag 1 | `js-modules-esm` | ES Modules statt require und Global Scope | [exercises/js-modules-esm](exercises/js-modules-esm/) | 15 min | ✓ |
| 7 | Tag 1 | `js-async-promises` | Mit async/await warten, ohne zu blockieren | [exercises/js-async-promises](exercises/js-async-promises/) | 20 min | ✓ |
| 8 | Tag 1 | `js-error-handling` | Wann wirfst du, wann lieferst du ein Result? | [exercises/js-error-handling](exercises/js-error-handling/) | 20 min | ✓ |
| 9 | Tag 2 | `ts-basics` | Grenzen annotieren, den Rest inferieren | [exercises/ts-basics](exercises/ts-basics/) | 15 min | ✓ |
| 10 | Tag 2 | `ts-tooling` | Ein Projekt-Setup, das Stilfragen beendet | [exercises/ts-tooling](exercises/ts-tooling/) | 20 min | ✓ |
| 11 | Tag 2 | `ts-objects-unions` | Types beschreiben genau die erlaubten Werte | [exercises/ts-objects-unions](exercises/ts-objects-unions/) | 20 min | ✓ |
| 12 | Tag 2 | `ts-narrowing` | Ungültige States unmöglich machen | [exercises/ts-narrowing](exercises/ts-narrowing/) | 20 min | ✓ |
| 13 | Tag 2 | `ts-generics` | Generics erhalten, was any wegwirft | [exercises/ts-generics](exercises/ts-generics/) | 20 min | ✓ |
| 14 | Tag 2 | `ts-utility-types` | Types ableiten statt kopieren | [exercises/ts-utility-types](exercises/ts-utility-types/) | 20 min | ✓ |
| 15 | Tag 2 | `js-functional-patterns` | Pure Functions im Core, Side Effects am Rand | [exercises/js-functional-patterns](exercises/js-functional-patterns/) | 20 min |  |
| 16 | Tag 3 | `js-testing-vitest` | Mit Vitest Behavior testen statt Details | [exercises/js-testing-vitest](exercises/js-testing-vitest/) | 25 min | Zusatz |
| 17 | Tag 3 | `js-iterators-generators` | Generators liefern Werte erst auf Nachfrage | [exercises/js-iterators-generators](exercises/js-iterators-generators/) | 20 min |  |
| 18 | Tag 3 | `js-async-advanced` | Async-Arbeit abbrechen, begrenzen und streamen | [exercises/js-async-advanced](exercises/js-async-advanced/) | 25 min |  |
| 19 | Tag 3 | `ts-advanced-types` | Types berechnen, wo es Bugs verhindert | [exercises/ts-advanced-types](exercises/ts-advanced-types/) | 25 min | ✓ |
| 20 | Tag 3 | `ts-runtime-validation` | zod prüft, was Types nicht sehen | [exercises/ts-runtime-validation](exercises/ts-runtime-validation/) | 20 min | ✓ |
| 21 | Tag 3 | `ts-branded-types` | Branded Types verhindern vertauschte IDs | [exercises/ts-branded-types](exercises/ts-branded-types/) | 20 min | ✓ |
| 22 | Zusatz | `js-performance-memory` | Erst messen, dann optimieren | [exercises/js-performance-memory](exercises/js-performance-memory/) | 20 min |  |
| 23 | Zusatz | `js-runtimes` | Was läuft in Browser, Node, Deno und Bun? | [exercises/js-runtimes](exercises/js-runtimes/) | 20 min |  |
| 24 | Zusatz | `ts-library-design` | APIs, die falsche Aufrufe unmöglich machen | [exercises/ts-library-design](exercises/ts-library-design/) | 25 min | Zusatz |

Zwei Übungen sind etwas anders aufgebaut:

- **`js-testing-vitest`**: Hier schreibst du die Tests selbst. Der Code unter Test steht fertig in `index.ts`, deine Aufgabe in `index.test.ts`.
- **`ts-tooling`**: Du modernisierst die `tsconfig.exercise.json` im Ordner. Die `tsconfig.json` dieses Repos dient als Vorbild.

## Aufbau

```
shop/                         Types und Beispieldaten des Werkstatt-Shops
exercises/<lektion>/
  index.ts                    Aufgabe und Startpunkt mit TODOs
  index.test.ts               Tests (laufen gegen Start oder Lösung)
  solution/index.ts           Lösung
tsconfig.json                 strikt, ESM (nodenext), erasableSyntaxOnly – prüft die Lösungen
tsconfig.start.json           dasselbe für deinen Startpunkt
vitest.config.ts              schaltet zwischen Start und Lösung um
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
