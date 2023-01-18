const Markup = require('telegraf/markup');
const _ = require('lodash');
const texts = require('../texts/keyboard');

const getSettingsDisplayValue = (isOn) => isOn ? texts.on : texts.off;

const getBandsKeys = (brands) => _.chunk(brands.map(brand => `${brand.name} ${getSettingsDisplayValue(brand.enabled)}`), 2);

class SettingsKeyboard {
  constructor ({
    is_male_shoes_enabled,
    is_female_shoes_enabled,
    is_drops_notifications_enabled,
    is_not_default_brands_on,
    brands
  }) {
    this.is_male_shoes_enabled = is_male_shoes_enabled;
    this.is_female_shoes_enabled = is_female_shoes_enabled;
    this.is_drops_notifications_enabled = is_drops_notifications_enabled;
    this.is_not_default_brands_on = is_not_default_brands_on;
    this.brands = brands;
  }

  getKeyboardArrays () {
    const notDefaultBrands = this.brands.filter(brand => !brand.is_default_brand);
    const defautlBrands = this.brands.filter(brand => brand.is_default_brand);

    if (notDefaultBrands.length) {
      return [
        ...(getBandsKeys(defautlBrands)),
        [
          `${texts.otherBrands} ${getSettingsDisplayValue(this.is_not_default_brands_on)}`,
          `${texts.notification} ${getSettingsDisplayValue(this.is_drops_notifications_enabled)}`
          // `${texts.male} ${getSettingsDisplayValue(this.is_male_shoes_enabled)}`
        ],
        // [
        //   `${texts.female} ${getSettingsDisplayValue(this.is_female_shoes_enabled)}`,
        //   `${texts.notification} ${getSettingsDisplayValue(this.is_drops_notifications_enabled)}`
        // ],
        [texts.mainMenu]
      ];
    } else {
      return [
        ...(getBandsKeys(defautlBrands)),
        // [
        //   // `${texts.male} ${getSettingsDisplayValue(this.is_male_shoes_enabled)}`,
        //   // `${texts.female} ${getSettingsDisplayValue(this.is_female_shoes_enabled)}`
        // ],
        [
          `${texts.notification} ${getSettingsDisplayValue(this.is_drops_notifications_enabled)}`
        ],
        [texts.mainMenu]
      ];
    }
  }

  build () {
    return Markup.keyboard(this.getKeyboardArrays())
      .resize()
      .extra();
  }
}

module.exports = {
  SettingsKeyboard
};
