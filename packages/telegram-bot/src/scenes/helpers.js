const { mainMenu } = require('../markup/main-menu');
const texts = require('../texts/keyboard');

const initMainMenuNavigation = (scene) => {
  scene.hears(texts.mainMenu, (ctx) => {
    ctx.scene.leave();
    ctx.reply(texts.whatNext, mainMenu);
  });
};

const goToMainMenu = async (ctx, text) => {
  await ctx.scene.leave();
  await ctx.reply(text, mainMenu);
};

const initButtonUsageRestriction = (scene, keys) => {
  scene.hears(new RegExp(`^(?!${keys.join('|')}|${texts.mainMenu}).*`), (ctx) => {
    ctx.reply('Ничерта не понимаю...');
  });
};

module.exports = {
  initMainMenuNavigation,
  goToMainMenu,
  initButtonUsageRestriction
};
