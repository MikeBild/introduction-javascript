// Lektion ts-tooling: Ein Projekt-Setup, das Stilfragen beendet
// Dauer: etwa 20 Minuten
//
// Aufgabe
// 1. Modernisiere tsconfig.exercise.json (hier im Ordner, eine alte CommonJS-Konfiguration):
//    target es2025, module und moduleResolution nodenext, strict, noUncheckedIndexedAccess,
//    erasableSyntaxOnly, verbatimModuleSyntax und noEmit (Node führt .ts direkt aus).
//    Vergleich mit der tsconfig.json im Wurzelverzeichnis dieses Repos – die nutzt genau das.
// 2. noUncheckedIndexedAccess macht aus items[0] den Type OrderItem | undefined.
//    firstItemPrice umgeht das mit !. Entferne das ! und behandle den leeren Fall.
// 3. Schau dir die Scripts in der package.json an: typecheck, test, check.
//    Ein check-Script, das lokal und in CI gleich läuft, beendet die Diskussion "bei mir geht's".
//    ESLint und Prettier ergänzt du in deinem Projekt genauso als Scripts; dieses Repo
//    verzichtet darauf, um mit vier Paketen auszukommen.
//
// Prüfen: npm test -- ts-tooling

import type { Order } from '#shop'

export const firstItemPrice = (order: Order): number | undefined => order.items[0]!.priceCents
