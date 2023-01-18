const Markup = require('telegraf/markup');
const { Reaction } = require('../texts/reaction');
const texts = require('../texts/keyboard');
const { v4: uuidv4 } = require('uuid');

const ratingKeyboard = Markup.keyboard([
  [texts.mainMenu]
])
  .resize()
  .extra();

function generateActionWithUUID (name) {
  return `${name}_${uuidv4()}`;
}

const getRatingInlineKeyboard = (shoeId) => {
  return Markup.inlineKeyboard([
    [
      Markup.callbackButton(Reaction.DISLIKE, generateActionWithUUID(`${shoeId}_${Reaction.DISLIKE}`)),
      Markup.callbackButton(Reaction.NORM, generateActionWithUUID(`${shoeId}_${Reaction.NORM}`)),
      Markup.callbackButton(Reaction.LIKE, generateActionWithUUID(`${shoeId}_${Reaction.LIKE}`))
    ]
  ]).resize()
    .extra();
};

const getAfterRatingInlineKeyboard = () => {
  return Markup.inlineKeyboard([
    [
      Markup.callbackButton('Далее', generateActionWithUUID('next'))
    ]
  ])
    .resize()
    .extra();
};

module.exports = {
  ratingKeyboard,
  getRatingInlineKeyboard,
  getAfterRatingInlineKeyboard
};
