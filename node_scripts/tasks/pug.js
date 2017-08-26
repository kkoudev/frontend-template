/**
 * @file pug関連設定ファイル。
 *
 * @author Koichi Nagaoka
 */

const funcs   = require('../utils/functions');
const config  = require('../settings');


// ビルド監視処理を開始する
funcs.watchBuilding(
  `${config.appRoot}/${config.viewsDir}`,
  [
    `pug ${config.appRoot}/${config.viewsRootDir}/ -o ${config.documentRoot}`,
    `-P -O '${JSON.stringify(config.pugVariables)}'`
  ].join(' '),
  {
    noError: true
  }
);
