// Lesson ts-tooling: A project setup that ends style debates
// Duration: about 20 minutes
//
// Exercise
// 1. Modernize tsconfig.exercise.json (here in this folder, an old CommonJS configuration):
//    target es2025, module and moduleResolution nodenext, strict, noUncheckedIndexedAccess,
//    erasableSyntaxOnly, verbatimModuleSyntax and noEmit (Node runs .ts directly).
//    Compare it with the tsconfig.json in the root of this repo – it uses exactly that.
// 2. noUncheckedIndexedAccess turns items[0] into the type OrderItem | undefined.
//    firstItemPrice works around that with !. Remove the ! and handle the empty case.
// 3. Look at the scripts in package.json: typecheck, test, check.
//    A check script that runs the same locally and in CI ends the “works on my machine” debate.
//    You add ESLint and Prettier to your own project as scripts in the same way; this repo
//    leaves them out to get by with four packages.
//
// Check: npm test -- ts-tooling

import type { Order } from '#shop'

export const firstItemPrice = (order: Order): number | undefined => order.items[0]!.priceCents
