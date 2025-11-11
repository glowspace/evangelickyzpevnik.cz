# Image
FROM node:24.11-alpine

RUN apk update
# required for yarn install
RUN apk add git python3 py3-pip
RUN apk add make g++

RUN corepack enable
RUN yarn dlx pm2

# Set up work directory
WORKDIR /var/www/html
