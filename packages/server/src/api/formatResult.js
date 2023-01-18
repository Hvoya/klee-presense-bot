const Status = require('../constants/status');

const formatResult = (data) => ({
  status: Status.success,
  data: data || null
});

module.exports = {
  formatResult
};
