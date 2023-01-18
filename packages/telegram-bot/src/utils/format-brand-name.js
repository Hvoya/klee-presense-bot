const _ = require('lodash');

const formatBrandName = (string) => string.split('_').map(_.capitalize).join(' ');
const unformatBrandName = (string) => string.toLowerCase().replace(' ', '_');

const prependBrandName = (string, brandName) => {
  const reg = new RegExp(`${formatBrandName(brandName)}`, 'ig');

  if (string.match(reg)) return string.replace(reg, formatBrandName(brandName));
  else return `${formatBrandName(brandName)} ${string}`;
};

module.exports = {
  formatBrandName,
  unformatBrandName,
  prependBrandName
};
