import { Markup } from 'telegraf'
import { ExtraSendMessage } from 'telegraf/typings/telegram-types'

import { chunkArray } from '../../utils/array'
import { texts } from './texts'

export const mainMenu = Markup.keyboard([
  [texts.user.buttons.presenseDisplay, texts.user.buttons.presenseManagement],
  [texts.user.buttons.spaceSettings, texts.user.buttons.botWorkWishSending]
])
  .resize()
  .extra()

export const showPresenseMenu = Markup.keyboard([
  [texts.user.buttons.presenseDisplayToday, texts.user.buttons.presenseDisplayTomorrow],
  [texts.user.buttons.presenseDisplayAllWeek],
  [texts.user.buttons.mainMenu]
])
  .resize()
  .extra()

export const presenseMenagement = Markup.keyboard([
  [texts.user.buttons.submitPresenseToday, texts.user.buttons.submitPresenseTomorrow],
  [texts.user.buttons.discardPresenseToday, texts.user.buttons.discardPresenseTomorrow],
  [texts.user.buttons.allWeekFilling],
  [texts.user.buttons.mainMenu]
])
  .resize()
  .extra()

export const yesNoDontKnow = Markup.keyboard([
  [texts.user.buttons.yes, texts.user.buttons.no],
  [texts.user.buttons.dontKnow]
])
  .resize()
  .extra()

export const getSpaceKeyboard = (ids: string[]): ExtraSendMessage => Markup.keyboard(chunkArray(ids, 5))
  .resize()
  .extra()
