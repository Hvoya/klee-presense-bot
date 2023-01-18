const UserService = require('../services/user');

const tgUpdateLastActionDate = async (req, res, next) => {
  await next();

  const tg_user_id = req.headers['x-tg-user-id'];

  if (!tg_user_id) return;

  UserService.updateLastActionDate(tg_user_id);
};

module.exports = tgUpdateLastActionDate;
