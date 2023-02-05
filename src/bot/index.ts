import { Telegraf, session } from 'telegraf'
import { SceneContextMessageUpdate } from 'telegraf/typings/stage'

import { getLoggingMiddleware } from './middleware/logging'
import { initScenes } from './scenes'
import { initMainMenuHandlers } from './scenes/common/init-main-menu-handlers'
import { startHandler } from './scenes/common/start-handler'

export const launchBot = (): void => {
  const bot = new Telegraf<SceneContextMessageUpdate>(process.env.BOT_TOKEN as string)

  bot.use(session())
  bot.use(getLoggingMiddleware())

  initScenes(bot)
  initMainMenuHandlers(bot)

  bot.start(startHandler)

  void bot.launch()
}
