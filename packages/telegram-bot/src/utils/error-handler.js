const { goToMainMenu } = require('../scenes/helpers');

const errorHandler = async (ctx, e) => {
  console.log(e);
  await ctx.reply('Что-то пошло не так.');
  await goToMainMenu(ctx);
};

module.exports = {
  errorHandler
};
