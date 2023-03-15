FROM node:16.17.0-alpine3.15

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/api
