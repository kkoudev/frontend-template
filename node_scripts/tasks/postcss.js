/**
 * @file Build settings of PostCSS.
 *
 * @author Koichi Nagaoka
 */

const funcs         = require('../utils/functions');
const settings      = require('../../config/settings');
const fs            = require('fs-extra');
const glob          = require('glob');
const path          = require('path');
const postcss       = require('postcss');
const postcssConfig = require('../postcss.config');

const stylesSrcDirPath   = `${settings.appRoot}/${settings.stylesDir}`;
const stylesDestDirPath  = `${settings.documentRoot}/${settings.stylesDir}`;

// target files
const watchTargetFiles = glob.sync(`${stylesSrcDirPath}/**/!(_)*.${settings.stylesExt}`);

/**
 * build PostCSS files.
 *
 * @param {string} file add or change file path
 */
const buildProcessing = (file) => {

  return new Promise((resolve, reject) => {

    const executeCompilePromises = [];
    const targetFiles            = !file || watchTargetFiles.indexOf(file) === -1 ? watchTargetFiles : [file];

    // empty files?
    if (targetFiles.length === 0) {

      // returns successful
      resolve();
      return;

    }

    // for each target files
    targetFiles.forEach((targetFile) => {

      // creates promise for compiling pug file
      executeCompilePromises.push(new Promise((compileResolve, compileReject) => {

        const workFilePath        = `${targetFile.substring(stylesSrcDirPath.length + 1)}`;
        const targetFileExt       = path.extname(workFilePath);
        const targetFilePath      = path.basename(workFilePath, targetFileExt);
        const readBuffers         = [];
        let readBufferTotalLength = 0;

        // using PostCSS options
        const usingOptions        = {
          from: targetFile,
          to: `${stylesDestDirPath}/${targetFilePath}.css`,
          parser: postcssConfig.parser,
          map: postcssConfig.map
        };

        // creates result css file
        const processCSS = (result) => {

          // create write compiled postcss file
          const writeStream = fs.createWriteStream(usingOptions.to);

          // define stream events
          writeStream.on('finish', () => compileResolve())
            .on('error', (errorWrite) => compileReject(errorWrite));

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
            fs.mkdirs(stylesDestDirPath, (mkdirError) => {

              // if error occurreded, returns mkdir error
              mkdirError && compileReject(mkdirError);

              // output css file
              processCSS(result);

            });

          }).catch((error) => compileReject(error));

        }).on('error', (error) => compileReject(error));

      }));

    });

    // Execute all compiling pug files
    Promise.all(executeCompilePromises)
      .then(() => resolve())
      .catch((error) => reject(error));

  });

};

// ビルド監視処理を開始する
funcs.watchBuilding(
  `${settings.appRoot}/${settings.stylesDir}`,
  buildProcessing,
  {
    noError: true
  }
);
