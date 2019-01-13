/**
 * @file cssnano configurations
 */
const advancedPreset = require('cssnano-preset-advanced');
const settings = require('../../config/settings');

module.exports = advancedPreset({
  autoprefixer: {
    add: true,
    browsers: settings.browsers,
  },
});
