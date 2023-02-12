import { Stage, Telegraf } from 'telegraf'

import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import { initPresenseManagementScene } from './presense-management/init'
import { initPresenseDisplayScene } from './presense-display/init'
import { initSpaceChoiceScene } from './space-choice/init'
import { initAllWeekFilling } from './all-week-filling/init'
import { initMondayPresenseManagementScene } from './monday-presense-management/init'
import { initWishScene } from './wish-scene/init'
import { initSpaceSettingsScene } from './space-settings/init'

export const initScenes = (bot: Telegraf<SceneContextMessageUpdate>): void => {
  const stage = new Stage([
    initSpaceChoiceScene(),
    initPresenseManagementScene(),
    initAllWeekFilling(),
    initPresenseDisplayScene(),
    initMondayPresenseManagementScene(),
    initWishScene(),
    initSpaceSettingsScene()
  ])

  bot.use(stage.middleware())
}
