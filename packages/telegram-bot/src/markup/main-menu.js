const Markup = require('telegraf/markup');
const texts = require('../texts/keyboard');

const mainMenu = Markup.keyboard([
  [texts.tomorrowPresense],
  [texts.submitTomorrowPresense, texts.discardTomorrowPresense]
])
  .resize()
  .extra();

module.exports = {
  mainMenu
};
