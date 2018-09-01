/**
 * @file Build settings of PostCSS.
 *
 * @author Koichi Nagaoka
 */

const funcs         = require('../utils/functions');
const settings      = require('../../config/settings');
const fs            = require('fs-extra');
const postcss       = require('postcss');
const postcssConfig = require('../postcss.config');


// Watch building
funcs.watchBuildingDiff(
  `${settings.clientRoot}/${settings.stylesDir}`,
  `${settings.clientRoot}/${settings.stylesDir}/${settings.bundlesDir}`,
  `${settings.documentRoot}/${settings.stylesDir}`,
  `**/!(_)*.${settings.stylesExt}`,
  false,
  (targetFile, outputDir, relativeFilePath, fileExt, resolve, reject) => {

    const readBuffers         = [];
    let readBufferTotalLength = 0;

    // using PostCSS options
    const usingOptions        = {
      from: targetFile,
      to: `${outputDir}/${relativeFilePath}.css`,
      parser: postcssConfig.parser,
      map: postcssConfig.map
    };

    // creates result css file
    const processCSS = (result) => {

      // create write compiled postcss file
      const writeStream = fs.createWriteStream(usingOptions.to);

      // define stream events
      writeStream.on('finish', () => resolve())
        .on('error', (errorWrite) => reject(errorWrite));

      // write compiled postcss file
      writeStream.write(result.css);
      writeStream.end();

    };

    // creates read postcss file stream
    const readStream = fs.createReadStream(usingOptions.from);

    // define stream events
    readStream.on('data', (chunk) => {

      readBuffers.push(chunk);
      readBufferTotalLength += chunk.length;

    }).on('end', () => {

      // compile postcss file
      postcss(postcssConfig.plugins).process(
        Buffer.concat(readBuffers, readBufferTotalLength).toString(),
        usingOptions
      ).then((result) => {

        // creates parent directories
        fs.mkdirs(outputDir, (mkdirError) => {

          // if error occurreded, returns mkdir error
          mkdirError && reject(mkdirError);

          // output css file
          processCSS(result);

        });

      }).catch((error) => reject(error));

    }).on('error', (error) => reject(error));

  }
);
