import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import { mainMenu } from '../../content/keyboards'
import { gifs } from '../../content/media'

export const goToMainMenu = async (ctx: SceneContextMessageUpdate, text: string): Promise<void> => {
  await ctx.scene.leave()
  await ctx.reply(text, mainMenu)
  await ctx.replyWithAnimation(gifs.backToBoomKlee)
}
