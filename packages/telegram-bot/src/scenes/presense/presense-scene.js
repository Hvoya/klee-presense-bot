const Scene = require('telegraf/scenes/base');
const { goToMainMenu } = require('../helpers');
const texts = require('../../texts/presense');
const { errorHandler } = require('../../utils/error-handler');
const { getFetcher } = require('../../utils/fetcher');
const { upsertPresense } = require('../../api/upsert-presense');
const Markup = require('telegraf/markup');

const presenseScene = new Scene('presense');

presenseScene.enter(async (ctx) => {
  try {
    ctx.session.hearsTo = 'probability';

    await ctx.reply(texts.probabilityQuestion, Markup.removeKeyboard(true).extra());
  } catch (e) {
    errorHandler(ctx, e);
  }
});

presenseScene.on('text', async (ctx) => {
  (async () => {
    try {
      const fetcher = getFetcher(ctx);

      const hearsTo = ctx.session.hearsTo;
      const text = ctx.message.text;

      switch (hearsTo) {
        case 'probability': {
          const probability = parseInt(text);

          if (Number.isNaN(probability)) {
            await ctx.reply(texts.probabilityIsNotANumber);

            return;
          }

          ctx.session.probability = probability;
          ctx.session.hearsTo = 'comment';

          await ctx.reply(texts.presenseCommentQuestions);
          break;
        }
        case 'comment': {
          ctx.session.comment = text;
          ctx.session.hearsTo = null;

          await upsertPresense(fetcher, {
            comment: ctx.session.comment,
            probability: ctx.session.probability
          });

          await goToMainMenu(ctx, texts.presenseAplimentAnswer);
          await ctx.replyWithSticker('CAACAgIAAxkBAAEcFqRjxeF9yHFEciSOj7lcMw6cAW1xmgAC3hcAAn2tEUkY1kUvNJrfPC0E');
          break;
        }
      }

      // const text = ctx.message.text;
      // const fetcher = getFetcher(ctx);
      // const settings = ctx.session.settings;
      // const currentUser = ctx.update.message.from;

      // const brands = await getBrands(fetcher);
      // const defaultBrandNames = brands.filter(brand => brand.is_default_brand).map(brand => formatBrandName(brand.name));
      // const brandsRegexp = new RegExp(`^(${defaultBrandNames.join('|')})`, 'i');

      // switch (true) {
      //   case !!text.match(new RegExp(`^${keyboardTexts.male}`, 'i')): {
      //     const isEnabled = await settings.toggleMaleShoesSettings(fetcher, currentUser);

      //     await ctx.reply(isEnabled ? texts.maleShoesOn : texts.maleShoesOff, settings.getKeyboard());
      //     break;
      //   }
      //   case !!text.match(new RegExp(`^${keyboardTexts.female}`, 'i')): {
      //     const isEnabled = await settings.toggleFemaleShoesSettings(fetcher, currentUser);

      //     await ctx.reply(isEnabled ? texts.femaleShoesOn : texts.femaleShoesOff, settings.getKeyboard());
      //     break;
      //   }
      //   case !!text.match(new RegExp(`^${keyboardTexts.notification}`, 'i')): {
      //     const isEnabled = await settings.toggleNotificationSettings(fetcher, currentUser);

      //     await ctx.reply(isEnabled ? texts.notificationsOn : texts.notificationsOff, settings.getKeyboard());
      //     break;
      //   }
      //   case !!text.match(new RegExp(`^${keyboardTexts.otherBrands}`, 'i')): {
      //     const isEnabled = await settings.toggleNotDefaultBrandsSettings(fetcher, currentUser);

      //     await ctx.reply(isEnabled ? texts.notDefaultBrandsOn : texts.notDefaultBrandsOff, settings.getKeyboard());
      //     break;
      //   }
      //   case !!text.match(brandsRegexp): {
      //     const brandName = unformatBrandName(text.replace(` ${keyboardTexts.on}`, '').replace(` ${keyboardTexts.off}`, ''));
      //     const isEnabled = await settings.toggleBrand(brandName, fetcher, currentUser);

      //     await ctx.reply(isEnabled ? texts.getBrandOn(brandName) : texts.getBrandOff(brandName), settings.getKeyboard());
      //     break;
      //   }
      //   case !!text.match(keyboardTexts.mainMenu): {
      //     goToMainMenu(ctx);
      //     break;
      //   }
      //   default: {
      //     ctx.reply('Используйте кнопки');
      //   }
      // }
    } catch (e) {
      console.log(e);
    }
  })();
});

module.exports = {
  presenseScene
};
