import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import { PresenseStatus } from '../../../../db/entities/Presense'
import { updatePresenseQuery } from '../../../../db/queries/presenses'
import { getNextDayOfWeek } from '../../../../utils/date'
import { mainMenu } from '../../../content/keyboards'
import { gifs } from '../../../content/media'
import { texts } from '../../../content/texts'
import { goToMainMenu } from '../../helpers/go-to-main-menu'

export const textHandler = async (ctx: SceneContextMessageUpdate): Promise<void> => {
  try {
    const text = ctx.message?.text
    const userId = ctx.message?.from?.id.toString()

    if (userId === undefined) {
      throw new Error('no user id')
    }

    if (![texts.user.buttons.yes, texts.user.buttons.no, texts.user.buttons.dontKnow].includes(text ?? '')) {
      await ctx.reply(texts.bot.reply.yesNoWarning)
      await ctx.replyWithAnimation(gifs.agroKlee)
      return
    }

    if (text === texts.user.buttons.yes) {
      await updatePresenseQuery({
        status: PresenseStatus.WillCome,
        date: getNextDayOfWeek(1),
        user_id: userId
      })

      await ctx.reply(texts.bot.reply.submitPresenseMonday, mainMenu)
      await ctx.replyWithAnimation(gifs.seriousKlee)
      await ctx.scene.leave()
      return
    } else if (text === texts.user.buttons.no) {
      await updatePresenseQuery({
        status: PresenseStatus.WillNotCome,
        date: getNextDayOfWeek(1),
        user_id: userId
      })

      await ctx.reply(texts.bot.reply.discardPresenseMonday, mainMenu)
      await ctx.replyWithAnimation(gifs.cryingKlee)
      await ctx.scene.leave()
      return
    } else {
      await updatePresenseQuery({
        status: PresenseStatus.Unknown,
        date: getNextDayOfWeek(1),
        user_id: userId
      })

      await ctx.reply(texts.bot.reply.discardPresenseMonday, mainMenu)
      await ctx.replyWithAnimation(gifs.cryingKlee)
      await ctx.scene.leave()
      return
    }
  } catch (e) {
    console.error(e)
    await goToMainMenu(ctx, texts.bot.reply.defaultError)
  }
}
