import { getDay } from 'date-fns'
import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import { getDatesWithUserPresenseQuery } from '../../../../db/queries/presenses'
import { getSpaceByUserQuery } from '../../../../db/queries/spaces'
import { DayOfWeek, getNextDayOfWeek, getToday } from '../../../../utils/date'
import { texts } from '../../../content/texts'
import { goToMainMenu } from '../../helpers/go-to-main-menu'

export const presenseDisplayAllWeekHandler = async (ctx: SceneContextMessageUpdate): Promise<void> => {
  try {
    const userId = ctx.message?.from?.id.toString()

    if (userId === undefined) {
      throw new Error('no user id')
    }

    const today = getToday()
    const endOfWeek = [
      DayOfWeek.Friday,
      DayOfWeek.Saturday
    ].includes(getDay(today))

    const startDay = (endOfWeek || getDay(today) === DayOfWeek.Sunday) ? DayOfWeek.Monday : getDay(today)
    const startDate = getNextDayOfWeek(startDay)

    const space = await getSpaceByUserQuery(userId)
    const dateNodes = await getDatesWithUserPresenseQuery({
      space_id: space.id,
      start_date: startDate,
      amount: 5 - startDay + 1
    })

    await ctx.reply(texts.bot.contruct.presenseListAllWeek(dateNodes, endOfWeek))
  } catch (e) {
    console.error(e)
    await goToMainMenu(ctx, texts.bot.reply.defaultError)
  }
}
