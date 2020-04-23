#!/usr/bin/env bash

function ok {
    echo -e ' \033[32m✓\033[0m'
}

function fail {
    echo -e ' \033[31m✗\033[0m'
    exit_status=1
}

function call {
    curl http://127.0.0.1:4444 --silent
}

function connect {
    nc 127.0.0.1 4444 0<&0 1>out &
}

tests/spawnServers.js 3 > /dev/null &

./lila least-connections \
    localhost:8000 \
    localhost:8001 \
    localhost:8002 > /dev/null &

sleep 0.3

echo -n Expecting server a: # 1 0 0
if [ "$(call)" == "Hello from server a" ]; then ok; else fail; fi

connect # 1 0 0
sleep 0.2
echo -n Expecting server b: # 1 1 0
if [ "$(call)" == "Hello from server b" ]; then ok; else fail; fi

connect # 1 1 0
sleep 0.2
echo -n Expecting server c: # 1 1 1
if [ "$(call)" == "Hello from server c" ]; then ok; else fail; fi

connect # 1 1 1
sleep 0.2
echo -n Expecting server a: # 2 1 1
if [ "$(call)" == "Hello from server a" ]; then ok; else fail; fi

sleep 0.2
echo -n Expecting server a: # 2 1 1
if [ "$(call)" == "Hello from server a" ]; then ok; else fail; fi

connect # 2 1 1
connect # 3 1 1
sleep 0.2
echo -n Expecting server b: # 3 2 1
if [ "$(call)" == "Hello from server b" ]; then ok; else fail; fi

connect # 3 2 1
connect # 3 3 1
connect # 3 4 1
sleep 0.2
echo -n Expecting server c: # 3 4 2
if [ "$(call)" == "Hello from server c" ]; then ok; else fail; fi

connect # 3 4 2
connect # 3 4 3
sleep 0.2
echo -n Expecting server a: # 4 4 3
if [ "$(call)" == "Hello from server a" ]; then ok; else fail; fi

kill $(lsof -t -i:4444)

kill $(lsof -t -i:8000) # will kill spawnServers process

exit $exit_status
