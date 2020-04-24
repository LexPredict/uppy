#!/bin/sh

CHECKSUM_FILE=".tmp.txt"
PACKAGE_LOCK_FILE="package-lock.json"

if [ ! -f "$CHECKSUM_FILE" ]; then
   echo "0" >> $CHECKSUM_FILE
fi

prev_checksum=`cat $CHECKSUM_FILE`
current_checksum=`md5sum $PACKAGE_LOCK_FILE`

if [ "$prev_checksum" = "$current_checksum" ]; then
    printf "Checksums are equal. \n"
else
    printf "Uppy: checksums are not equal. Installing modules...\n"
    npm install && npm run build:lib
fi
