import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'
import { orders } from '#shop'
import { firstItemPrice } from '#ex/ts-tooling'

const dir = process.env.TARGET === 'solution' ? 'solution/' : ''
const readConfig = async () => {
  const raw = await readFile(new URL(`./${dir}tsconfig.exercise.json`, import.meta.url), 'utf8')
  return (JSON.parse(raw) as { compilerOptions: Record<string, unknown> }).compilerOptions
}

describe('tsconfig.exercise.json', () => {
  it('nutzt ESM für Node', async () => {
    const options = await readConfig()
    expect(String(options.module).toLowerCase()).toBe('nodenext')
    expect(String(options.moduleResolution).toLowerCase()).toBe('nodenext')
    expect(String(options.target).toLowerCase()).toMatch(/^es20(2[2-9]|[3-9]\d)$|^esnext$/)
  })
  it('ist strikt', async () => {
    const options = await readConfig()
    expect(options).toMatchObject({
      strict: true,
      noUncheckedIndexedAccess: true,
      erasableSyntaxOnly: true,
      verbatimModuleSyntax: true,
      noEmit: true,
    })
    expect(options.noImplicitAny).not.toBe(false)
  })
})

describe('firstItemPrice', () => {
  it('liefert den Preis der ersten Position', () => {
    const [first] = orders()
    expect(firstItemPrice(first!)).toBe(1299)
  })
  it('liefert undefined statt eines TypeError, wenn es keine Position gibt', () => {
    const [first] = orders()
    expect(firstItemPrice({ ...first!, items: [] })).toBeUndefined()
  })
})
