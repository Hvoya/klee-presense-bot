import { BaseScene } from 'telegraf'
import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import { showPresenseMenu } from '../../content/keyboards'
import { texts } from '../../content/texts'

import { initGoToMainMenuHandler } from '../helpers/init-go-to-main-menu-handler'
import { SceneKey } from '../scene-key'
import { getDisplayHandler } from './handlers/get-display-handler'
import { presenseDisplayAllWeekHandler } from './handlers/presense-display-all-week-handler'

export const initPresenseDisplayScene = (): BaseScene<SceneContextMessageUpdate> => {
  const presenseScene = new BaseScene(SceneKey.PresenseDisplay)

  presenseScene.enter(async ctx => await ctx.reply(texts.bot.ask.presenseDisplay, showPresenseMenu))

  presenseScene.hears(texts.user.buttons.presenseDisplayToday, getDisplayHandler(false))
  presenseScene.hears(texts.user.buttons.presenseDisplayTomorrow, getDisplayHandler(true))
  presenseScene.hears(texts.user.buttons.presenseDisplayAllWeek, presenseDisplayAllWeekHandler)

  initGoToMainMenuHandler(presenseScene)

  return presenseScene
}
