#!/bin/sh

cd "$(dirname "$0")"

CHECKSUM_FILE=".tmp.txt"
PACKAGE_LOCK_FILE="package-lock.json"

if [ ! -f "$CHECKSUM_FILE" ] || [ ! -d "node_modules" ]; then
   echo "0" > $CHECKSUM_FILE
fi

prev_checksum=`cat $CHECKSUM_FILE | xargs`
current_checksum=`md5sum $PACKAGE_LOCK_FILE | xargs`

if [ "$prev_checksum" = "$current_checksum" ]; then
    printf "Checksums are equal. \n"
else
    printf "Uppy: checksums are not equal. Installing modules...\n"
    npm install && npm run build:lib
    echo $current_checksum > $CHECKSUM_FILE
fi
