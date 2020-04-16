const numberOfServers = parseInt(process.argv[2]) || 7

const serverNames = Array.from({ length: numberOfServers }, (_, index) =>
  String.fromCharCode('a'.charCodeAt(0) + index)
)

const servers = serverNames.map((name, index) =>
  spawnServer(name, 8000 + index)
)

function spawnServer(name, port) {
  return http
    .createServer((req, res) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end(`Hello from server ${name}`)
    })
    .listen(port, '127.0.0.1', () => {
      console.log(`‘${name}’ running at http://127.0.0.1:${port}/`)
    })
    .on('connection', (req, clientSocket, head) => {
      console.log(`‘${name}’ TCP stream established`)
    })
}

module.exports = spawnServer;
