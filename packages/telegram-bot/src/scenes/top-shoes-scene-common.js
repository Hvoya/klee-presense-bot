const { subMonths } = require('date-fns');
const { getBrands } = require('../api/get-brands');
const { getShoes } = require('../api/get-shoes');
const { getBrandsKeyboard } = require('../markup/brands-keyboard');
const { Sex } = require('../texts/sex');
const texts = require('../texts/tops');
const keyboardTexts = require('../texts/keyboard');
const { formatBrandName, unformatBrandName } = require('../utils/format-brand-name');
const { errorHandler } = require('../utils/error-handler');
const { getFetcher } = require('../utils/fetcher');
const { goToMainMenu } = require('./helpers');
const { analyticsHandler, ANALYTICS_EVENTS } = require('../utils/analytics-handler');
const { addEmptyParam } = require('../utils/addEmptyParam');

const reply = async (ctx, shoes) => {
  const filteredShoes = shoes.filter(shoes => shoes.rating);

  for (const [index, shoe] of filteredShoes.entries()) {
    await ctx.telegram.sendPhoto(
      ctx.chat.id, await addEmptyParam(shoe.img_src),
      { caption: texts.getTopElementCaption(index + 1, shoe) }
    );
  }

  for (let i = filteredShoes.length; i < 10; i++) {
    await ctx.reply(texts.getMissingTopElement(i + 1));
  }
};

const topSceneEnterHandler = async (ctx) => {
  try {
    const fetcher = getFetcher(ctx);
    const brands = await getBrands(fetcher);

    const defaultBrands = brands.filter(brand => brand.is_default_brand);

    await ctx.reply(texts.whichTop, getBrandsKeyboard(defaultBrands));
  } catch (e) {
    errorHandler(ctx, e);
  }
};

const initTopSceneListener = (scene, isMonthTop) => {
  scene.on('text', (ctx) => {
    (async () => {
      try {
        const fetcher = getFetcher(ctx);
        const currentUser = ctx.update.message.from;

        const brands = await getBrands(fetcher);
        const defaultBrands = brands.filter(brand => brand.is_default_brand);
        const defaultBrandNames = defaultBrands.map(brand => formatBrandName(brand.name));
        const notDefaultBrands = brands.filter(brand => !brand.is_default_brand);

        const text = ctx.message.text;

        const dateFilter = isMonthTop
          ? {
              rated_at_date_from: subMonths(new Date(), 1),
              rated_at_date_to: new Date()
            }
          : {};

        const brandsRegexp = new RegExp(`^(${defaultBrandNames.join('|')})`, 'i');

        const eventName = isMonthTop ? ANALYTICS_EVENTS.VIEW_MONTH_TOP_LIST : ANALYTICS_EVENTS.VIEW_ALL_TIME_TOP_LIST;

        switch (true) {
          case !!text.match(brandsRegexp): {
            const brandName = unformatBrandName(text);
            const brand = brands.find(brand => brand.name === brandName);

            const payload = {
              limit: 10,
              order_by: 'rating',
              sort_order: 'desc',
              brands: [brand.id],
              ...dateFilter
            };

            const shoes = await getShoes(fetcher, payload);

            analyticsHandler(currentUser.id, eventName, {
              language: currentUser.language_code
            }, {
              brandId: brand.id,
              brandName
            });

            await reply(ctx, shoes);
            break;
          }
          case !!text.match(new RegExp(`^(${keyboardTexts.allBrands})`, 'i')): {
            const payload = {
              limit: 10,
              order_by: 'rating',
              sort_order: 'desc',
              ...dateFilter
            };

            const shoes = await getShoes(fetcher, payload);

            analyticsHandler(currentUser.id, eventName, {
              language: currentUser.language_code
            }, {
              brandId: -2,
              brandName: 'ALL_BRANDS'
            });

            await reply(ctx, shoes);
            break;
          }
          case !!text.match(new RegExp(`^(${keyboardTexts.otherBrands})`, 'i')): {
            const notDefaultBrandIds = notDefaultBrands.map(brand => brand.id);

            const payload = {
              limit: 10,
              order_by: 'rating',
              sort_order: 'desc',
              brands: notDefaultBrandIds,
              ...dateFilter
            };

            const shoes = await getShoes(fetcher, payload);

            analyticsHandler(currentUser.id, eventName, {
              language: currentUser.language_code
            }, {
              brandId: -1,
              brandName: 'OTHERS_BRANDS'
            });

            await reply(ctx, shoes);
            break;
          }
          case !!text.match(new RegExp(`^(${keyboardTexts.mainMenu})`, 'i')): {
            await goToMainMenu(ctx);
            break;
          }
          default: {
            ctx.reply(keyboardTexts.useKeyaboard);
          }
        }
      } catch (e) {
        errorHandler(ctx, e);
      }
    })();
  });
};

module.exports = {
  initTopSceneListener,
  topSceneEnterHandler
};
