const db = require('../../models');
const { add, startOfDay, endOfDay } = require('date-fns');
const { Op } = require('sequelize');
const { Telegram } = require('telegraf');
const CronJob = require('cron').CronJob;
const CronTime = require('cron').CronTime;
const { limiter } = require('./limiter');
const { parseHypebeastShoes } = require('../../parsing/hypebeast/parse');
const { isAfter } = require('date-fns');
const Sex = require('../constants/sex');
const { format } = require('date-fns');
const { addEmptyParam } = require('../helpers/addEmptyParam');

const defaultSettings = {
  cronRule: '0 14 * * *',
  isEnabled: 'true',
  isDisabledForUsersRegisteredAfter: null
};

const getDropCaption = (shoes) => {
  return `${shoes.name}\nДроп ${format(shoes.release_date, 'dd.LL.yyyy')}`;
};

const getSettings = async () => {
  const settingsResult = await db.SystemSettings.findAll();
  let settings = settingsResult[0]?.settings;

  if (!settings) {
    await db.SystemSettings.create({
      settings: defaultSettings
    });

    settings = defaultSettings;
  }

  return settings;
};

const initDropsParsingCron = async () => {
  const telegram = new Telegram(process.env.BOT_TOKEN);

  const settings = await getSettings();

  const job = new CronJob(
    settings.cronRule,
    async () => {
      try {
        const newSettings = await getSettings();
        if (newSettings.cronRule !== settings.cronRule) {
          job.stop();
          job.setTime(new CronTime(newSettings.cronRule));
          job.start();
        }

        await parseHypebeastShoes();

        const users = await db.User.findAll({
          where: {
            settings_is_drops_notifications_enabled: true
          },
          include: [{
            model: db.Brand
          }]
        });

        if (newSettings.isEnabled !== 'true') return;

        for (const user of users) {
          const {
            settings_is_male_shoes_enabled,
            settings_is_female_shoes_enabled,
            tg_created_at,
            Brands
          } = user;

          if (settings.isDisabledForUsersRegisteredAfter && isAfter(new Date(tg_created_at), new Date(settings.isDisabledForUsersRegisteredAfter))) {
            return;
          }

          const disabledBrandsIds = Brands.map(brand => brand.id);

          const tomorrowDate = add(new Date(), {
            days: 1
          });

          const tomorrowDateStart = startOfDay(tomorrowDate);
          const tomorrowDateEnd = endOfDay(tomorrowDate);

          const sneakersWithTomorrowRelease = await db.Shoes.findAll({
            where: {
              release_date: {
                [Op.between]: [tomorrowDateStart, tomorrowDateEnd]
              }
            }
          });

          const mappedSneakers = sneakersWithTomorrowRelease.map(({ dataValues }) => {
            return {
              BrandId: dataValues.BrandId,
              name: dataValues.name,
              img_src: dataValues.img_src,
              source: dataValues.source,
              release_date: dataValues.release_date,
              sex: dataValues.sex,
              external_id: +dataValues.external_id
            };
          });

          mappedSneakers.forEach(async item => {
            if (disabledBrandsIds.includes(item.BrandId)) return;
            if (item.sex === Sex.m && !settings_is_male_shoes_enabled) return;
            if (item.sex === Sex.f && !settings_is_female_shoes_enabled) return;

            try {
              await limiter.schedule(() => telegram.sendPhoto(user.tg_chat_id, addEmptyParam(item.img_src), {
                caption: getDropCaption(item)
              }));
            } catch (err) {
              console.error(err);
            }
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  );

  job.start();
};

module.exports = {
  initDropsParsingCron
};
