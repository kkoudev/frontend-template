/**
 * @file rpath function.
 */

/**
 * Specify display resolution file path.
 *
 * @param {string} filePath file path
 * @param {number} ratio display ratio
 * @return {string} converted file path
 */
module.exports = (filePath, ratio) => {

  // display ratio equals one?
  if (ratio <= 1) {

    return filePath;

  }

  const dotIndex = filePath.lastIndexOf('.');

  // No extension
  if (dotIndex === -1) {

    return filePath;

  }

  const filePathNoExt = filePath.substring(0, dotIndex);
  const fileExtension = filePath.substring(dotIndex);

  return `${filePathNoExt}@${ratio}x${fileExtension}`;

};
