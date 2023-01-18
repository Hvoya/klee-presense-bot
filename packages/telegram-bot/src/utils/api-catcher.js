const apiCatcher = (f) => async (...params) => {
  const result = await f(...params);
  if (result.status === 'error') {
    console.error(result);
    throw new Error('API error');
  }
  return result.data;
};

module.exports = {
  apiCatcher
};
