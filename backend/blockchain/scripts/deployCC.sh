#!/bin/bash

echo "Instalando e instanciando o chaincode..."

peer lifecycle chaincode package auditor.tar.gz --path ./chaincode/auditor-js --lang node --label auditor_1
peer lifecycle chaincode install auditor.tar.gz

export CC_PACKAGE_ID=$(peer lifecycle chaincode queryinstalled | grep auditor_1 | sed -n 's/^Package ID: //;s/, Label:.*$//p')

peer lifecycle chaincode approveformyorg \
    --channelID mychannel \
    --name auditor \
    --version 1.0 \
    --package-id $CC_PACKAGE_ID \
    --sequence 1 \
    --init-required \
    --orderer localhost:7050 \
    --tls --cafile $ORDERER_CA

peer lifecycle chaincode commit \
    --channelID mychannel \
    --name auditor \
    --version 1.0 \
    --sequence 1 \
    --init-required \
    --orderer localhost:7050 \
    --tls --cafile $ORDERER_CA \
    --peerAddresses localhost:7051 \
    --tlsRootCertFiles $PEER0_ORG1_CA

peer chaincode invoke -o localhost:7050 \
    --isInit -C mychannel -n auditor \
    --tls --cafile $ORDERER_CA \
    --peerAddresses localhost:7051 \
    --tlsRootCertFiles $PEER0_ORG1_CA \
    -c '{"Args":["initLedger"]}'
