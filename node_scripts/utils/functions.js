/**
 * @file Common functions for task processing.
 *
 * @author Koichi Nagaoka
 */

const path          = require('path');
const glob          = require('glob');
const chokidar      = require('chokidar');
const childProcess  = require('child_process');
const chalk         = require('chalk');
const notifier      = require('node-notifier');
const moment        = require('moment');
const log           = console.log;    // eslint-disable-line no-console

// Environment variables for execution commands.
const usingEnv = Object.assign({}, process.env, {
  FORCE_COLOR: true
});

// Default task name.
const defaultTaskName = path.basename(process.argv[1], '.js');

// Console time format.
const formatConsoleTime = 'HH:mm:ss';

// Error notification base settings.
const errorNotifyOptions = {
  title: 'Error Occurred',
  message: 'Please confirm console error messages.',
  sound: 'Basso',
};


/**
 * Output error log and notify error.
 *
 * @param {string} error error message.
 */
const logError = (error) => {

  // notify specified error.
  notifier.notify(errorNotifyOptions);

  // output error log.
  console.error(error); // eslint-disable-line no-console

};

/**
 * Execute specified commands.
 *
 * @param {string}    command     command strings
 * @param {object}    [options]   options for execution.
 * @param {function}  [callback]  callback function.
 */
exports.exec = (command, options, callback) => {

  // 指定されたコマンドを実行する
  childProcess.exec(
    `${command}`,
    {
      env: usingEnv
    },
    (error, stdout, stderr) => {

      (!options || !options.noError && error) && logError(error);
      (!options || !options.noStdout && stdout) && log(stdout);
      (!options || !options.noStderr && stderr) && logError(stderr);
      callback && callback();

    });

};


/**
 * Watch target file or directory.
 *
 * @param {string}    target      target file or directory.
 * @param {function}  [callback]  callback function for updating file.
 */
exports.watch = (target, callback) => {

  const watcher = chokidar.watch(
    target,
    {
      persistent: true
    })
    .on('ready', () => {

      watcher.on('change', (file) => {

        callback && callback(file);

      });

    });

};


/**
 * Output beginning discription.
 *
 * @param {string} [taskName] Executing task name
 * @returns {object} execution beginning context.
 */
exports.consoleBegin = (taskName) => {

  const beginTime     = new Date();
  const usingTaskName = taskName || defaultTaskName;

  log(
    `[${chalk.gray(moment(beginTime).format(formatConsoleTime))}]`,
    `Beginning '${chalk.cyan(usingTaskName)}'....`
  );

  return {
    taskName: usingTaskName,
    beginTime,
  };

};


/**
 * Output finishing discription.
 *
 * @param {object} context execution beginning context.
 */
exports.consoleFinish = (context) => {

  const finishedTime  = new Date();
  const processMillis = finishedTime - context.beginTime;

  log(
    `[${chalk.gray(moment(finishedTime).format(formatConsoleTime))}]`,
    `Finished '${chalk.cyan(context.taskName)}' after ${chalk.magenta(processMillis)} ms`
  );

};


/**
 * Executes building and watching.
 *
 * Executes building and watching if set environment variable of "NODE_WATCH" is true.
 * Otherwise build only.
 *
 * @param {string}              watchTarget   target file or directory.
 * @param {(string|function)}   buildCommand  Build commands or function. In function case, it must returns Promise.
 * @param {object}              [options]     Options for execution.
 */
exports.watchBuilding = (watchTarget, buildCommand, options) => {

  if (typeof buildCommand === 'function') {

    const executeWrapper = (file) => {

      const beginContext = exports.consoleBegin();

      buildCommand(file, options).then(() => {

        exports.consoleFinish(beginContext);

      }).catch((error) => {

        (!options || !options.noError && error) && logError(error);

        exports.consoleFinish(beginContext);

      });

    };

    // Executes build processing
    executeWrapper();

    // Watch target file or directory
    process.env.NODE_WATCH && exports.watch(watchTarget, executeWrapper);

  } else {

    const executeWrapper = () => {

      const beginContext = exports.consoleBegin();

      exports.exec(buildCommand, options, () => {

        exports.consoleFinish(beginContext);

      });

    };

    // Executes build processing
    executeWrapper();

    // Watch target file or directory
    process.env.NODE_WATCH && exports.watch(watchTarget, executeWrapper);

  }

};


/**
 * Executes differential building and watching.
 *
 * Executes building and watching if set environment variable of "NODE_WATCH" is true.
 * Otherwise build only.
 *
 * @param {string}      watchTarget   target file or directory.
 * @param {string}      srcDirPath    target source directory path.
 * @param {string}      destDirPath   target destination directory path.
 * @param {string}      pattern       target file pattern.
 * @param {function}    buildCommand  build processing function.
 */
exports.watchBuildingDiff = (watchTarget, srcDirPath, destDirPath, pattern, buildCommand) => {

  /**
   * Copy materials files.
   *
   * @param {string} file add or change file path
   */
  const buildProcessing = (file) => {

    // target files
    const watchTargetFiles = glob.sync(`${srcDirPath}/${pattern}`);

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

          const workFilePath    = `${targetFile.substring(srcDirPath.length + 1)}`;
          const targetDirPath   = path.dirname(`${destDirPath}/${workFilePath}`);
          const targetFileExt   = path.extname(workFilePath);
          const targetFilePath  = path.basename(workFilePath, targetFileExt);

          // Execute buiding command
          buildCommand(
            targetFile,
            targetDirPath,
            targetFilePath,
            targetFileExt,
            compileResolve,
            compileReject
          );

        }));

      });

      // Execute all compiling pug files
      Promise.all(executeCompilePromises)
        .then(() => resolve())
        .catch((error) => reject(error));

    });

  };


  // Watch building
  exports.watchBuilding(
    watchTarget,
    buildProcessing
  );

};
