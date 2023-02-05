import { addDays, getDay } from 'date-fns'
import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import { DayOfWeek, getNextDayOfWeek, getToday } from '../../../../utils/date'
import { texts } from '../../../content/texts'
import { goToMainMenu } from '../../helpers/go-to-main-menu'
import { replyWithDayQuestion } from '../reply-with-day-question'

export const enterHandler = async (ctx: SceneContextMessageUpdate): Promise<void> => {
  try {
    let dateToAsk = getToday()

    /* Если больше 18 часов - не спрашиваем про сегодня */
    if (dateToAsk.getHours() > 18) {
      dateToAsk = addDays(dateToAsk, 1)
    }

    /* Если день выпал на конец недели/воскресенье заполним след.неделю */
    if ([DayOfWeek.Friday, DayOfWeek.Saturday, DayOfWeek.Sunday].includes(getDay(dateToAsk))) {
      dateToAsk = getNextDayOfWeek(DayOfWeek.Monday)
    }

    (ctx as any).session.dateToAsk = dateToAsk

    await replyWithDayQuestion(ctx, dateToAsk)
  } catch (e) {
    console.error(e)
    await goToMainMenu(ctx, texts.bot.reply.defaultError)
  }
}
