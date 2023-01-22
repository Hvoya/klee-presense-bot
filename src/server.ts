import { Telegraf } from 'telegraf';
import { session } from 'telegraf';
import { SceneContextMessageUpdate } from 'telegraf/typings/stage';
import dotenv from 'dotenv';

dotenv.config();

import { texts } from './content/texts';
import { getCommonPresenseHandler } from './handlers/get-common-presense-handler';
import { getStartHandler } from './handlers/get-start-handler';
import { initScenes } from './scenes';
import { getStorage } from './storage';
import { getDiscardPresenseHandler } from './handlers/get-discard-presense-handler';
import { initRestServer } from './rest';

try {
    console.log(process.cwd())
    const bot = new Telegraf<SceneContextMessageUpdate>(process.env.BOT_TOKEN as string);
    const storage = getStorage();

    bot.use(session());
    initScenes(storage, bot);

    bot.start(getStartHandler(storage) as any)
  
    bot.hears(texts.user.buttonCommonPresense, getCommonPresenseHandler(storage));
    bot.hears(texts.user.buttonDiscardPresense, getDiscardPresenseHandler(storage));
    bot.hears(texts.user.buttonSubmitPresense, (ctx) => ctx.scene.enter('PRESENSE'));
  
    bot.launch();

    initRestServer();
} catch (e) {
    console.log(e);
}