/**
 * @file ESLint関連設定ファイル。
 *
 * @author Koichi Nagaoka
 */

const funcs   = require('../utils/functions');
const config  = require('../settings');


// ビルド監視処理を開始する
funcs.watchBuilding(
  `${config.appRoot}/${config.scriptsDir}`,
  `esw --fix "${config.appRoot}/${config.scriptsDir}/**/*.${config.scriptsExt}"`,
  {
    noError: true
  }
);
