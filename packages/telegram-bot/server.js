require('dotenv').config({ path: '.env' });

const { Telegraf } = require('telegraf');
const keyboardTexts = require('./src/texts/keyboard');
const { getFetcher } = require('./src/utils/fetcher');
const { upsertUser } = require('./src/api/upsert-user');
const texts = require('./src/texts/common');
const { mainMenu } = require('./src/markup/main-menu');
const session = require('telegraf/session');
const { initButtonUsageRestriction } = require('./src/scenes/helpers');
const { registerScenes } = require('./src/scenes');
const { showPresense } = require('./src/messages/showPresense');
const { discardPresense } = require('./src/messages/discardPresense');

try {
  const bot = new Telegraf(process.env.BOT_TOKEN);

  bot.use(session());

  registerScenes(bot);

  bot.hears(keyboardTexts.tomorrowPresense, showPresense);
  bot.hears(keyboardTexts.discardTomorrowPresense, discardPresense);
  bot.hears(keyboardTexts.submitTomorrowPresense, (ctx) => ctx.scene.enter('presense'));

  bot.start(async (ctx) => {
    console.log(ctx.session)
    const fetcher = getFetcher(ctx);

    await upsertUser(fetcher, {
      tg_user_id: ctx.message.from.id,
      tg_chat_id: ctx.chat.id,
      tg_username: ctx.message.from.username,
      tg_name: ctx.message.from.first_name,
      tg_surname: ctx.message.from.last_name
    });

    ctx.reply(texts.start, mainMenu);
  });

  initButtonUsageRestriction(bot, [
    keyboardTexts.discardTomorrowPresense,
    keyboardTexts.submitTomorrowPresense,
    keyboardTexts.tomorrowPresense
  ]);

  bot.launch();
} catch (e) {
  console.log(e);
}
