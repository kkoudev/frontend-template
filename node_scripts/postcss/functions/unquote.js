/**
 * @file unquote function.
 */

const unquote = require('unquote');

/**
 * Remove quote characters.
 *
 * @param {string} str target string
 * @return {string} converted string
 */
module.exports = (str) => {

  return unquote(str);

};
