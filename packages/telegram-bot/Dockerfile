FROM node:lts

RUN npm install -g pm2

WORKDIR /app

COPY . ./

RUN npm install

CMD ["pm2-runtime", "server.js"]