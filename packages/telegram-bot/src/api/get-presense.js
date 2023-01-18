const { apiCatcher } = require('../utils/api-catcher');

const getPresense = apiCatcher((fetcher) =>
  fetcher('/presense').then(r => r.json()));

module.exports = {
  getPresense
};
