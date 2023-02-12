import { Telegraf } from 'telegraf'
import { SceneContextMessageUpdate } from 'telegraf/typings/stage'

import { texts } from '../../content/texts'
import { SceneKey } from '../scene-key'

export const initMainMenuHandlers = (bot: Telegraf<SceneContextMessageUpdate>): void => {
  bot.hears(texts.user.buttons.presenseDisplay, async (ctx) => await ctx.scene.enter(SceneKey.PresenseDisplay))
  bot.hears(texts.user.buttons.presenseManagement, async (ctx) => await ctx.scene.enter(SceneKey.PresenseManagement))
  bot.hears(texts.user.buttons.botWorkWishSending, async (ctx) => await ctx.scene.enter(SceneKey.Wish))
  bot.hears(texts.user.buttons.spaceSettings, async (ctx) => await ctx.scene.enter(SceneKey.SpaceSettings))
}
