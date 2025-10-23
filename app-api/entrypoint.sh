#!/usr/bin/env bash

sleep 20

yarn run db:create
yarn run db:migrate
#yarn run db:seed

yarn run start:prod
