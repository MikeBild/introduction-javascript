// Lektion js-testing-vitest: Mit Vitest Behavior testen statt Details
// Dauer: etwa 25 Minuten
//
// Aufgabe: Schreib die Tests für index.ts. Ersetze jedes it.todo durch einen echten Test.
// - Teste Behavior (Ergebnis, Fehler), nicht wie die Funktion intern arbeitet.
// - Async: await expect(…).resolves / .rejects.toThrow('…') statt done-Callbacks.
// - waitForPayment wartet echte 3 Sekunden. Nutze Fake Timers:
//   vi.useFakeTimers() und await vi.advanceTimersByTimeAsync(3000).
// Eine Lösung steht in solution/index.test.ts.
//
// Prüfen: npm test -- js-testing-vitest

import { describe, expect, it } from 'vitest'
import { orders } from '#shop'
import { orderTotal } from './index.ts'

describe('orderTotal', () => {
  it('summiert quantity × priceCents', () => {
    const [first] = orders()
    expect(orderTotal(first!)).toBe(3397)
  })
  it.todo('liefert 0 für eine Bestellung ohne Positionen')
})

describe('placeOrder', () => {
  it.todo('setzt eine draft-Bestellung auf placed')
  it.todo('lehnt eine Bestellung ohne Positionen ab')
  it.todo('lehnt eine Bestellung ab, wenn der Bestand nicht reicht')
  it.todo('lehnt eine Bestellung ab, die nicht im Status draft ist')
})

describe('waitForPayment', () => {
  it.todo('liefert paid, sobald die Zahlung da ist – ohne echte Wartezeit')
  it.todo('gibt nach drei Versuchen auf')
})
