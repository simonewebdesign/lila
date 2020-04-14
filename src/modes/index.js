const rotateIndex = require('./round-robin')
const acquireLeastConnectedServer = require('./least-connections')

function applyMode(mode) {
  switch(mode) {
    case 'least-connections':
      return () => setInterval(acquireLeastConnectedServer, 200)

    case 'round-robin':
    default:
      return rotateIndex
  }
}

module.exports = applyMode
