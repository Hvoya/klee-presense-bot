import { SceneContextMessageUpdate } from "telegraf/typings/stage";
import { mainMenu } from "../content/keyboards";
import { texts } from "../content/texts";
import { formatUserId } from '../helpers/format-user-id';
import { getTomorrowMidnight } from '../helpers/get-tomorrow-midnight';
import { goToMainMenu } from '../helpers/scenes/go-to-main-menu';
import { Storage } from '../storage';


export const getCommonPresenseHandler = (storage: Storage) => async (ctx: SceneContextMessageUpdate) => {
   try {
    const tomorrowMidnight = getTomorrowMidnight();
    const userId = formatUserId(ctx.message!.from!.id);

    const presenses = storage.presense.get(tomorrowMidnight);

    if (presenses.length == 0) {
        await ctx.reply(texts.bot.replyEmptyCommonPresense);
        return;
    }

    if (presenses.length === 1 && presenses[0].user_id === userId) {
        await ctx.reply(texts.bot.getUserSinglePresense(presenses[0]));
        return;
    }

    await ctx.reply(texts.bot.getPresenseList(presenses), mainMenu);
   } catch(e) {
        goToMainMenu(ctx, texts.bot.replyDefaultError)
   }
}