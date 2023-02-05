import { isEqual, isFriday, isMonday, isThursday, isTuesday, isWednesday } from 'date-fns'
import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import { getToday, getTomorrow } from '../../../utils/date'
import { yesNoDontKnow } from '../../content/keyboards'
import { texts } from '../../content/texts'

export const replyWithDayQuestion = async (
  ctx: SceneContextMessageUpdate,
  dateToAsk: Date
): Promise<void> => {
  const today = getToday()
  const tomorrow = getTomorrow()

  if (isEqual(today, dateToAsk)) {
    await ctx.reply(texts.bot.ask.allWeekFillingToday, yesNoDontKnow)
    return
  }

  if (isEqual(tomorrow, dateToAsk)) {
    await ctx.reply(texts.bot.ask.allWeekFillingTomorrow, yesNoDontKnow)
    return
  }

  if (isMonday(dateToAsk)) {
    await ctx.reply(texts.bot.ask.allWeekFillingMonday, yesNoDontKnow)
    return
  }

  if (isTuesday(dateToAsk)) {
    await ctx.reply(texts.bot.ask.allWeekFillingTuesday, yesNoDontKnow)
    return
  }

  if (isWednesday(dateToAsk)) {
    await ctx.reply(texts.bot.ask.allWeekFillingWednesday, yesNoDontKnow)
    return
  }

  if (isThursday(dateToAsk)) {
    await ctx.reply(texts.bot.ask.allWeekFillingThursday, yesNoDontKnow)
    return
  }

  if (isFriday(dateToAsk)) {
    await ctx.reply(texts.bot.ask.allWeekFillingFriday, yesNoDontKnow)
  }
}
