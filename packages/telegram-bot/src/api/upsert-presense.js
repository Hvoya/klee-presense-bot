const { apiCatcher } = require('../utils/api-catcher');

const upsertPresense = apiCatcher((fetcher, body) => fetcher('/presense', { body, method: 'POST' }));

module.exports = {
  upsertPresense
};
