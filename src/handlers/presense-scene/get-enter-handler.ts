import { Markup } from "telegraf";
import { SceneContextMessageUpdate } from "telegraf/typings/stage";
import { texts } from "../../content/texts";
import { goToMainMenu } from "../../helpers/scenes/go-to-main-menu";
import { Storage } from "../../storage";

export const getEnterHandler = (_: Storage) => async (ctx: SceneContextMessageUpdate) => {
    try {
        // @ts-ignore
        ctx.session.askingFor = 'probability';

        await ctx.reply(texts.bot.askPresenseProbability, Markup.removeKeyboard().extra());
    } catch(e) {
        console.error(e);
        goToMainMenu(ctx, texts.bot.replyDefaultError)
    }
};