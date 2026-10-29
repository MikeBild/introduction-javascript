import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'
import { products } from '#shop'
import * as shop from '#ex/js-modules-esm'

const dir = new URL(process.env.TARGET === 'solution' ? './solution/' : './', import.meta.url)

describe('Named Exports', () => {
  it('exportiert genau formatCents, findProduct und listAvailable', () => {
    expect(Object.keys(shop).toSorted()).toEqual(['findProduct', 'formatCents', 'listAvailable'])
  })
  it('die Funktionen arbeiten wie vorher', () => {
    const api = shop as unknown as Record<string, (...args: unknown[]) => unknown>
    expect(api.formatCents?.(1299)).toBe('12,99 €')
    expect(api.findProduct?.(products(), 'p-2')).toMatchObject({ name: 'Schraubendreher-Set' })
    expect(api.listAvailable?.(products())).toEqual([
      'Hammer (12,99 €)',
      'Schraubendreher-Set (24,50 €)',
      'Akkuschrauber (89,99 €)',
    ])
  })
})

describe('Dateistruktur', () => {
  it('money.ts und catalog.ts existieren', () => {
    expect(existsSync(new URL('money.ts', dir))).toBe(true)
    expect(existsSync(new URL('catalog.ts', dir))).toBe(true)
  })
  it('catalog.ts importiert formatCents mit Dateiendung', async () => {
    const source = await readFile(new URL('catalog.ts', dir), 'utf8')
    expect(source).toMatch(/import \{ formatCents \} from '\.\/money\.ts'/)
  })
})
