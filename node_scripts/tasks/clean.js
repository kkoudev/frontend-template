/**
 * @file Clean document root directory.
 *
 * @author Koichi Nagaoka
 */

const fs        = require('fs-extra');
const settings  = require('../../config/settings');

// Removes document root dir.
fs.emptyDirSync(settings.documentRoot);
fs.existsSync(settings.eslintCachePath) && fs.unlinkSync(settings.eslintCachePath);
