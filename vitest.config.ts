import { defineConfig } from 'vitest/config'

// The same tests run against your starting point or against the solution:
//   npm test                 → exercises/<lesson>/index.ts
//   npm run test:solution    → exercises/<lesson>/solution/index.ts
// (alternatively: TARGET=solution npx vitest run)
// The tests import '#ex/<lesson>'. The "imports" in package.json resolve that to the solution
// via the condition "solution", otherwise to the starting point.
export default defineConfig(({ mode }) => {
  const solution = process.env.TARGET === 'solution' || mode === 'solution'
  const conditions = [...(solution ? ['solution'] : []), 'node', 'import', 'default']

  return {
    resolve: { conditions },
    ssr: { resolve: { conditions, externalConditions: conditions } },
    test: {
      env: { TARGET: solution ? 'solution' : 'start' },
      include: solution
        ? ['exercises/*/index.test.ts', 'exercises/*/solution/*.test.ts']
        : ['exercises/*/index.test.ts'],
    },
  }
})
