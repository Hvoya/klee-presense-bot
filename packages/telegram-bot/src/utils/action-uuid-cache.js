const NodeCache = require('node-cache');
const actionUUIDCache = new NodeCache({ stdTTL: 120, checkperiod: 30 });

module.exports = {
  actionUUIDCache
};
