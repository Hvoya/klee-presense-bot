const Stage = require('telegraf/stage');
const { presenseScene } = require('./presense/presense-scene');

const registerScenes = (bot) => {
  const stage = new Stage();

  stage.register(presenseScene);

  bot.use(stage.middleware());
};

module.exports = {
  registerScenes
};
