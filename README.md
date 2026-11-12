*English · [Deutsch](README.de.md)*

# Exercises: JavaScript and TypeScript

Exercise repo for the workshops “JavaScript and TypeScript from scratch” and “TypeScript for JavaScript teams”;
the workshop “Full-stack with TypeScript, Node.js, GraphQL, and React in 6 days” uses a part of the lessons.
Every lesson comes with a short exercise (10 to 25 minutes) with a starting point, tests and a solution.
All exercises work with the same running example, the workshop shop.

## What you learn

- Process lists with map, filter and reduce and change objects through copies
- Write Generic Functions with constraints that preserve type information
- Validate external data with zod and derive the types from the schema

## Prerequisites

- **Node.js 26** – `nvm use` reads the version from [`.nvmrc`](.nvmrc).

## Setup

```bash
git clone https://github.com/MikeBild/introduction-javascript.git
cd introduction-javascript
nvm use
npm ci
npm run check    # typecheck and tests against the solutions
```

## How to work on an exercise

1. Open `exercises/<lesson>/index.ts`. The exercise is at the top, the starting point with `TODO`s below.
   Exception: `js-error-handling` is plain JavaScript without types; there you work in `index.js`.
2. Start the tests for this lesson:
   ```bash
   npm test -- ts-generics            # once
   npm run test:watch -- ts-generics  # again on every change
   ```
   At the beginning the tests are red. You are done when they are green.
3. In the TypeScript exercises the tests also check types (`expectTypeOf`, `@ts-expect-error`). Only the compiler checks those:
   ```bash
   npm run typecheck:start
   ```
   Errors in TS exercises you have not done yet are normal.
4. If you get stuck, look at `exercises/<lesson>/solution/index.ts`. The same tests also run against the solution:
   ```bash
   npm run test:solution -- ts-generics
   ```

How the switch works: the tests import `#ex/<lesson>`. The `imports` in
[`package.json`](package.json) point this to `index.ts` (for `js-error-handling` to `index.js`) – with the condition `solution` to the solution.

## Exercises

The order follows the workshop “JavaScript and TypeScript from scratch” (3 days); the exercises get harder from top
to bottom. The column **TypeScript** marks the lessons of the workshop “TypeScript for JavaScript teams”,
the column **Full-stack** those of the workshop “Full-stack with TypeScript, Node.js, GraphQL, and React in 6 days”.

| # | Day | Lesson | ID | Duration | TypeScript | Full-stack |
|---|-----|--------|----|----------|------------|------------|
| 1 | Day 1 | When are two values equal in JavaScript? | [`js-values-types`](exercises/js-values-types/) | 15 min | ✓ | ✓ |
| 2 | Day 1 | What does a closure remember? | [`js-functions-closures`](exercises/js-functions-closures/) | 15 min | ✓ | ✓ |
| 3 | Day 1 | Create new values instead of changing old ones | [`js-objects-arrays`](exercises/js-objects-arrays/) | 20 min | ✓ | ✓ |
| 4 | Day 1 | Behind every class is a prototype | [`js-prototypes`](exercises/js-prototypes/) | 20 min |  |  |
| 5 | Day 1 | map, filter, reduce instead of loops | [`js-array-methods`](exercises/js-array-methods/) | 20 min | ✓ | ✓ |
| 6 | Day 1 | ES modules instead of require and global scope | [`js-modules-esm`](exercises/js-modules-esm/) | 15 min | ✓ | ✓ |
| 7 | Day 1 | Wait with async/await without blocking | [`js-async-promises`](exercises/js-async-promises/) | 20 min | ✓ | ✓ |
| 8 | Day 1 | When do you throw, and when return a result? | [`js-error-handling`](exercises/js-error-handling/) | 20 min | ✓ |  |
| 9 | Day 2 | Annotate boundaries, infer the rest | [`ts-basics`](exercises/ts-basics/) | 15 min | ✓ | ✓ |
| 10 | Day 2 | A project setup that ends style debates | [`ts-tooling`](exercises/ts-tooling/) | 20 min | ✓ |  |
| 11 | Day 2 | Types describe exactly the allowed values | [`ts-objects-unions`](exercises/ts-objects-unions/) | 20 min | ✓ | ✓ |
| 12 | Day 2 | Make invalid states impossible | [`ts-narrowing`](exercises/ts-narrowing/) | 20 min | ✓ | ✓ |
| 13 | Day 2 | Generics preserve what any throws away | [`ts-generics`](exercises/ts-generics/) | 20 min | ✓ | ✓ |
| 14 | Day 2 | Derive types instead of copying | [`ts-utility-types`](exercises/ts-utility-types/) | 20 min | ✓ |  |
| 15 | Day 2 | Pure Functions in the core, side effects at the edge | [`js-functional-patterns`](exercises/js-functional-patterns/) | 20 min |  |  |
| 16 | Day 3 | Test behavior with Vitest, not details | [`js-testing-vitest`](exercises/js-testing-vitest/) | 25 min | extra chapter |  |
| 17 | Day 3 | Generators produce values only on demand | [`js-iterators-generators`](exercises/js-iterators-generators/) | 20 min |  |  |
| 18 | Day 3 | Cancel, limit, and stream async work | [`js-async-advanced`](exercises/js-async-advanced/) | 25 min |  |  |
| 19 | Day 3 | Compute types where they prevent bugs | [`ts-advanced-types`](exercises/ts-advanced-types/) | 25 min | ✓ |  |
| 20 | Day 3 | zod checks what types cannot see | [`ts-runtime-validation`](exercises/ts-runtime-validation/) | 20 min | ✓ |  |
| 21 | Day 3 | Branded types prevent swapped IDs | [`ts-branded-types`](exercises/ts-branded-types/) | 20 min | ✓ |  |

Two exercises are structured a little differently:

- **`js-testing-vitest`**: Here you write the tests yourself. The code under test is complete in `index.ts`, your exercise is in `index.test.ts`.
- **`ts-tooling`**: You modernize the `tsconfig.exercise.json` in the folder. The `tsconfig.json` of this repo serves as the model.

### Extra chapters

You can do the extra chapters after the workshop.

| # | Lesson | ID | Duration | TypeScript |
|---|--------|----|----------|------------|
| 22 | Measure first, then optimize | [`js-performance-memory`](exercises/js-performance-memory/) | 20 min |  |
| 23 | What runs in browsers, Node, Deno, and Bun? | [`js-runtimes`](exercises/js-runtimes/) | 20 min |  |
| 24 | APIs that make wrong calls impossible | [`ts-library-design`](exercises/ts-library-design/) | 25 min | extra chapter |

## The workshop shop

The workshop shop runs through all workshops – from JavaScript through Node.js and GraphQL to React.

- **Product** `{ id, name, priceCents, stock }`
- **Order** `{ id, customerId, items, status, createdAt }` with status `draft → placed → paid → shipped`, `cancelled` only from `draft` or `placed`
- **OrderItem** `{ productId, quantity, priceCents }`
- **Customer** `{ id, name, email }`
- Money always as whole cents, never as a decimal. Total = Σ quantity × priceCents.

Types and sample data live in [`shop/`](shop/). You import them with `import { products, type Order } from '#shop'`.
The IDs there are still plain strings – in [`ts-branded-types`](exercises/ts-branded-types/) you turn them into Branded Types,
in [`ts-runtime-validation`](exercises/ts-runtime-validation/) you write the shared zod schema `PlaceOrderInput`.

## Structure

```
shop/                         types and sample data of the workshop shop
exercises/<lesson>/
  index.ts                    exercise and starting point with TODOs
  index.test.ts               tests (run against the starting point or the solution)
  solution/index.ts           solution
tsconfig.json                 strict, ESM (nodenext), erasableSyntaxOnly – checks the solutions
tsconfig.start.json           the same for your starting point
vitest.config.ts              switches between starting point and solution
```

The project gets by with four packages: `typescript`, `vitest`, `zod` and `@types/node`.
Node 26 runs TypeScript files directly, e.g. `node exercises/js-runtimes/serve-node.ts`.

## Scripts

| Script | What it does |
|--------|--------------|
| `npm test [-- <lesson>]` | tests against your starting point |
| `npm run test:watch [-- <lesson>]` | the same in watch mode |
| `npm run test:solution [-- <lesson>]` | tests against the solutions |
| `npm run typecheck:start` | typecheck of your starting point |
| `npm run typecheck` | typecheck of the solutions and tests |
| `npm run check` | typecheck and solution tests, as in CI |

## Workshop and slides

- Workshop (held in German): [“Full-stack with TypeScript, Node.js, GraphQL, and React in 6 days”](https://workshops.mikebild.dev/w/fullstack/onsite/)
- Workshop (held in German): [“JavaScript and TypeScript from scratch”](https://workshops.mikebild.dev/w/javascript-typescript/remote/)
- Workshop (held in German): [“TypeScript for JavaScript teams”](https://workshops.mikebild.dev/w/typescript/remote/)
- Slides: [slides.mikebild.dev/introduction-javascript-typescript.en](https://slides.mikebild.dev/introduction-javascript-typescript.en.html)
- PDF: [introduction-javascript-typescript.en.pdf](https://objects.upraft.mikebild.info/site-media/mikebild/decks/introduction-javascript-typescript/introduction-javascript-typescript.en.pdf)
- Video: [introduction-javascript-typescript.en.mp4](https://objects.upraft.mikebild.info/site-media/mikebild/decks/introduction-javascript-typescript/introduction-javascript-typescript.en.mp4)

## License

[MIT](LICENSE)
