/**
 * @file build settings.
 *
 * @author Koichi Nagaoka
 */

const path    = require('path');
const moment  = require('moment');

const isProduction        = process.env.NODE_ENV === 'production';          // 本番環境設定かどうか
const isStyleGuideEnabled = process.env.STYLE_GUIDE === 'true';             // スタイルガイドを生成するかどうか
const projectRoot         = path.resolve(__dirname, '..');                  // プロジェクトルート
const scriptsRoot         = `${projectRoot}/node_scripts`;                  // スクリプトルート
const documentDir         = isProduction ? 'build' : '.temp';               // ドキュメントディレクトリ
const documentRoot        = `${projectRoot}/${documentDir}`;                // ドキュメントルート
const bundlesDir          = 'bundles';                                      // バンドルファイルディレクトリ
const pagesDir            = 'pages';                                        // ページディレクトリ名
const appRoot             = `${projectRoot}/app`;                           // アプリケーションソースルート
const scriptsDir          = 'scripts';                                      // スクリプト格納ディレクトリ名
const scriptsBundlesDir   = `${scriptsDir}/${pagesDir}`;                    // バンドル対象スクリプト格納ディレクトリ
const scriptsBundlesPath  = `${appRoot}/${scriptsBundlesDir}`;              // バンドル対象スクリプト格納ディレクトリパス
const scriptsExt          = 'js';                                           // スクリプト拡張子
const scriptsBundleName   = 'vendor';                                       // スクリプトライブラリバンドルファイル名
const stylesDir           = 'styles';                                       // スタイル格納ディレクトリ名
const stylesExt           = 'sss';                                          // スタイル拡張子
const viewsDir            = 'views';                                        // ビュー格納ディレクトリ名
const viewsRootDir        = `${viewsDir}/root`;                             // ビュールート格納ディレクトリ名
const imagesDir           = 'images';                                       // 画像格納ディレクトリ名
const spritesDir          = '_sprites';                                     // スプライト画像格納ディレクトリ名
const spritesPadding      = 10;                                             // スプライト画像間パディング

// 対象画像拡張子一覧
const imagesExts          = [
  'jpg',
  'jpeg',
  'png',
  'svg',
  'gif',
];

// 動作対象ブラウザ一覧
const browsers            = [
  'last 3 versions',
  'IE >= 11',
  'iOS >= 9',
  'Android >= 4',
];

// pugの設定情報
const pugOptions          = {

  pretty: true,
  locals: {

    env: {
      isProduction,
      time: moment().format('YYYYMMDDhhmm'),
      dnsPrefetches: [
        isProduction ? 'example.com' : 'localhost', // TODO : プロジェクトによってここは修正すること
        'fonts.googleapis.com'
      ],
      preconnects: [
        isProduction ? 'https://example.com' : 'http://localhost',  // TODO : プロジェクトによってここは修正すること
        'https://fonts.googleapis.com'
      ]
    }

  }

};

module.exports = {
  isProduction,
  isStyleGuideEnabled,
  projectRoot,
  scriptsRoot,
  documentDir,
  documentRoot,
  bundlesDir,
  pagesDir,
  appRoot,
  scriptsDir,
  scriptsBundlesDir,
  scriptsBundlesPath,
  scriptsExt,
  scriptsBundleName,
  stylesDir,
  stylesExt,
  viewsDir,
  viewsRootDir,
  imagesDir,
  spritesDir,
  spritesPadding,
  imagesExts,
  browsers,
  pugOptions,
};
