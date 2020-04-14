# lila 🌺

[![Build Status](https://travis-ci.org/simonewebdesign/elm-new.svg?branch=master)](https://travis-ci.org/simonewebdesign/elm-new) [![Build Status](https://ci.appveyor.com/api/projects/status/5jqfyredn4l7rxtv?svg=true)](https://ci.appveyor.com/project/simone/elm-new)

lila is a tiny (1kb) load balancer.

## Installation

Node.js is the only prerequisite. Version v13.12+ is recommended, but it should work on v0.9.7 and later versions.

## Usage

    lila <mode> server1 server2 ... serverX

### Supported modes

- *Round Robin* – Requests are distributed across the group of servers sequentially.
- *Least Connections* – A new request is sent to the server with the fewest current connections to clients.

### Notes

lila will respect the Keep-Alive timeout by reusing the same socket, however it also depends on the client you're using.


## TODO

- [ ] one-liner installation script
- [x] badges/shields
- [ ] manpage
- [x] homebrew formula
- [x] CONTRIBUTING.md
