/**
 * @file ドキュメントルートファイル削除。
 *
 * @author Koichi Nagaoka
 */

const fs      = require('fs-extra');
const config  = require('../settings');

// Removes document root dir.
fs.removeSync(config.documentRoot);
