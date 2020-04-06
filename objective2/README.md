## How to run the simulation

Simply run `./test.sh`. This will start the loadbalancer and you should see some output in the shell.

I tweaked the original loadbalancer.js to account for the new requirements.

If you'd like to start it manually, now it can be called like this:

    ./loadbalancer.js [number_of_servers] [server_acquisition_time]

Arguments:
- number_of_servers = the number of servers to be spawned (default: 7)
- server_acquisition_time = the time it will take to release a server, in ms (default: random between 1000 and 10000ms)

I needed these to make testing easier and faster. When testing I only spawned 3 servers, with an acquisition time between them of only 200ms.


## A couple of assumptions

- The challenge text says each server is acquired for a random period of time between 1 and 10 seconds, but it doesn't specify if the period is random on every different connection. I assumed it would be OK to set a fixed period (randomly) for all connections once, when starting the load balancer.

- By "least connected server" I assume we mean the first server in the pool with the least concurrent connections at a particular moment in time.
