#!/usr/bin/env node

const net = require('net');
const makeServer = require('./server');

const numberOfServers = parseInt(process.argv[2]) || 7;
let serverIndex = 0;

const serverNames = Array.from({ length: numberOfServers }, (_, index) =>
  String.fromCharCode('a'.charCodeAt(0) + index)
);

serverNames.forEach((name, index) => {
  makeServer(name, 8000 + index);
});

net
  .createServer((conn) => {
    console.log('client connected');

    conn.on('end', () => {
      console.log('client disconnected');
    });

    conn.on('error', (err) => {
      console.error('loadbalancer error:', err);
    });

    const serverSocket = net.connect(8000 + serverIndex, '127.0.0.1', () => {
      console.log(`relaying to server at ${8000 + serverIndex}`);
      conn.pipe(serverSocket);
      serverSocket.pipe(conn);
      rotateIndex();
    });
  })
  .listen(4444, () => {
    console.log('loadbalancer bound on http://127.0.0.1:4444');
  });

function rotateIndex() {
  if (serverIndex >= numberOfServers - 1) {
    serverIndex = 0;
  } else {
    serverIndex++;
  }
}
