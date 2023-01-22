import { SceneContextMessageUpdate } from "telegraf/typings/stage";
import { mainMenu } from "../content/keyboards";
import { texts } from "../content/texts";
import { goToMainMenu } from "../helpers/scenes/go-to-main-menu";
import { Storage } from "../storage";


export const getStartHandler = (storage: Storage) => async (ctx: SceneContextMessageUpdate) => {
    try {
        storage.user.upsert({
            telegram_id: ctx.message!.from!.id,
            chat_id: ctx.chat!.id,
            username: ctx.message!.from!.username,
            name: ctx.message!.from!.first_name,
            surname: ctx.message!.from!.last_name
        })
    
        await ctx.reply(texts.bot.start, mainMenu);
    } catch(e) {
        console.error(e);
        goToMainMenu(ctx, texts.bot.replyDefaultError)
    }
}