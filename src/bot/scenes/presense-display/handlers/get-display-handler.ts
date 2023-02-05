import { SceneContextMessageUpdate } from 'telegraf/typings/stage'
import { PresenseStatus } from '../../../../db/entities/Presense'
import { getDatesWithUserPresenseQuery } from '../../../../db/queries/presenses'
import { getSpaceByUserQuery } from '../../../../db/queries/spaces'
import { DayOfWeek, getNextDayOfWeek, getToday, getTomorrow } from '../../../../utils/date'
import { mainMenu } from '../../../content/keyboards'
import { gifs } from '../../../content/media'
import { texts } from '../../../content/texts'
import { goToMainMenu } from '../../helpers/go-to-main-menu'

const keyToNoOneReplyMap = {
  tomorrow: texts.bot.reply.emptyPresenseTomorrow,
  today: texts.bot.reply.emptyPresenseToday,
  monday: texts.bot.reply.emptyPresenseMonday
}

const keyToSingleUserReplyMap = {
  tomorrow: texts.bot.reply.singleUserPresenseTomorrow,
  today: texts.bot.reply.singleUserPresenseToday,
  monday: texts.bot.reply.singleUserPresenseMonday
}

export const getDisplayHandler = (isTomorrow: boolean) => async (ctx: SceneContextMessageUpdate) => {
  try {
    let date
    let dateKey

    if (isTomorrow) {
      date = getTomorrow()
      dateKey = 'tomorrow' as const
    } else {
      date = getToday()
      dateKey = 'today' as const
    }

    if ([DayOfWeek.Sunday, DayOfWeek.Saturday].includes(date.getDay())) {
      date = getNextDayOfWeek(DayOfWeek.Monday)
      dateKey = 'monday' as const

      await ctx.reply(isTomorrow
        ? texts.bot.reply.presenseDisplayTomorrowWeekend
        : texts.bot.reply.presenseDisplayTodayWeekend
      )
    };

    const userId = ctx.message?.from?.id.toString()

    if (userId === undefined) {
      throw new Error('no user id')
    }

    const space = await getSpaceByUserQuery(userId)
    const dateNodes = await getDatesWithUserPresenseQuery({
      space_id: space.id,
      start_date: date,
      amount: 1
    })

    const dateInfo = dateNodes[0]
    const currentUserInfo = dateInfo.users.find(user => user.id === userId)

    const noOneInPresense = dateInfo.users.every(user => user.presense_status !== PresenseStatus.WillCome)

    const onlyCurrentUserInPresense = currentUserInfo?.presense_status === PresenseStatus.WillCome &&
      dateInfo.users.every(
        user => user.presense_status !== PresenseStatus.WillCome ||
        (user.id === userId && user.presense_status === PresenseStatus.WillCome))

    if (noOneInPresense) {
      await ctx.reply(
        keyToNoOneReplyMap[dateKey],
        mainMenu
      )
      await ctx.scene.leave()
      await ctx.replyWithAnimation(gifs.diyingOfCringeKlee)
      return
    }

    if (onlyCurrentUserInPresense) {
      await ctx.reply(
        keyToSingleUserReplyMap[dateKey],
        mainMenu
      )
      await ctx.scene.leave()
      await ctx.replyWithAnimation(gifs.attackedKlee)
      return
    }

    await ctx.reply(texts.bot.contruct.presenseList(dateInfo.users, false), mainMenu)
    await ctx.scene.leave()
  } catch (e) {
    console.error(e)
    await goToMainMenu(ctx, texts.bot.reply.defaultError)
  }
}
