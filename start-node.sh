#!/usr/bin/env bash

DATADIR="$HOME/.ethdata"
ETHERBASE='0x1f7402f55e142820ea3812106d0657103fc1709e'


# Generate and store a wallet password
if [ ! -f $DATADIR ]; then
    echo "Making data directory '$HOME/.ethdata'..."
    mkdir -p $DATADIR
    cp -R ./keystore $DATADIR
fi

start_poa_network() {
    echo "Starting PoA network"

    # hardcoded address of first account in keystore
    # initialize our private network
    geth \
    --datadir $DATADIR \
    --networkid 454545 \
    --etherbase $ETHERBASE \
    --targetgaslimit '6500000' \
    init ./genesis.json

    geth \
    --rpc \
    --rpcaddr '0.0.0.0' \
    --rpcport 8545 \
    --rpccorsdomain '*' \
    --datadir $DATADIR \
    --networkid 454545 \
    --etherbase $ETHERBASE \
    --targetgaslimit '6500000' \
    js ./run-poa-node.js
}

start_instantseal_network() {
    echo "Starting dev chain"

    # start geth network with dev chain
    geth \
    --rpc \
    --rpcaddr '0.0.0.0' \
    --rpcport 8545 \
    --rpccorsdomain '*' \
    --dev \
    --dev.period 1 \
    --targetgaslimit '6900000' \
    --datadir $DATADIR \
    --etherbase $ETHERBASE \
    --networkid 15 \
    --nodiscover \
    js ./run-dev-node.js
}

if [ $DEV_CHAIN_ENABLED == true ]; then
    start_instantseal_network
else
    start_poa_network
fi
