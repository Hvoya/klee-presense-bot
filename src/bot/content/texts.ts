import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import { DateNode } from '../../db/entities/DateNode'
import { PresenseStatus } from '../../db/entities/Presense'
import { Space } from '../../db/entities/Space'
import { UserWithPresenseStatus } from '../../db/entities/User'
import { capitalize } from '../../utils/capitalize'

const getName = ({ username, first_name, last_name }: UserWithPresenseStatus): string => {
  return username === null
    ? `${first_name ?? ''}${last_name === null ? '' : ` ${last_name}`}`
    : `@${username}`
}

const presenseStatusToEmoji = {
  [PresenseStatus.Unknown]: '❔',
  [PresenseStatus.WillCome]: '✅',
  [PresenseStatus.WillNotCome]: '❌'
}

const getPresenseRecord = (user: UserWithPresenseStatus): string =>
     `${getName(user)} - ${presenseStatusToEmoji[user.presense_status]}`

const presenseList = (users: UserWithPresenseStatus[], noHeading: boolean): string => {
  const heading = 'У меня всё записано. Так-так... Нашла!'

  return `${
    noHeading
    ? ''
    : `${heading}\n\n`}${
        users
            .sort((u1, u2) => (u1.username ?? u1.first_name ?? '') > (u2.username ?? u2.first_name ?? '') ? 1 : -1)
            .map(getPresenseRecord)
            .join('\n')
    }`
}

const presenseListAllWeek = (dateNodes: DateNode[], endOfWeek: boolean): string => {
  const heading = endOfWeek
    ? 'Посмотрим, что у нас на следующей неделе...'
    : 'Так-так, посмотрим всю неделю...'

  return `${heading}
    
${dateNodes.map((node) =>
`${capitalize(format(node.date, 'EEEE', { locale: ru }))}:
${presenseList(node.users, true)}`
    ).join('\n\n')}`
}

const spaceQuestion = (spaces: Space[]): string =>
`Так-так, у нас новенький! Давай-ка я закреплю за тобой спейс. (Закреплённый спейс можешь поменять в любое время.)
Вот список доступных:

${spaces.map(space => `${space.id}. ${space.name}`).join('\n')}

Выбери тот, в который хочешь ходить!`

const wrongVariant = (variants: string[]): string =>
`Давай-ка я тебе объясню кое-что. Ты должен выбрать что-то из:

${variants.join('\n')}

И ничего кроме!`

export const texts = {
  bot: {
    start: 'Рыцарь Искорка из Ордо Фавониус явилась на службу!',
    ask: {
      presenseDisplay: 'Что хочешь посмотреть?',
      presenseManagement: 'Слушаю...?',
      allWeekFillingToday: 'Сегодня притопаешь?',
      allWeekFillingTomorrow: 'Завтра притопаешь?',
      allWeekFillingMonday: 'Придёшь в понедельник?',
      allWeekFillingTuesday: 'Придёшь во вторник?',
      allWeekFillingWednesday: 'Придёшь в среду?',
      allWeekFillingThursday: 'Придёшь в четверг?',
      allWeekFillingFriday: 'Придёшь в пятницу?',
      allWeekFillingNextWeekFillingOffer: 'Уже конец недели! Давай заполним следующую!',
      submitPresenseWeekendTomorrow: 'Завтра же выходной! Может заполним понедельник? Придёшь в понедельник?',
      submitPresenseWeekendToday: 'Сегодня выходной! Сиди дома. Может заполним понедельник? Придёшь в понедельник?',
      wish: 'Напиши, что хочешь улучшить в работе бота - всё, что угодно! Или опиши баг.'
    },
    reply: {
      presenseDisplayTomorrowWeekend: 'Завтра же выходной! Но у меня есть записи о понедельнике!',
      presenseDisplayTodayWeekend: 'Сегодня же выходной! Но у меня есть записи о понедельнике!',
      emptyPresenseTomorrow: 'Ой. Похоже, что завтра в офис никто не идёт...',
      emptyPresenseToday: 'Ой. А сегодня в офисе никого нет...',
      emptyPresenseMonday: 'Ой. А в понедельник в офисе никого нет...',
      singleUserPresenseTomorrow: 'Ой. Похоже, что завтра в офис идёшь только ты один...',
      singleUserPresenseToday:
        'Ой. Похоже, что сегодня тебя ждёт одинокая работа в офисе... В офис собрался идти только ты!',
      singleUserPresenseMonday: 'Ой. Похоже, что в понедельник в офис идёшь только ты один...',
      discardPresenseToday: 'О таком нужно предупреждать заранее! Убираю отметку.',
      discardPresenseTomorrow: 'Не придешь, да? Убираю отметку.',
      discardPresenseNotExistsTomorrow: 'Дурачишь меня? Твоего присутствия завтра нет!',
      discardPresenseNotExistsToday: 'Дурачишь меня? Твоего присутствия сегодня нет!',
      discardPresenseTomorrowWeekend: 'Я и так знаю, что тебя завтра не будет. Завтра же выходной!',
      discardPresenseTodayWeekend: 'Я и так знаю, что тебя сегодня не будет. Сегодня же выходной!',
      discardPresenseMonday: 'Понедельник день тяжёлый, а без тебя нам будет тяжело вдвойне...',
      submitPresenseTomorrow: 'Пометила. Жду тебя завтра в офисе!',
      submitPresenseToday: 'Пометила. А мы уже думали, что тебя не будет...',
      submitPresenseMonday: 'Понедельник день тяжёлый, но мы будем работать вместе!',
      notANumber: 'Что это такое ты мне прислал? Это не число!',
      yesNoWarning: 'Да или Нет. Отвечай Да или Нет!',
      newOneCreated: 'Новенький зарегистрирован! Народ, у нас пополнение!',
      allWeekFillingDone: 'Готово! Ты заполнил всю неделю. Молодец!',
      thanksForWith: 'Спасибо за пожелание! Сделаем обязательно-обязательно!',
      afterGoToMainMenu: 'Начинаем сначала!',
      defaultError: 'Ой-ой! Случилось что-то нехорошее... Давай начнём занаво!'
    },
    contruct: {
      spaceQuestion,
      presenseList,
      presenseListAllWeek,
      wrongVariant
    }
  },
  user: {
    buttons: {
      presenseDisplay: 'Хочу посмотреть, кто придёт. 🔍',
      presenseManagement: 'Хочу отметиться! 🗓',
      presenseDisplayTomorrow: 'А кто придёт завтра? ☕️',
      presenseDisplayToday: 'А кто придёт сегодня? ☕️',
      presenseDisplayAllWeek: 'Показать всю неделю! 🌟',
      discardPresenseTomorrow: 'Меня завтра не будет! ❌',
      discardPresenseToday: 'Меня сегодня не будет! ❌',
      submitPresenseTomorrow: 'Я завтра буду! ✅',
      submitPresenseToday: 'Я сегодня буду! ✅',
      allWeekFilling: 'Хочу заполнить всю неделю! 🔥',
      botWorkWishSending: 'Хочу оставить пожелание по работе бота. ❤️',
      spaceSettings: 'Настройка спейса. ⚙️',
      mainMenu: 'Главное меню ✨',
      yes: 'Да ✅',
      no: 'Нет ❌',
      dontKnow: 'Не знаю ❔'
    }
  }
}
