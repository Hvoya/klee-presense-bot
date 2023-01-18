'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init({
    tg_user_id: {
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    tg_username: {
      type: DataTypes.STRING
    },
    tg_name: {
      type: DataTypes.STRING
    },
    tg_surname: {
      type: DataTypes.STRING
    },
    tg_chat_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    tg_created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    tg_returned_at: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};
