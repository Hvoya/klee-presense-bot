import { BaseScene } from 'telegraf'

import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import { initGoToMainMenuHandler } from '../helpers/init-go-to-main-menu-handler'
import { SceneKey } from '../scene-key'
import { textHandler } from './handlers/text'

export const initMondayPresenseManagementScene = (): BaseScene<SceneContextMessageUpdate> => {
  const mondayPresenseManagementScene = new BaseScene(SceneKey.MondayPresenseMenagement)

  mondayPresenseManagementScene.on('text', textHandler)

  initGoToMainMenuHandler(mondayPresenseManagementScene)

  return mondayPresenseManagementScene
}
