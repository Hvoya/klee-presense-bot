import { BaseScene } from 'telegraf'
import { SceneContextMessageUpdate } from 'telegraf/typings/stage'

import { initGoToMainMenuHandler } from '../helpers/init-go-to-main-menu-handler'
import { SceneKey } from '../scene-key'
import { enterHandler } from './handlers/enter'
import { textHandler } from './handlers/text'

export const initSpaceChoiceScene = (): BaseScene<SceneContextMessageUpdate> => {
  const spaceChoiceScene = new BaseScene(SceneKey.SpaceChoice)

  spaceChoiceScene.enter(enterHandler)

  spaceChoiceScene.on('text', textHandler)

  initGoToMainMenuHandler(spaceChoiceScene)

  return spaceChoiceScene
}
