import { getDay } from 'date-fns'
import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import { PresenseStatus } from '../../../../db/entities/Presense'
import { updatePresenseQuery } from '../../../../db/queries/presenses'
import { DayOfWeek, getToday } from '../../../../utils/date'
import { yesNoDontKnow } from '../../../content/keyboards'
import { gifs } from '../../../content/media'
import { texts } from '../../../content/texts'
import { goToMainMenu } from '../../helpers/go-to-main-menu'
import { SceneKey } from '../../scene-key'

export const todayPresenseSubmitHandler = async (ctx: SceneContextMessageUpdate): Promise<void> => {
  try {
    if ([DayOfWeek.Saturday, DayOfWeek.Sunday].includes(getDay(getToday()))) {
      await ctx.reply(texts.bot.ask.submitPresenseWeekendToday, yesNoDontKnow)
      await ctx.scene.enter(SceneKey.MondayPresenseMenagement)
      return
    }

    const userId = ctx.message?.from?.id.toString()

    if (userId === undefined) {
      throw new Error('no user id')
    }

    await updatePresenseQuery({
      date: getToday(),
      user_id: userId,
      status: PresenseStatus.WillCome
    })

    await ctx.reply(texts.bot.reply.submitPresenseToday)
    await ctx.replyWithAnimation(gifs.waitingKlee)
  } catch (e) {
    console.error(e)
    await goToMainMenu(ctx, texts.bot.reply.defaultError)
  }
}
