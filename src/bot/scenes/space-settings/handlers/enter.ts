import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import { getSpacesQuery } from '../../../../db/queries/spaces'
import { getSpaceKeyboard } from '../../../content/keyboards'
import { texts } from '../../../content/texts'
import { goToMainMenu } from '../../helpers/go-to-main-menu'

export const enterHandler = async (ctx: SceneContextMessageUpdate): Promise<void> => {
  try {
    const spaces = await getSpacesQuery()

    await ctx.reply(
      texts.bot.contruct.spaceQuestion(spaces, false),
      getSpaceKeyboard(spaces.map(space => space.id.toString()))
    )
  } catch (e) {
    console.error(e)
    await goToMainMenu(ctx, texts.bot.reply.defaultError)
  }
}
