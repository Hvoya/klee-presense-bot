const Markup = require('telegraf/markup');
const { formatBrandName } = require('../utils/format-brand-name');
const texts = require('../texts/keyboard');

const getBrandsKeyboard = (brands) => {
  const arrayByTuples = brands.reduce(function (r, a, i) {
    if (i % 2) {
      r[r.length - 1].push(formatBrandName(a.name));
    } else {
      r.push([formatBrandName(a.name)]);
    }
    return r;
  }, []);

  return Markup.keyboard([
    ...arrayByTuples,
    [texts.allBrands, texts.otherBrands],
    [texts.mainMenu]
  ])
    .resize()
    .extra();
};

const getSupportedKeys = (brands) => {
  const brandKeys = brands.map(brand => brand.name);
  return [
    texts.allBrands,
    texts.otherBrands,
    ...brandKeys
  ];
};

module.exports = {
  getBrandsKeyboard,
  getSupportedKeys
};
