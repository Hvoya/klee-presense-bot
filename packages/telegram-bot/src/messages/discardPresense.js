const { deletePresense } = require('../api/delete-presense');
const { errorHandler } = require('../utils/error-handler');
const { getFetcher } = require('../utils/fetcher');
const presenseTexts = require('../texts/presense');

const discardPresense = (ctx) => {
  (async () => {
    try {
      const fetcher = getFetcher(ctx);

      await deletePresense(fetcher);

      await ctx.replyWithMarkdown(presenseTexts.discardPresenseReply);
      await ctx.replyWithSticker('CAACAgIAAxkBAAEcFqJjxeF7xYE_VeHVC4pQemFoIVF0-gACXBkAApnMEEkX9r82F4OJ6C0E');
    } catch (e) {
      errorHandler(ctx, e);
    }
  })();
};

module.exports = {
  discardPresense
};
