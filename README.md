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

### Benchmarking

lila is *fast*. Whilst there are several factors to consider when measuring the performance of a load balancer, such as network latency, workload, and what platform it's running on, quick benchmarking showed promising results.

My setup is a MacBook Pro 2.3 GHz Intel Core i7, 16 GB DDR3.

I've used [ApacheBench](https://en.wikipedia.org/wiki/ApacheBench) and [Hey](https://github.com/rakyll/hey), both with a concurrency of 7, running for 5 seconds, with a small payload "Hello" of 5 bytes.

ApacheBench didn't provide consistent results: sometimes it would fail to complete due to an `apr_pollset_poll` error, or cause a few `ECONNRESET` or `EPIPE` socket errors. Also note it doesn't use HTTP's KeepAlive feature by default. However, it still yielded a satisfying result of **1582 requests/sec**:

```
$ ab -c 7 -t 5 -k -s 2 http://localhost:4444/

Concurrency Level:      7
Time taken for tests:   5.000 seconds
Complete requests:      7913
Failed requests:        0
Keep-Alive requests:    0
Total transferred:      633200 bytes
HTML transferred:       39575 bytes
Requests per second:    1582.48 [#/sec] (mean)
Time per request:       4.423 [ms] (mean)
Time per request:       0.632 [ms] (mean, across all concurrent requests)
Transfer rate:          123.66 [Kbytes/sec] received
```

'Hey' provided much better results, yielding **22877 requests/sec** (by reusing TCP connections between different HTTP requests):

```
$ hey -c 7 -z 5s http://localhost:4444/

Summary:
  Total:	5.0003 secs
  Slowest:	0.0067 secs
  Fastest:	0.0001 secs
  Average:	0.0003 secs
  Requests/sec:	22877.0034

  Total data:	571965 bytes
  Size/request:	5 bytes

Status code distribution:
  [200]	114393 responses
```
