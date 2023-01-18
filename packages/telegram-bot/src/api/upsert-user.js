const { apiCatcher } = require('../utils/api-catcher');

const upsertUser = apiCatcher((fetcher, body) => fetcher('/users', { body, method: 'POST' }));

module.exports = {
  upsertUser
};
