/**
 * @file Build settings of TSLint.
 *
 * @author Koichi Nagaoka
 */

const funcs     = require('../utils/functions');
const settings  = require('../../config/settings');


// Watch building
funcs.watchBuilding(
  settings.sourceRoot,
  [
    'tslint -s node_modules/custom-tslint-formatters/formatters -t grouped --fix',
    `"${settings.sourceRoot}/**/*.${settings.scriptsExt}"`
  ].join(' '),
  {
    noError: true
  }
);
