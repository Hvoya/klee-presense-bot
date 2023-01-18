import { Stage, Telegraf } from 'telegraf';
import { SceneContextMessageUpdate } from 'telegraf/typings/stage';
import { Storage } from '../storage';
import { initPresenseScene } from './init-presense-scene';

export const initScenes = (storage: Storage, bot: Telegraf<SceneContextMessageUpdate>) => {
    const stage = new Stage([initPresenseScene(storage)]);

    bot.use(stage.middleware());
};