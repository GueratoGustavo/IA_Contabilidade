#!/bin/bash

echo "Criando canal 'mychannel'..."

export FABRIC_CFG_PATH=$PWD/config

peer channel create \
    -o localhost:7050 \
    -c mychannel \
    -f ./config/channel.tx \
    --outputBlock ./config/mychannel.block \
    --tls --cafile $ORDERER_CA

peer channel join -b ./config/mychannel.block
