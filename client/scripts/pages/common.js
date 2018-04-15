/**
 * @file ブラウザ関連処理の各ページの共通処理
 */
import * as WebFont from 'webfontloader';

// 指定されたWebフォントをロードする
WebFont.load({
  google: {
    families: ['Droid Sans'], // TODO : ここにロードするWebフォントを記述する
  },
});
