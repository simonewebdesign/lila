# lila 🌺

[![Build Status](https://api.travis-ci.org/simonewebdesign/lila.svg?branch=master)](https://travis-ci.org/simonewebdesign/lila)

lila is a tiny (1kb) load balancer.

## Installation

Node.js is the only prerequisite. Version v13.12+ is recommended, but it should work on v0.9.7 and later versions.

## Usage

    lila <mode> server1 server2 ... serverX

### Supported modes

- *Round Robin* – Requests are distributed across the group of servers sequentially.
- *Least Connections* – A new request is sent to the server with the fewest current connections to clients.

### Notes

- The mode needs to be passed as a shell argument, e.g. `round-robin` or `least-connections`
- The servers have to be provided in the format `hostname:port`, e.g. `example.com:80`. The protocol shouldn't be specified.
- On a HTTP server, lila will respect the Keep-Alive timeout by reusing the same socket, unless the client ends the connection

#### TODO

- [ ] one-liner installation script
- [x] badges/shields
- [ ] manpage
- [x] homebrew formula
- [x] CONTRIBUTING.md
