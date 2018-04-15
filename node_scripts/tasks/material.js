/**
 * @file Copy material files.
 *
 * @author Koichi Nagaoka
 */

const fs          = require('fs-extra');
const funcs       = require('../utils/functions');
const settings    = require('../../config/settings');


// Watch building
funcs.watchBuildingDiff(
  `${settings.clientRoot}/${settings.materialsDir}`,
  `${settings.clientRoot}/${settings.materialsDir}`,
  `${settings.documentRoot}/${settings.materialsDir}`,
  '**/*',
  (targetFile, outputDir, relativeFilePath, fileExt, resolve, reject) => {

    // copy target file
    fs.copy(targetFile, `${outputDir}/${relativeFilePath}${fileExt}`, (error) => {

      // error occurred?
      if (error) {

        // returns error
        reject(error);

      } else {

        // successful
        resolve();

      }

    });

  }
);
