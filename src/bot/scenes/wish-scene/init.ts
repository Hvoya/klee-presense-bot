import { BaseScene } from 'telegraf'
import { SceneContextMessageUpdate } from 'telegraf/typings/stage'

import { initGoToMainMenuHandler } from '../helpers/init-go-to-main-menu-handler'
import { SceneKey } from '../scene-key'
import { enterHandler } from './handlers/enter'
import { textHandler } from './handlers/text'

export const initWishScene = (): BaseScene<SceneContextMessageUpdate> => {
  const wishScene = new BaseScene(SceneKey.Wish)

  wishScene.enter(enterHandler)
  wishScene.on('text', textHandler)

  initGoToMainMenuHandler(wishScene)

  return wishScene
}
