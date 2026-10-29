import { readFile } from 'node:fs/promises'
import type { Product } from '#shop'

export const readProduct = async (path: string): Promise<Product> => JSON.parse(await readFile(path, 'utf8')) as Product

export const readAllSequential = async (paths: readonly string[]): Promise<Product[]> => {
  const products: Product[] = []
  for (const path of paths) {
    products.push(await readProduct(path)) // wartet jedes Mal, bevor die nächste Datei startet
  }
  return products
}

export const readAllParallel = async (
  paths: readonly string[],
  read: (path: string) => Promise<Product> = readProduct,
): Promise<Product[]> => Promise.all(paths.map((path) => read(path)))

export const readAllSettled = async (paths: readonly string[]): Promise<{ products: Product[]; failed: string[] }> => {
  const results = await Promise.allSettled(paths.map((path) => readProduct(path)))
  return {
    products: results.flatMap((result) => (result.status === 'fulfilled' ? [result.value] : [])),
    failed: paths.filter((_, index) => results[index]?.status === 'rejected'),
  }
}
