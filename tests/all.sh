#!/usr/bin/env bash

set -e

echo Testing round-robin
tests/round-robin.sh a b c d e f g a

echo
sleep 0.5
echo Testing least-connections
tests/least-connections.sh
