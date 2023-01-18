// telegraf bug fix
const fetch = require('node-fetch');

async function addEmptyParam (url) {
  const result = await fetch('https://' + url, { method: 'HEAD' });

  const imgSrc = result.status >= 400 ? 'test-project-bucket.hb.bizmrg.com/not-found-final2.png' : url;

  return imgSrc + '?0';
}

module.exports = {
  addEmptyParam
};
