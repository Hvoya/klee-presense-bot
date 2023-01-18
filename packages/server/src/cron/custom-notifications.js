const db = require('../../models');
const { Telegram } = require('telegraf');
const CronJob = require('cron').CronJob;
const { Op } = require('sequelize');
const { limiter } = require('./limiter');

const initCustomNotificationCron = async () => {
  const telegram = new Telegram(process.env.BOT_TOKEN);

  const job = new CronJob(
    '*/1 * * * *',
    async () => {
      try {
        const result = await db.CustomNotification.findAll({
          where: {
            is_sent: false,
            send_at: {
              [Op.lt]: new Date()
            }
          }
        });

        const notifications = result.map(node => node.dataValues);

        const users = await db.User.findAll();

        notifications.forEach(async (notification) => {
          const results = await Promise.allSettled(users.map((user) => limiter.schedule(() => telegram.sendMessage(user.dataValues.tg_chat_id, notification.text))));
          results.forEach((result) => {
            if (result.status === 'rejected') {
              console.error(result);
            }
          })
          await db.CustomNotification.update(
              {
                is_sent: true
              },
              {
                where: {
                  id: notification.id
                }
              }
          );
        });
      } catch (e) {
        console.log(e);
      }
    }
  );

  job.start();
};

module.exports = {
  initCustomNotificationCron
};
