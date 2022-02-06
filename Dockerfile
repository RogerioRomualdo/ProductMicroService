FROM node:16

WORKDIR /usr/app

COPY package*.json .
RUN npm install

COPY . .

EXPOSE 7088

RUN npm run build
COPY ./src/infra/pb/*.proto ./dist/src/infra/pb

CMD [ "npm", "start" ]