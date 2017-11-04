/**
 * @file pug関連設定ファイル。
 *
 * @author Koichi Nagaoka
 */

const funcs   = require('../utils/functions');
const config  = require('../settings');
const fs      = require('fs-extra');
const glob    = require('glob');
const path    = require('path');
const pug     = require('pug');

const viewsRootDirPath = `${config.appRoot}/${config.viewsRootDir}`;

// target files
const watchTargetFiles = glob.sync(`${viewsRootDirPath}/**/!(_)*.pug`);

/**
 * build pug files.
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

        const workFilePath    = `${targetFile.substring(viewsRootDirPath.length + 1)}`;
        const targetDirPath   = path.dirname(`${config.documentRoot}/${workFilePath}`);
        const targetFileExt   = path.extname(workFilePath);
        const targetFilePath  = path.basename(workFilePath, targetFileExt);
        const func            = pug.compileFile(targetFile, config.pugOptions);

        // creates parent directories
        fs.mkdirs(targetDirPath).then(() => {

          // creates write stream
          const writeStream = fs.createWriteStream(
            `${targetDirPath}/${targetFilePath}.html`,
            {
              encoding: 'UTF-8'
            }
          );

          // define stream events
          writeStream.on('finish', () => compileResolve())
            .on('error', (error) => compileReject(error));

          // write html string
          writeStream.write(func(config.pugOptions.locals));
          writeStream.end();

        });

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
  `${config.appRoot}/${config.viewsDir}`,
  buildProcessing
);
