const Markup = require('telegraf/markup');
const texts = require('../texts/keyboard');

const feedbackKeyboard = Markup.keyboard([
  [texts.mainMenu]
])
  .oneTime()
  .resize()
  .extra();

module.exports = {
  feedbackKeyboard
};
