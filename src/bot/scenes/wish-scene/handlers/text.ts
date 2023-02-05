import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import { createWishQuery } from '../../../../db/queries/wishes'
import { mainMenu } from '../../../content/keyboards'
import { stickers } from '../../../content/media'
import { texts } from '../../../content/texts'
import { goToMainMenu } from '../../helpers/go-to-main-menu'

export const textHandler = async (ctx: SceneContextMessageUpdate): Promise<void> => {
  try {
    const text = ctx.message?.text
    const userId = ctx.message?.from?.id.toString()

    if (userId === undefined) {
      throw new Error('no user id')
    }

    await createWishQuery({ user_id: userId, message: text ?? '' })

    await ctx.scene.leave()

    await ctx.reply(texts.bot.reply.thanksForWith, mainMenu)
    await ctx.replyWithSticker(stickers.kleeAndCat)
  } catch (e) {
    console.error(e)
    await goToMainMenu(ctx, texts.bot.reply.defaultError)
  }
}
