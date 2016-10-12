#!/usr/bin/env bash

if [ "$#" != 1 ]; then
  echo "Usage: $0 dev|test"
  exit 1
fi

DB="carpool1_$1"

mysql -uroot -proot -e "DROP DATABASE $DB; CREATE DATABASE $DB;"
