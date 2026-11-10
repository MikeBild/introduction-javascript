import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import type { Product } from '#shop'
import { readAllParallel, readAllSequential, readAllSettled, readProduct } from '#ex/js-async-promises'

const file = (name: string) => fileURLToPath(new URL(`./data/${name}.json`, import.meta.url))
const paths = ['p-1', 'p-2', 'p-4'].map(file)

describe('readProduct', () => {
  it('reads and parses a file', async () => {
    await expect(readProduct(file('p-1'))).resolves.toMatchObject({ id: 'p-1', priceCents: 1299 })
  })
  it('returns a Promise that rejects when the file is missing', async () => {
    const pending = readProduct(file('gibt-es-nicht'))
    expect(pending).toBeInstanceOf(Promise)
    await expect(pending).rejects.toThrow()
  })
})

describe('readAllSequential', () => {
  it('reads all files in order', async () => {
    const products = await readAllSequential(paths)
    expect(products.map((product) => product.id)).toEqual(['p-1', 'p-2', 'p-4'])
  })
})

describe('readAllParallel', () => {
  it('starts all reads before the first one finishes', async () => {
    let running = 0
    let maxRunning = 0
    const slowRead = async (path: string): Promise<Product> => {
      running++
      maxRunning = Math.max(maxRunning, running)
      await new Promise((resolve) => setTimeout(resolve, 20))
      running--
      return readProduct(path)
    }
    const products = await readAllParallel(paths, slowRead)
    expect(maxRunning).toBe(3)
    expect(products.map((product) => product.id)).toEqual(['p-1', 'p-2', 'p-4'])
  })
})

describe('readAllSettled', () => {
  it('collects successes and reports broken files', async () => {
    const result = await readAllSettled([file('p-1'), file('broken'), file('p-4')])
    expect(result.products.map((product) => product.id)).toEqual(['p-1', 'p-4'])
    expect(result.failed).toEqual([file('broken')])
  })
})
