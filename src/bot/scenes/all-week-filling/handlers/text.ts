import { addDays, isSaturday } from 'date-fns'
import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import { PresenseStatus } from '../../../../db/entities/Presense'
import { updatePresenseQuery } from '../../../../db/queries/presenses'
import { mainMenu } from '../../../content/keyboards'
import { gifs } from '../../../content/media'
import { texts } from '../../../content/texts'
import { goToMainMenu } from '../../helpers/go-to-main-menu'
import { replyWithDayQuestion } from '../reply-with-day-question'

const replyToPresenseStatus = {
  [texts.user.buttons.yes]: PresenseStatus.WillCome,
  [texts.user.buttons.no]: PresenseStatus.WillNotCome,
  [texts.user.buttons.dontKnow]: PresenseStatus.Unknown
}

export const textHandler = async (ctx: SceneContextMessageUpdate): Promise<void> => {
  try {
    const userId = ctx.message?.from?.id.toString()

    if (userId === undefined) {
      throw new Error('no user id')
    }

    const dateToAsk = (ctx as any).session.dateToAsk as Date
    const text = ctx.message?.text ?? ''

    if ([
      texts.user.buttons.yes,
      texts.user.buttons.no,
      texts.user.buttons.dontKnow
    ].includes(text)) {
      await updatePresenseQuery({
        status: replyToPresenseStatus[text],
        user_id: userId,
        date: dateToAsk
      })

      const newDateToAsk = addDays(dateToAsk, 1)

      // Когда опросили всю неделю
      if (isSaturday(newDateToAsk)) {
        await ctx.reply(texts.bot.reply.allWeekFillingDone, mainMenu)
        await ctx.replyWithAnimation(gifs.jumpingKlee)

        await ctx.scene.leave();
        (ctx as any).session.dayToAsk = undefined;
        (ctx as any).session.fillNextWeek = undefined

        return
      }

      await replyWithDayQuestion(ctx, newDateToAsk);

      ((ctx as any).session.dateToAsk as Date) = newDateToAsk
    } else {
      await ctx.reply(texts.bot.reply.yesNoWarning)
    }
  } catch (e) {
    console.error(e)
    await goToMainMenu(ctx, texts.bot.reply.defaultError)
  }
}
