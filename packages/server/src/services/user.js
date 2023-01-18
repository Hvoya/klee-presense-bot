const { sequelize } = require('../../models');

class UserService {
  static async getUser (tg_user_id) {
    const result = await sequelize.models.User.findOne({
      where: {
        tg_user_id
      }
    });

    return result;
  }

  static async createUser (data) {
    await sequelize.models.User.findOrCreate({
      where: {
        tg_user_id: data.tg_user_id
      },
      defaults: {
        ...data,
        tg_created_at: new Date()
      }
    });
  }

  // static async updateUser (user_id, data) {
  //   await sequelize.models.User.update(
  //     data,
  //     {
  //       where: { id: user_id }
  //     }
  //   );
  // }
}

module.exports = UserService;
