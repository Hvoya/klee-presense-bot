FROM node:lts

RUN npm install -g pm2

WORKDIR /app

COPY . ./

RUN npm install

RUN npm run build

CMD ["pm2-runtime", "dist/server.js"]