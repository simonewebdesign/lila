# lila

lila is a tiny (1kb) load balancer.

## Installation

Node.js is the only prerequisite. Version v13.12+ is recommended, but it should work on v0.9.7 and later versions.

## Usage

    lila <mode> server1 server2 ... serverX

### Supported modes

- *Round Robin* – Requests are distributed across the group of servers sequentially.
- *Least Connections* – A new request is sent to the server with the fewest current connections to clients.

## How to run the simulation

Simply run `./test.sh a b c d e f g a`. You should see green ticks (✓) indicating all tests passed. The shell arguments of `test.sh` represent the expected server rotation. For example if you run `./test.sh a b f`, you should see a red cross (✗) at the end, indicating the server didn't return the expected output.

If you'd like to manually test the loadbalancer in your local machine, you can start it by running `lila` then request http://127.0.0.1:4444/ using your client of choice.

Please note the Keep-Alive timeout is 5 seconds by default, so if you're using a web browser you might have to wait 5 seconds before refreshing the page or the load balancer may reuse the same socket (it depends on the client, curl won't do it).

---

If you'd like to start `lila` manually, it can be called like this:

    lila [number_of_servers] [server_acquisition_time]

Arguments:
- number_of_servers = the number of servers to be spawned (default: 7)
- server_acquisition_time = the time it will take to release a server, in ms (default: random between 1000 and 10000ms)


## TODO

- [ ] one-liner installation script
- [ ] badges/shields
- [ ] manpage
- [ ] homebrew formula
- [ ] CONTRIBUTING.md

