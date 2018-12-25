/**
 * @file ブラウザ関連処理の各ページの共通処理
 */
import 'ts-polyfill/lib/es2015-core';
import 'ts-polyfill/lib/es2015-promise';
import 'ts-polyfill/lib/es2015-collection';
import 'ts-polyfill/lib/es2016-array-include';
import 'ts-polyfill/lib/es2017-string';
import 'ts-polyfill/lib/es2017-object';
import 'ts-polyfill/lib/es2018-promise';
import WebFont from 'webfontloader';

// 指定されたWebフォントをロードする
WebFont.load({
  google: {
    families: ['Droid Sans'], // TODO : ここにロードするWebフォントを記述する
  },
});
