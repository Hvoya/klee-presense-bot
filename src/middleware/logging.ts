import { SceneContextMessageUpdate } from "telegraf/typings/stage";
import { texts } from "../content/texts";
import { goToMainMenu } from "../helpers/scenes/go-to-main-menu";

export const getLoggingMiddleware = () => async (ctx: SceneContextMessageUpdate, next: () => void) => {
    try {
        console.log(ctx.message?.from?.username, ctx.message?.text);

        next();

    } catch (e) {
        console.log(e);
        goToMainMenu(ctx, texts.bot.replyDefaultError);
    }
}