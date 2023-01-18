const initUser = require('./user');
const initSpace = require('./space');
const initPresence = require('./presence');

const Sequelize = require('sequelize');
const sequelize = require('../db-connection');

const User = initUser(sequelize, Sequelize.DataTypes);
const Space = initSpace(sequelize, Sequelize.DataTypes);
const Presense = initPresence(sequelize, Sequelize.DataTypes);

Space.hasMany(Presense);
User.hasMany(Presense);
Presense.belongsTo(User);

module.exports = {
  User,
  Space,
  Presense,
  sequelize
};
