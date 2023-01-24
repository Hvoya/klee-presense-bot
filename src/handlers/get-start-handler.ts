import { SceneContextMessageUpdate } from "telegraf/typings/stage";
import { mainMenu } from "../content/keyboards";
import { texts } from "../content/texts";
import { goToMainMenu } from "../helpers/scenes/go-to-main-menu";
import { Storage } from "../storage";


export const getStartHandler = (_: Storage) => async (ctx: SceneContextMessageUpdate) => {
    try {
        await ctx.reply(texts.bot.start, mainMenu);
    } catch(e) {
        console.error(e);
        goToMainMenu(ctx, texts.bot.replyDefaultError)
    }
}