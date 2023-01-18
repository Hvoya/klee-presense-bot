require('dotenv').config({ path: '.env' });

const expressLogging = require('express-logging');
const logger = require('logops');

const sequelize = require('./db-connection');

const initControllers = require('./src/controllers');

const start = async () => {
  try {
    const port = process.env.SERVER_PORT;
    const express = require('express');

    const app = express();
    app.use(expressLogging(logger, { policy: 'params' }));
    app.use(express.json());

    await sequelize.sync({ alter: true });

    initControllers(app);

    app.listen(port, () => console.log(`
    Application is under localhost:${port}
  `));
  } catch (e) {
    console.error(e);
  }
};

start();
