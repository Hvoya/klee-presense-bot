import { PresenseWithUser } from "../storage/storage.types";

const getPresenseRecord = (presense: PresenseWithUser) =>
     `@${presense.user.username} подтвердил, что будет завтра в офисе с вероятностью ${presense.probability}%, ${presense.comment ? `дополнительно заявив: \n"${presense.comment}"` : 'ничего не сказав.'}`;

const getPresenseList = (presenses: PresenseWithUser[]) => {
    const heading = 'У меня всё записано. Так-так... Нашла!';
    return `${heading}\n\n${presenses.map(getPresenseRecord).join('\n\n')}`;
};

const getUserSinglePresense = (presense: PresenseWithUser) => `Ой. Похоже, что завтра в офис идешь только ты один...\nТы ещё сказал, что прийдешь с вероятностью ${presense.probability}% и\n"${presense.comment}"`;

export const texts = {
    bot: {
        start: 'Рыцарь Искорка из Ордо Фавониус явилась на службу!',
        replyEmptyCommonPresense: 'Ой. Похоже, что завтра в офис никто не идет...',
        replyDiscardPresense: 'Не прийдёшь, да? Убираю отметку.',
        replyDiscardPresenseNoExists: 'Дурачишь меня? Твоего присутствия нет!',
        replySubmitPresense: 'Пометила. Жду тебя завтра в офисе!',
        replyProbabilityIsNotANumber: 'Что это такое ты мне прислал? Это не число!',
        replyDefaultError: 'Ой-ой! Случилось что-то нехорошее... Давай начнём занаво!',
        askPresenseProbability: 'А ты уверен? Напиши вероятность в процентах!',
        askPresenseComment: 'А комментарий оставить не хочешь? (А придётся).',
        getPresenseList,
        getUserSinglePresense
    },
    user: {
        buttonCommonPresense: 'А кто завтра в офисе?',
        buttonSubmitPresense: 'Я завтра буду!',
        buttonDiscardPresense: 'Меня завтра не будет!'
    }
}