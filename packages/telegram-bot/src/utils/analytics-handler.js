const fetch = require('node-fetch');
const { getFetcher } = require('./fetcher');
const { getCurrentUser } = require('../api/get-current-user');

const ANALYTICS_EVENTS = {
  RATE_SNEAKERS: 'rate_sneakers',
  VIEW_LIKED_SNEAKERS: 'view_liked_sneakers',
  SEND_FEEDBACK: 'send_feedback',
  SIGN_UP: 'sign_up',
  SET_SETTINGS_SEX: 'set_settings_sex',
  SET_SETTINGS_BRANDS: 'set_settings_brands',
  ENABLE_DROP_NOTIFICATIONS: 'enable_drop_notifications',
  DISABLE_DROP_NOTIFICATIONS: 'disable_drop_notifications',
  VIEW_MONTH_TOP_LIST: 'view_month_top_list',
  VIEW_ALL_TIME_TOP_LIST: 'view_all_time_top_list'
};

const getGAUrl = (MEASUREMENT_ID, API_SECRET) => `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`;

const ANALYTICS_URL = 'https://api.amplitude.com/2/httpapi';

const API_KEY = process.env.ANALYTICS_API_KEY;

async function analyticsHandler (userId, actionName, userProperties = {}, eventProperties = {}) {
  try {
    const fetcher = getFetcher({
      message: {
        from: {
          id: userId
        }
      }
    });
    const { total_rated_shoes } = await getCurrentUser(fetcher);

    const updatedUserProperties = {
      ...userProperties,
      totalRatedShoes: total_rated_shoes
    };

    const GABody = {
      client_id: userId.toString(),
      user_id: userId.toString(),
      events: [{
        name: actionName,
        params: {
          ...updatedUserProperties,
          ...eventProperties,
          engagement_time_msec: '1'
        }
      }]
    };

    const body = {
      api_key: API_KEY,
      events: [{
        user_id: userId.toString(),
        event_type: actionName,
        platform: 'Telegram',
        user_properties: updatedUserProperties, // language
        event_properties: eventProperties
      }]
    };

    return await Promise.all([fetch(ANALYTICS_URL, {
      method: 'POST',
      body: JSON.stringify(body)
    }), fetch(getGAUrl(process.env.GA_MEASUREMENT_ID, process.env.GA_API_SECRET), {
      method: 'POST',
      body: JSON.stringify(GABody)
    })]);
  } catch (error) {
    console.error('Err with analytics...', error);
  }
}

module.exports = {
  analyticsHandler,
  ANALYTICS_EVENTS
};
