#!/bin/bash

# Instalar Velero com backup para armazenamento local (ou S3)
velero install \
    --provider aws \
    --plugins velero/velero-plugin-for-aws:v1.5.1 \
    --bucket seu-bucket-backup \
    --secret-file ./credentials-velero \
    --backup-location-config region=sa-east-1,s3ForcePathStyle="true",s3Url=https://sua-url-s3.com \
    --use-restic \
    --namespace velero

echo "Velero instalado com sucesso!"
