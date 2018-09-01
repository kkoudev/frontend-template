/**
 * @file Build settings of images.
 *
 * @author Koichi Nagaoka
 */

const fs             = require('fs-extra');
const compressImages = require('compress-images');

const funcs     = require('../utils/functions');
const settings  = require('../../config/settings');

// Enable compress images?
if (settings.isCompressImage) {

  funcs.watchBuilding(
    `${settings.clientRoot}/${settings.imagesDir}`,
    () => {

      return new Promise((resolve, reject) => {

        // Compress images
        compressImages(
          `${settings.clientRoot}/${settings.imagesDir}/**/*.{${settings.imagesExts.join(',')}}`,
          `${settings.documentRoot}/${settings.imagesDir}/`,
          {
            compress_force: false,
            statistic: true,
            autoupdate: true
          },
          {
            ignore: `${settings.clientRoot}/${settings.imagesDir}/${settings.spritesDir}/**/*`
          },
          settings.compressImagesOptions.jpg,
          settings.compressImagesOptions.png,
          settings.compressImagesOptions.svg,
          settings.compressImagesOptions.gif,
          (error) => {

            if (error) {

              reject(error);

            } else {

              resolve();

            }

          }
        );

      });

    }
  );

} else {

  // Watch building
  funcs.watchBuildingDiff(
    `${settings.clientRoot}/${settings.imagesDir}`,
    `${settings.clientRoot}/${settings.imagesDir}`,
    `${settings.documentRoot}/${settings.imagesDir}`,
    `**/*.{${settings.imagesExts.join(',')}}`,
    {
      ignore: `${settings.clientRoot}/${settings.imagesDir}/${settings.spritesDir}/**/*`
    },
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

}
