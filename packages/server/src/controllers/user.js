const catcher = require('../api/errors');
// const tgUserAuthentication = require('../middlewares/tg-user-authentication');
const UserService = require('../services/user');
const { formatResult } = require('../api/formatResult');

// const getUserSettings = (req, res) =>
//   catcher(res)(async () => {
//     const user = res.locals.user;

//     const result = await UserService.getUserSettings(user.id);

//     return res.status(200).send(formatResult(result));
//   });

const createUser = (req, res) =>
  catcher(res)(async () => {
    const body = req.body;
    console.log(body);

    await UserService.createUser(body);

    return res.status(201).send(formatResult());
  });

// const getCurrentUser = (req, res) =>
//   catcher(res)(async () => {
//     const user = res.locals.user;

//     return res.status(200).send(formatResult(user));
//   });

// const updateUser = (req, res) =>
//   catcher(res)(async () => {
//     const body = req.body;
//     const user = res.locals.user;

//     await updateUserScheme.validate(body);

//     const data = updateUserScheme.cast(body, { stripUnknown: true });

//     await UserService.updateUser(user.id, data);

//     return res.status(200).send(formatResult());
//   });

module.exports = (app) => {
  // app.get('/users/settings', tgUserAuthentication, getUserSettings);
  // app.put('/users/settings', tgUserAuthentication, setUserSettings);
  // app.get('/users/current', tgUserAuthentication, getCurrentUser);
  app.post('/users', createUser);
  // app.put('/users', tgUserAuthentication, updateUser);
};
