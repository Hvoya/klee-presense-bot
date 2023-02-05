import { Scene } from 'telegraf/typings/stage'
import { mainMenu } from '../../content/keyboards'
import { texts } from '../../content/texts'

export const initGoToMainMenuHandler = (scene: Scene<any>): void => {
  scene.hears(texts.user.buttons.mainMenu, ctx => {
    ctx.reply(texts.bot.reply.afterGoToMainMenu, mainMenu)
    ctx.scene.leave()
  })
}
