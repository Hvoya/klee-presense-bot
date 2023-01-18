const fetch = require('node-fetch');

const updateOptions = (options = {}, userId) => {
  const isBodyObject = typeof options.body === 'object';

  const updatedOptions = {
    ...options,
    body: isBodyObject ? JSON.stringify(options.body) : options.body
  };

  updatedOptions.headers = {
    ...updatedOptions.headers,
    'x-secret-key': process.env.TG_SECRET_KEY,
    'x-tg-user-id': userId,
    ...(isBodyObject ? { 'Content-Type': 'application/json' } : {})
  };
  return updatedOptions;
};

const getFetcher = (ctx) => (url, options) => {
  return fetch(`${process.env.API_URL}${url}`, updateOptions(options, ctx.message.from.id));
};

module.exports = {
  getFetcher
};
