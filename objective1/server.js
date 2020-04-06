const http = require('http');

function makeServer(name, port) {
  http
    .createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`Hello from server ${name}`);
    })
    .listen(port, '127.0.0.1', () => {
      console.log(`‘${name}’ running at http://127.0.0.1:${port}/`);
    })
    .on('connection', (req, clientSocket, head) => {
      console.log(`‘${name}’ TCP stream established`);
    });
}

module.exports = makeServer;
