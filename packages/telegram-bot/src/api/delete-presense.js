const { apiCatcher } = require('../utils/api-catcher');

const deletePresense = apiCatcher((fetcher, body) => fetcher('/presense', { body, method: 'DELETE' }));

module.exports = {
  deletePresense
};
