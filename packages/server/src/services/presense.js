const { Op } = require('sequelize');
const { sequelize } = require('../../models');
const { startOfDay, addHours, addDays } = require('date-fns');

class PresenseService {
  static async getPresense () {
    const today = addHours(startOfDay(new Date()), 3);

    return await sequelize.models.Presense.findAll({
      where: {
        date: {
          [Op.gt]: today
        }
      },
      include: [{
        model: sequelize.models.User
      }]
    });
  }

  static async createPresence (data, user_id) {
    const tomorrow = addDays(addHours(startOfDay(new Date()), 3), 1);

    const dataToPate = {
      ...data,
      date: tomorrow,
      UserTgUserId: user_id
    };

    return await sequelize.models.Presense.findOrCreate({
      where: {
        date: {
          [Op.eq]: tomorrow
        },
        UserTgUserId: {
          [Op.eq]: user_id
        }
      },
      defaults: dataToPate
    });
  }

  static async deletePresence (user_id) {
    const tomorrow = addDays(addHours(startOfDay(new Date()), 3), 1);

    return await sequelize.models.Presense.destroy({
      where: {
        date: {
          [Op.eq]: tomorrow
        },
        UserTgUserId: {
          [Op.eq]: user_id
        }
      }
    });
  }
}

module.exports = PresenseService;
