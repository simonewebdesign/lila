## Prerequisites

Node.js is the only prerequisite. I've used Node.js v13.12.0, but it should work on v0.9.7 and later versions.


## How to run the simulation

Simply run `./test.sh a b c d e f g a`. You should see green ticks (✓) indicating all tests passed. The shell arguments of `test.sh` represent the expected server rotation. For example if you run `./test.sh a b f`, you should see a red cross (✗) at the end, indicating the server didn't return the expected output.

If you'd like to manually test the loadbalancer, you can start it by running `./loadbalancer.js` then request http://127.0.0.1:4444/ using your client of choice.

Please note the Keep-Alive timeout is 5 seconds by default, so if you're using a web browser you might have to wait 5 seconds before refreshing the page or the load balancer may reuse the same socket (it depends on the client, curl won't do it).


## Choices and assumptions I made during development

I made a few assumptions: first of all, I thought it would be preferable to use actual servers. I could have made a simulation with mock servers, for example the load balancer could have been a simple script that, for each call, it would print a different letter on screen. However I thought that would be far too simplistic and so I went for real servers.

Another assumption was that the simulation would only ever run locally, so I didn't account for any other environment than localhost, though ideally both the loadbalancer and the test script could be modified to be run on a CI environment with minimal changes (i.e. by returning proper status codes).

As for testing, I wanted something that would allow me to test the whole functionality end-to-end. In a real world scenario I'd also write unit and integration tests, but for this simulation all I needed was a client that I could use to verify the loadbalancer, regardless of the implementation. Initially I was manually testing with curl, then I went on to automate it, also making it flexible enough to test different scenarios. For simplicity I also made each server return a different response body, i.e. `Hello from server X`. This was to simplify the end-to-end testing.
