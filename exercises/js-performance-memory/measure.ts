// Misst den Heap vor und nach 200.000 verschiedenen Aufrufen.
// Startpunkt messen: node --expose-gc exercises/js-performance-memory/measure.ts
// Mit der Lösung vergleichen: node --expose-gc exercises/js-performance-memory/measure.ts solution
import { memoize as startMemoize } from './index.ts'
import { memoize as solutionMemoize } from './solution/index.ts'

const memoize = process.argv[2] === 'solution' ? solutionMemoize : startMemoize
const gc = (globalThis as { gc?: () => void }).gc
const heapMb = () => {
  gc?.()
  return (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)
}

const cartTotal = memoize((cartKey: string) => ({ cartKey, totalCents: cartKey.length * 1299 }), 1000)

console.log(`Heap vorher:  ${heapMb()} MB`)
for (let index = 0; index < 200_000; index++) cartTotal(`cart-${index}`)
console.log(`Heap nachher: ${heapMb()} MB, Cache-Einträge: ${cartTotal.cache.size}`)
if (!gc) console.log('Tipp: Mit --expose-gc misst du nach einer Garbage Collection genauer.')
