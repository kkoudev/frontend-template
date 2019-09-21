/**
 * @file Copy htdocs files.
 *
 * @author Koichi Nagaoka
 */

const fs          = require('fs-extra');
const funcs       = require('../utils/functions');
const settings    = require('../../config/settings');


// Watch building
funcs.watchBuildingDiff(
  `${settings.clientRoot}/${settings.htdocsDir}`,
  `${settings.clientRoot}/${settings.htdocsDir}`,
  `${settings.documentRoot}`,
  '**/*',
  {
    dot: true,
  },
  (targetFile, outputDir, relativeFilePath, fileExt, resolve, reject) => {

    const processCopy = () => {

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

    };

    // creates parent directories
    fs.mkdirs(outputDir, (mkdirError) => {

      // if error occurreded, returns mkdir error
      mkdirError && reject(mkdirError);

      // Get file stat
      fs.stat(targetFile)
        .then((fileStat) => {

          // Is directory?
          if (fileStat.isDirectory()) {

            // noop
            resolve();
            return;

          }

          // Execute copy file.
          processCopy();

        })
        .catch((error) => reject(error));

    });

  }
);
