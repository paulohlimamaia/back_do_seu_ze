FROM node:alpine

# diretório alvo
RUN mkdir -p /usr/src/node-api
WORKDIR /usr/src/node-api

# instalação de dependências
RUN apk update && apk upgrade
RUN npm i -g @nestjs/cli

# abrindo a porta 3000
EXPOSE 3000