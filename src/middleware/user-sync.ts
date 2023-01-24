import { SceneContextMessageUpdate } from "telegraf/typings/stage";
import { texts } from "../content/texts";
import { formatUserId } from "../helpers/format-user-id";
import { goToMainMenu } from "../helpers/scenes/go-to-main-menu";
import { Storage } from "../storage";

export const getUserSyncMiddleware = (storage: Storage) => async (ctx: SceneContextMessageUpdate, next: () => void) => {
    try {
        const user = ctx.message!.from!;

        const userId = formatUserId(user.id);

        if (!storage.user.get(userId)) {
            storage.user.upsert({
                telegram_id: ctx.message!.from!.id,
                chat_id: ctx.chat!.id,
                username: ctx.message!.from!.username,
                name: ctx.message!.from!.first_name,
                surname: ctx.message!.from!.last_name
            })
        }

        next();

    } catch (e) {
        console.log(e);
        goToMainMenu(ctx, texts.bot.replyDefaultError);
    }
}