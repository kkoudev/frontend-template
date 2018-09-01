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
  false,
  (targetFile, outputDir, relativeFilePath, fileExt, resolve, reject) => {

    // creates parent directories
    fs.mkdirs(outputDir, (mkdirError) => {

      // if error occurreded, returns mkdir error
      mkdirError && reject(mkdirError);

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

    });

  }
);
