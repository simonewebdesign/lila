#!/usr/bin/env node

const net = require('net');
const makeServer = require('./server');

const numberOfServers = parseInt(process.argv[2]) || 7;

const serverNames = Array.from({ length: numberOfServers }, (_, index) =>
  String.fromCharCode('a'.charCodeAt(0) + index)
);

const servers = serverNames.map((name, index) =>
  makeServer(name, 8000 + index)
);

let serverIndex = 0;
let serverConnections = new Float32Array(numberOfServers);

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
    });

    setInterval(
      acquireLeastConnectedServer,
      process.argv[3] || randomNumber(1000, 10000)
    );
  })
  .listen(4444, () => {
    console.log('loadbalancer bound on http://127.0.0.1:4444');
  });

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function acquireLeastConnectedServer() {
  servers.forEach((server, index) => {
    server.getConnections((error, count) => {
      if (error) {
        console.error('loadbalancer getConnections error:', error);
      } else {
        serverConnections[index] = count;
      }
    });
  });
  serverIndex = serverConnections.indexOf(
    Math.min(...serverConnections)
  );
}
