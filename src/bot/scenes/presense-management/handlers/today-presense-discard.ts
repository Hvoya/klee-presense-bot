import { getDay } from 'date-fns'
import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import { PresenseStatus } from '../../../../db/entities/Presense'
import { updatePresenseQuery } from '../../../../db/queries/presenses'
import { DayOfWeek, getToday } from '../../../../utils/date'
import { stickers } from '../../../content/media'
import { texts } from '../../../content/texts'
import { goToMainMenu } from '../../helpers/go-to-main-menu'

export const todayPresenseDiscardHandler = async (ctx: SceneContextMessageUpdate): Promise<void> => {
  try {
    if ([DayOfWeek.Saturday, DayOfWeek.Sunday].includes(getDay(getToday()))) {
      await ctx.reply(texts.bot.reply.discardPresenseTodayWeekend)
      return
    }

    const userId = ctx.message?.from?.id.toString()

    if (userId === undefined) {
      throw new Error('no user id')
    }

    await updatePresenseQuery({
      date: getToday(),
      user_id: userId,
      status: PresenseStatus.WillNotCome
    })

    await ctx.reply(texts.bot.reply.discardPresenseToday)
    await ctx.replyWithAnimation(stickers.sadKlee)
  } catch (e) {
    console.error(e)
    await goToMainMenu(ctx, texts.bot.reply.defaultError)
  }
}
