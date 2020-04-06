#!/usr/bin/env bash

function ok {
    echo -e ' \033[32m✓\033[0m'
}

function fail {
    echo -e ' \033[31m✗\033[0m'
}

function call {
    curl http://127.0.0.1:4444 --silent
}

./loadbalancer.js > /dev/null &

sleep 0.3

for WORD; do
    echo -n Expecting server $WORD:
    if [ "$(call)" == "Hello from server $WORD" ]; then ok; else fail; fi
done

kill $(lsof -t -i:4444 -sTCP:LISTEN)
