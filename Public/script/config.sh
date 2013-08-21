#!/bin/bash

set -x

host=$(hostname | head -1)
port=8028

domain="http://"$host":"$port
