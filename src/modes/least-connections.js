function acquireLeastConnectedServer() {
    servers.forEach((server, index) => {
      server.getConnections((error, count) => {
        if (error) {
          console.error('lila getConnections error:', error)
        } else {
          serverConnections[index] = count
        }
      })
    })
    serverIndex = serverConnections.indexOf(
      Math.min(...serverConnections)
    )
}

module.exports = acquireLeastConnectedServer
