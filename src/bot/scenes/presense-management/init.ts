import { BaseScene } from 'telegraf'
import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import { presenseMenagement } from '../../content/keyboards'
import { texts } from '../../content/texts'

import { initGoToMainMenuHandler } from '../helpers/init-go-to-main-menu-handler'
import { SceneKey } from '../scene-key'
import { todayPresenseDiscardHandler } from './handlers/today-presense-discard'
import { todayPresenseSubmitHandler } from './handlers/today-presense-submit'
import { tomorrowPresenseDiscardHandler } from './handlers/tomorrow-presense-discard'
import { tomorrowPresenseSubmitHandler } from './handlers/tomorrow-presense-submit'

export const initPresenseManagementScene = (): BaseScene<SceneContextMessageUpdate> => {
  const presenseManagementScene = new BaseScene(SceneKey.PresenseManagement)

  presenseManagementScene.enter(async ctx => await ctx.reply(texts.bot.ask.presenseDisplay, presenseMenagement))

  presenseManagementScene.hears(texts.user.buttons.submitPresenseToday, todayPresenseSubmitHandler)
  presenseManagementScene.hears(texts.user.buttons.discardPresenseToday, todayPresenseDiscardHandler)
  presenseManagementScene.hears(texts.user.buttons.submitPresenseTomorrow, tomorrowPresenseSubmitHandler)
  presenseManagementScene.hears(texts.user.buttons.discardPresenseTomorrow, tomorrowPresenseDiscardHandler)

  presenseManagementScene.hears(texts.user.buttons.allWeekFilling, async (ctx) => {
    await ctx.scene.enter(SceneKey.AllWeekFilling)
  })

  initGoToMainMenuHandler(presenseManagementScene)

  return presenseManagementScene
}
