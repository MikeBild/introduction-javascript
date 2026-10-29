// Dünner Node-Adapter: übersetzt node:http in Request/Response und zurück.
// Start: node exercises/js-runtimes/serve-node.ts – Node führt TypeScript direkt aus.
// Mit der Lösung: node exercises/js-runtimes/serve-node.ts solution
import { createServer } from 'node:http'
import { handle as startHandle } from './index.ts'
import { handle as solutionHandle } from './solution/index.ts'

const handle = process.argv[2] === 'solution' ? solutionHandle : startHandle
const port = Number(process.env.PORT ?? 3000)

createServer(async (req, res) => {
  const request = new Request(new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`), {
    method: req.method ?? 'GET',
  })
  const response = await handle(request)
  res.writeHead(response.status, Object.fromEntries(response.headers))
  res.end(await response.text())
}).listen(port, () => console.log(`Werkstatt-Shop läuft auf http://localhost:${port}/products`))
