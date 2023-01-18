'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Presense extends Model {}

  Presense.init({
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    probability: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Presense'
  });
  return Presense;
};
