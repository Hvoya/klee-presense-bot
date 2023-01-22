import { SceneContextMessageUpdate } from "telegraf/typings/stage";
import { stickers } from "../../content/stickers";
import { texts } from "../../content/texts";
import { formatUserId } from "../../helpers/format-user-id";
import { getTomorrowMidnight } from "../../helpers/get-tomorrow-midnight";
import { goToMainMenu } from "../../helpers/scenes/go-to-main-menu";
import { Storage } from "../../storage";

export const getTextHandler = (storage: Storage) => async (ctx: SceneContextMessageUpdate) => {
  try {
    // @ts-ignore
    const askingFor = ctx.session.askingFor;
    const text = ctx.message!.text;

    switch (askingFor) {
      case 'probability': {
        const probability = parseInt(text);

        if (Number.isNaN(probability)) {
          await ctx.reply(texts.bot.replyProbabilityIsNotANumber);

          return;
        }

         // @ts-ignore
        ctx.session.probability = probability;
         // @ts-ignore
        ctx.session.askingFor = 'comment';

        await ctx.reply(texts.bot.askPresenseComment);
        break;
      }

      case 'comment': {
         // @ts-ignore
        ctx.session.askingFor = null;

        storage.presense.upsert({
            comment: text,
             // @ts-ignore
            probability: ctx.session.probability,
            date: getTomorrowMidnight(),
            user_id: formatUserId(ctx.message!.from!.id)
        })

        await ctx.replyWithSticker(stickers.dancingKlee);
        goToMainMenu(ctx, texts.bot.replySubmitPresense);
      }
    }
  } catch(e) {
    console.error(e);
    goToMainMenu(ctx, texts.bot.replyDefaultError)
  }
};