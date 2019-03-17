/**
 * @file Build settings of ESLint.
 *
 * @author Koichi Nagaoka
 */

const funcs     = require('../utils/functions');
const settings  = require('../../config/settings');


// Watch building
funcs.watchBuilding(
  settings.clientRoot,
  [
    'eslint',
    '--fix --cache',
    `"${settings.clientRoot}/**/*.${settings.scriptsExt}"`
  ].join(' '),
  {
    noError: true
  }
);
