const Status = require('../constants/status');

const formatError = (e) => ({
  status: Status.error,
  reason: e.message
});

const catcher = (res) => async (f) => {
  try {
    return await f();
  } catch (e) {
    console.log(e);
    res.send(formatError(e));
  }
};

module.exports = catcher;
