import { SceneContextMessageUpdate } from 'telegraf/typings/stage'

import { getSpacesQuery } from '../../../../db/queries/spaces'
import { createUserQuery } from '../../../../db/queries/users'
import { mainMenu } from '../../../content/keyboards'
import { gifs } from '../../../content/media'
import { texts } from '../../../content/texts'
import { goToMainMenu } from '../../helpers/go-to-main-menu'

export const textHandler = async (ctx: SceneContextMessageUpdate): Promise<void> => {
  try {
    const spaces = await getSpacesQuery()

    const spaceVariants = spaces.map(space => space.id.toString())

    const text = ctx.message?.text

    const number = parseInt(text ?? '')

    if (isNaN(number)) {
      await ctx.reply(texts.bot.reply.notANumber)
      return
    }

    if (!spaceVariants.includes(number.toString())) {
      await ctx.reply(texts.bot.contruct.wrongVariant(spaceVariants))
      return
    }

    const user = ctx.message?.from

    if (user === undefined) {
      throw new Error('no user')
    }

    await createUserQuery({
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      id: user.id,
      space_id: number
    })

    await ctx.reply(texts.bot.reply.newOneCreated, mainMenu)
    await ctx.replyWithAnimation(gifs.boomKlee)

    await ctx.scene.leave()
  } catch (e) {
    console.error(e)
    await goToMainMenu(ctx, texts.bot.reply.defaultError)
  }
}
