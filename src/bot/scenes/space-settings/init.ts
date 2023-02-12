import { BaseScene } from 'telegraf'
import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import { initGoToMainMenuHandler } from '../helpers/init-go-to-main-menu-handler'
import { SceneKey } from '../scene-key'
import { enterHandler } from './handlers/enter'
import { textHandler } from './handlers/text'

export const initSpaceSettingsScene = (): BaseScene<SceneContextMessageUpdate> => {
  const spaceSettingsScene = new BaseScene(SceneKey.SpaceSettings)

  spaceSettingsScene.enter(enterHandler)
  spaceSettingsScene.on('text', textHandler)

  initGoToMainMenuHandler(spaceSettingsScene)

  return spaceSettingsScene
}
