const catcher = require('../api/errors');
const { formatResult } = require('../api/formatResult');
const PresenseService = require('../services/presense');
const tgUserAuthentication = require('../middlewares/tg-user-authentication');

const getPresense = (req, res) =>
  catcher(res)(async () => {
    const data = await PresenseService.getPresense();

    return res.status(201).send(formatResult(data));
  });

const createPresence = (req, res) =>
  catcher(res)(async () => {
    const body = req.body;
    const user = res.locals.user;

    await PresenseService.createPresence(body, user.tg_user_id);

    return res.status(201).send(formatResult());
  });

const deletePresence = (_, res) =>
  catcher(res)(async () => {
    const user = res.locals.user;

    await PresenseService.deletePresence(user.tg_user_id);

    return res.status(201).send(formatResult());
  });

module.exports = (app) => {
  app.get('/presense', getPresense);
  app.post('/presense', tgUserAuthentication, createPresence);
  app.delete('/presense', tgUserAuthentication, deletePresence);
};
