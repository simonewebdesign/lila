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

tests/spawnServers.js > /dev/null &

./lila round-robin \
    127.0.0.1:8000 \
    127.0.0.1:8001 \
    127.0.0.1:8002 \
    127.0.0.1:8003 \
    127.0.0.1:8004 \
    127.0.0.1:8005 \
    127.0.0.1:8006 > /dev/null &

sleep 0.3

for WORD; do
    echo -n Expecting server $WORD:
    if [ "$(call)" == "Hello from server $WORD" ]; then ok; else fail; fi
done

kill $(lsof -t -i:4444)

kill $(lsof -t -i:8000) # will kill spawnServers process

exit $exit_status
