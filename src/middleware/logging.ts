import { SceneContextMessageUpdate } from "telegraf/typings/stage";
import { texts } from "../content/texts";
import { goToMainMenu } from "../helpers/scenes/go-to-main-menu";
import { Storage } from "../storage";

export const getLoggingMiddleware = (_: Storage) => async (ctx: SceneContextMessageUpdate, next: () => void) => {
    try {
        console.log(ctx.message?.from?.username, ctx.message?.text);

        next();

    } catch (e) {
        console.log(e);
        goToMainMenu(ctx, texts.bot.replyDefaultError);
    }
}