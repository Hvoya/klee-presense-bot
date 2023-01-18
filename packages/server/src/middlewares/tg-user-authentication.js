const UserService = require('../services/user');

const tgUserAuthentication = async (req, res, next) => {
  try {
    const tg_user_id = req.headers['x-tg-user-id'];

    if (!tg_user_id) {
      return res.status(401).send();
    }

    const user = await UserService.getUser(tg_user_id);
    console.log(tg_user_id);
    if (!user) {
      return res.status(401).send();
    }

    res.locals.user = user;

    next();
  } catch (e) {
    console.log(e);
  }
};

module.exports = tgUserAuthentication;
