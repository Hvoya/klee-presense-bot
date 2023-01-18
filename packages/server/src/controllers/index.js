const express = require('express');

const initUserController = require('./user');
const initPresenseController = require('./presense');

const tgKeyCheck = require('../middlewares/tg-key-check');

const initControllers = (app) => {
  const tgRouter = express.Router();

  tgRouter.use(tgKeyCheck);

  initUserController(tgRouter);
  initPresenseController(tgRouter);

  app.use('/tg', tgRouter);
};

module.exports = initControllers;
