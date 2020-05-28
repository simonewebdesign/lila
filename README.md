# lila 🌺

[![Build Status](https://api.travis-ci.org/simonewebdesign/lila.svg?branch=master)](https://travis-ci.org/simonewebdesign/lila)

lila is a tiny (1kb) load balancer, fully end-to-end tested.

## Installation

Node.js is the only prerequisite. Version v13.12+ is recommended, but it should work on v0.9.7 and later versions.

### npm

    npm install -g lila-lb

### yarn

    yarn global add lila-lb

### Homebrew

    brew install simonewebdesign/tap/lila

### Manual installation (Windows, Linux, macOS)

Run this command on a Bash shell to download the latest lila on the current directory and make it executable:

    curl https://raw.githubusercontent.com/simonewebdesign/lila/master/lila > lila && chmod +x lila

Optional: if you want to use lila without knowing its location, make sure to add the folder where you've downloaded it on the `$PATH` environment variable.

## Usage

    lila <mode> server1 server2 ... serverX

Example:

    lila round-robin localhost:1337 example.com:80 127.0.0.1:7777

### Supported modes

- *Round Robin* – Requests are distributed across the group of servers sequentially.
- *Least Connections* – A new request is sent to the server with the fewest current connections to clients.

### Caveats

- The mode needs to be passed as a shell argument, e.g. `round-robin` or `least-connections`.
- The servers have to be provided in the format `hostname:port`, e.g. `example.com:80`. The protocol shouldn't be specified.
- On a HTTP server, lila will respect the Keep-Alive timeout by reusing the same socket, unless the client ends the connection.
