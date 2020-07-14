FROM node:14

WORKDIR /src/lean-challange
ADD . /src/lean-challange

RUN yarn install
