import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import { mainMenu } from '../../content/keyboards'

export const goToMainMenu = async (ctx: SceneContextMessageUpdate, text: string): Promise<void> => {
  await ctx.scene.leave()
  await ctx.reply(text, mainMenu)
}
