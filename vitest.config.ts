import { defineConfig } from 'vitest/config'

// Dieselben Tests laufen gegen deinen Startpunkt oder gegen die Lösung:
//   npm test                 → exercises/<lektion>/index.ts
//   npm run test:solution    → exercises/<lektion>/solution/index.ts
// (alternativ: TARGET=solution npx vitest run)
// Die Tests importieren '#ex/<lektion>'. Die "imports" in der package.json lösen das über die
// Condition "solution" auf die Lösung auf, sonst auf den Startpunkt.
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
