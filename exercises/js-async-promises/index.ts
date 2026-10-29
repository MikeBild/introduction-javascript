// Lektion js-async-promises: Mit async/await warten, ohne zu blockieren
// Dauer: etwa 20 Minuten
//
// Aufgabe: Lies Produktdateien (siehe data/) mit node:fs/promises und async/await.
// 1. readProduct(path): Datei lesen, JSON parsen, als Product zurückgeben.
// 2. readAllSequential(paths): eine Datei nach der anderen (for … of mit await).
// 3. readAllParallel(paths, read): alle gleichzeitig starten (Promise.all).
//    Die Reihenfolge des Ergebnisses entspricht der Reihenfolge der paths.
// 4. readAllSettled(paths): kaputte Dateien sollen nicht alles abbrechen.
//    Liefere { products, failed } mit Promise.allSettled.
//
// Prüfen: npm test -- js-async-promises

import { readFileSync } from 'node:fs'
import type { Product } from '#shop'

// TODO: blockiert den Event Loop – auf readFile aus node:fs/promises umstellen
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
