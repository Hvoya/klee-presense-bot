const { getPresense } = require('../api/get-presense');
const { errorHandler } = require('../utils/error-handler');
const { getFetcher } = require('../utils/fetcher');
const presenseTexts = require('../texts/presense');

const showPresense = (ctx) => {
  (async () => {
    try {
      const fetcher = getFetcher(ctx);

      const presense = await getPresense(fetcher);

      if (presense.length === 0) {
        await ctx.reply(presenseTexts.emptyPresense);
        return;
      }

      if (presense.length === 1 && ctx.from.id === parseInt(presense[0].User.tg_user_id)) {
        const comment = presense[0].comment;
        const probability = presense[0].probability;

        await ctx.reply(presenseTexts.getOnlyYourPresense(probability, comment));
        return;
      }

      const presenseEtries = presense.map(
        pr => presenseTexts.getPresenseEntry(pr.User.tg_username, pr.probability, pr.comment)
      );

      const message = `${presenseTexts.showPresensePreview}\n\n${presenseEtries.join('\n\n')}`;

      await ctx.reply(message);
    } catch (e) {
      errorHandler(ctx, e);
    }
  })();
};

module.exports = {
  showPresense
};
