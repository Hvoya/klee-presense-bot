import { SceneContextMessageUpdate } from "telegraf/typings/stage";
import { texts } from "../content/texts";
import { formatUserId } from '../helpers/format-user-id';
import { getTomorrowMidnight } from '../helpers/get-tomorrow-midnight';
import { goToMainMenu } from "../helpers/scenes/go-to-main-menu";

import { Storage } from '../storage';

export const getDiscardPresenseHandler = (storage: Storage) => async (ctx: SceneContextMessageUpdate) => {
    try {
        const userId = formatUserId(ctx.message!.from!.id);
        const tomorrowMidnight = getTomorrowMidnight();
    
        const ifExists = storage.presense.checkIfExists({
            date: tomorrowMidnight,
            user_id: userId,
        });
    
        if (!ifExists) {
            await ctx.reply(texts.bot.replyDiscardPresenseNoExists);
            return;
        }
    
        storage.presense.delete({
            date: tomorrowMidnight,
            user_id: userId
        })
    
        await ctx.reply(texts.bot.replyDiscardPresense);
    } catch(e) {
        goToMainMenu(ctx, texts.bot.replyDefaultError)
    }
}