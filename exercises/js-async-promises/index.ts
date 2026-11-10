// Lesson js-async-promises: Wait with async/await without blocking
// Duration: about 20 minutes
//
// Exercise: Read product files (see data/) with node:fs/promises and async/await.
// 1. readProduct(path): read the file, parse the JSON, return it as a Product.
// 2. readAllSequential(paths): one file after the other (for … of with await).
// 3. readAllParallel(paths, read): start all at once (Promise.all).
//    The order of the result matches the order of the paths.
// 4. readAllSettled(paths): broken files should not abort everything.
//    Return { products, failed } with Promise.allSettled.
//
// Check: npm test -- js-async-promises

import { readFileSync } from 'node:fs'
import type { Product } from '#shop'

// TODO: blocks the event loop – switch to readFile from node:fs/promises
export const readProduct = async (path: string): Promise<Product> => JSON.parse(readFileSync(path, 'utf8')) as Product

export const readAllSequential = async (paths: readonly string[]): Promise<Product[]> => {
  throw new Error('TODO: for … of mit await')
}

export const readAllParallel = async (
  paths: readonly string[],
  read: (path: string) => Promise<Product> = readProduct,
): Promise<Product[]> => {
  throw new Error('TODO: Promise.all')
}

export const readAllSettled = async (paths: readonly string[]): Promise<{ products: Product[]; failed: string[] }> => {
  throw new Error('TODO: Promise.allSettled')
}
