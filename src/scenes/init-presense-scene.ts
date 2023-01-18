import { BaseScene } from 'telegraf';
import { getEnterHandler } from '../handlers/presense-scene';
import { getTextHandler } from '../handlers/presense-scene';
import { Storage } from '../storage';

export const initPresenseScene = (storage: Storage) => {
    const presenseScene = new BaseScene('PRESENSE');

    presenseScene.enter(getEnterHandler(storage));
    presenseScene.on('text', getTextHandler(storage));

    return presenseScene;
}