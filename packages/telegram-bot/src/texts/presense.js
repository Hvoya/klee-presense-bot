const emptyPresense = 'Ой. Похоже, что завтра в офис никто не идет...';
const getOnlyYourPresense = (probability, comment) => `Ой. Похоже, что завтра в офис идешь только ты один...\nТы ещё сказал, что прийдешь с вероятностью ${probability}% и\n"${comment}"`;
const discardPresenseReply = 'Не прийдёшь, да? Убираю отметку.';
const probabilityQuestion = 'А ты уверен? Напиши вероятность в процентах!';
const presenseCommentQuestions = 'А комментарий оставить не хочешь? (А придётся).';
const presenseAplimentAnswer = 'Пометила. Жду тебя завтра в офисе!';
const probabilityIsNotANumber = 'Что это такое ты мне прислал? Это не число!';
const showPresensePreview = 'У меня всё записано. Так-так... Нашла!';
const getPresenseEntry = (username, probability, comment) =>
   `@${username} подтвердил, что будет завтра в офисе с вероятностью ${probability}%, ${comment ? `дополнительно заявив: \n"${comment}"` : 'ничего не сказав.'}`;

module.exports = {
  emptyPresense,
  discardPresenseReply,
  probabilityQuestion,
  presenseCommentQuestions,
  presenseAplimentAnswer,
  probabilityIsNotANumber,
  showPresensePreview,
  getPresenseEntry,
  getOnlyYourPresense
};
