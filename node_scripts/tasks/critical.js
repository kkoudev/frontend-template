/**
 * @file Build settings of Critical CSS.
 *
 * @author Koichi Nagaoka
 */

const fs        = require('fs-extra');
const funcs     = require('../utils/functions');
const settings  = require('../../config/settings');
const critical  = require('critical');

// Watch building
funcs.watchBuildingDiff(
  `${settings.clientRoot}/${settings.viewsDir}`,
  `${settings.documentRoot}`,
  settings.documentRoot,
  '**/*.html',
  false,
  (targetFile, outputDir, relativeFilePath, fileExt, resolve, reject) => {

    critical.generate({
      inline: true,
      base: settings.documentRoot,
      src: targetFile,
      width: settings.criticalWidth,
      height: settings.criticalHeight,
    }, (err, html) => {

      if (err) {

        reject(err);
        return;

      }

      // creates write stream
      const writeStream = fs.createWriteStream(
        `${outputDir}/${relativeFilePath}${fileExt}`,
        {
          encoding: 'UTF-8'
        }
      );

      // define stream events
      writeStream.on('finish', () => resolve())
        .on('error', (error) => reject(error));

      // write html string
      writeStream.write(html);
      writeStream.end();

    });

  }
);
