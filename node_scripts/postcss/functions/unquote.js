/**
 * @file unquote関数
 */

const unquote = require('unquote');

/**
 * クォート文字を削除する
 *
 * @param {string} str 対象文字列
 * @return {string} 変換後の文字列
 */
module.exports = (str) => {

  return unquote(str);

};
