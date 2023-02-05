import { Markup } from 'telegraf'

import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import { texts } from '../../../content/texts'
import { goToMainMenu } from '../../helpers/go-to-main-menu'

export const enterHandler = async (ctx: SceneContextMessageUpdate): Promise<void> => {
  try {
    await ctx.reply(texts.bot.ask.wish, Markup.removeKeyboard().extra())
  } catch (e) {
    console.error(e)
    await goToMainMenu(ctx, texts.bot.reply.defaultError)
  }
}
