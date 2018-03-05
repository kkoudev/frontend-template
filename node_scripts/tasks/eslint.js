/**
 * @file Build settings of ESLint.
 *
 * @author Koichi Nagaoka
 */

const funcs     = require('../utils/functions');
const settings  = require('../../config/settings');


// Watch building
funcs.watchBuilding(
  `${settings.appRoot}/${settings.scriptsDir}`,
  `esw --fix "${settings.appRoot}/${settings.scriptsDir}/**/*.${settings.scriptsExt}"`,
  {
    noError: true
  }
);
