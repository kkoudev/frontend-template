/**
 * @file Build settings of pug.
 *
 * @author Koichi Nagaoka
 */

const funcs     = require('../utils/functions');
const settings  = require('../../config/settings');
const fs        = require('fs-extra');
const pug       = require('pug');


// Watch building
funcs.watchBuildingDiff(
  `${settings.clientRoot}/${settings.viewsDir}`,
  `${settings.clientRoot}/${settings.viewsRootDir}`,
  settings.documentRoot,
  '**/!(_)*.pug',
  (targetFile, outputDir, relativeFilePath, fileExt, resolve, reject) => {

    const funcPug = pug.compileFile(targetFile, settings.pugOptions);

    // creates parent directories
    fs.mkdirs(outputDir).then(() => {

      // creates write stream
      const writeStream = fs.createWriteStream(
        `${outputDir}/${relativeFilePath}.html`,
        {
          encoding: 'UTF-8'
        }
      );

      // define stream events
      writeStream.on('finish', () => resolve())
        .on('error', (error) => reject(error));

      // write html string
      writeStream.write(funcPug(settings.pugOptions.locals));
      writeStream.end();

    });

  }
);
