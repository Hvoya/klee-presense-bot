import { SceneContextMessageUpdate } from 'telegraf/typings/stage'

import { getUserQuery } from '../../../db/queries/users'
import { mainMenu } from '../../content/keyboards'
import { texts } from '../../content/texts'
import { goToMainMenu } from '../helpers/go-to-main-menu'
import { SceneKey } from '../scene-key'

export const startHandler = async (ctx: SceneContextMessageUpdate): Promise<void> => {
  try {
    const userId = ctx.message?.from?.id.toString()

    if (userId === undefined) {
      throw new Error('no user id')
    }

    const user = await getUserQuery(userId)

    if (user === undefined) {
      await ctx.scene.enter(SceneKey.SpaceChoice)
    } else {
      await ctx.reply(texts.bot.start, mainMenu)
    }
  } catch (e) {
    console.error(e)
    await goToMainMenu(ctx, texts.bot.reply.defaultError)
  }
}
