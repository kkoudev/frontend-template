/**
 * @file サーバ設定ファイル。
 *
 * @author Koichi Nagaoka
 */

const browserSync = require('browser-sync');
const config      = require('../settings');

// サーバを起動する
browserSync({

  // サーバ情報
  server: {

    // ドキュメントルート
    baseDir: [
      `${config.documentRoot}`,
    ],

  },

  // 監視対象ファイル
  files: [
    `${config.documentRoot}/**/*.css`,
    `${config.documentRoot}/**/*.js`,
    `${config.documentRoot}/**/*.{${config.imagesExts.join(',')}}`,
    `${config.documentRoot}/**/*.html`,
  ],

  // デフォルト起動時の使用ポート番号
  port: 8000,

  // HTTPSサポート可否
  https: false,

  // 通知表示をオフにする
  notify: false,

  // 自動でブラウザを開かない
  open: false,

});
