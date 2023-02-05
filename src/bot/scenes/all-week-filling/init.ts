import { BaseScene } from 'telegraf'
import { SceneContextMessageUpdate } from 'telegraf/typings/stage'

import { initGoToMainMenuHandler } from '../helpers/init-go-to-main-menu-handler'
import { SceneKey } from '../scene-key'
import { enterHandler } from './handlers/enter'
import { textHandler } from './handlers/text'

export const initAllWeekFilling = (): BaseScene<SceneContextMessageUpdate> => {
  const allWeekFillingScene = new BaseScene(SceneKey.AllWeekFilling)

  allWeekFillingScene.enter(enterHandler)
  allWeekFillingScene.on('text', textHandler)

  initGoToMainMenuHandler(allWeekFillingScene)

  return allWeekFillingScene
}
