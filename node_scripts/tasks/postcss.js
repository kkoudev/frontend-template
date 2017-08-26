/**
 * @file PostCSS関連設定ファイル。
 *
 * @author Koichi Nagaoka
 */

const funcs   = require('../utils/functions');
const config  = require('../settings');


const stylesSrcDirPath   = `${config.appRoot}/${config.stylesDir}`;
const stylesDestDirPath  = `${config.documentRoot}/${config.stylesDir}`;

// ビルド監視処理を開始する
funcs.watchBuilding(
  `${config.appRoot}/${config.stylesDir}`,
  [
    `postcss "${stylesSrcDirPath}/**/!(_)*.sss"`,
    `-c ${config.scriptsRoot}/postcss.config.js`,
    `-d ${stylesDestDirPath}`,
    `-b ${stylesSrcDirPath}/${config.pagesDir}`,
    '-x css --fix',
  ].join(' '),
  {
    noError: true
  }
);
