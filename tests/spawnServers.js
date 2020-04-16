#!/usr/bin/env node
const spawnServer = require('./spawnServer')

const numberOfServers = parseInt(process.argv[2]) || 7

const serverNames = Array.from({ length: numberOfServers }, (_, index) =>
  String.fromCharCode('a'.charCodeAt(0) + index)
)

const servers = serverNames.map((name, index) =>
  spawnServer(name, 8000 + index)
)
