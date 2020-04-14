function rotateIndex() {
    if (serverIndex >= numberOfServers - 1) {
      serverIndex = 0
    } else {
      serverIndex++
    }
}

module.exports = rotateIndex
