/**
 * @file タスク設定で利用する共通関数定義
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
const logError      = console.error;  // eslint-disable-line no-console

// コマンド実行で利用する環境変数を定義する
const usingEnv = Object.assign({}, process.env, {
  FORCE_COLOR: true
});

// デフォルトタスク名
const defaultTaskName = path.basename(process.argv[1], '.js');

// コンソール時間フォーマット
const formatConsoleTime = 'HH:mm:ss';

// エラー通知ベース設定
const errorNotifyOptions = {
  title: 'Error Occurred',
  message: 'エラーが発生しました。コンソールの内容を確認してください',
  sound: 'Basso',
};


/**
 * 指定されたコマンドを実行する。
 *
 * @param {string}    command     コマンド文字列
 * @param {object}    [options]   実行オプション
 * @param {function}  [callback]  コールバック関数
 */
exports.exec = (command, options, callback) => {

  // 指定されたコマンドを実行する
  childProcess.exec(
    `${command}`,
    {
      env: usingEnv
    },
    (error, stdout, stderr) => {

      // エラーがある場合
      if (error) {

        // エラー内容を通知する
        notifier.notify(errorNotifyOptions);

      }

      (!options || !options.noError && error) && logError(error);
      (!options || !options.noStdout && stdout) && log(stdout);
      (!options || !options.noStderr && stderr) && logError(stderr);
      callback && callback();

    });

};


/**
 * 指定されたターゲットを変更監視対象とする。
 *
 * @param {string}    target      監視対象ファイルまたはディレクトリ
 * @param {function}  [callback]  監視追加変更時のコールバック関数
 */
exports.watch = (target, callback) => {

  const watcher = chokidar.watch(
    target,
    {
      persistent: true
    })
    .on('ready', () => {

      // 更新のイベント登録
      // (追加のイベント発生時に更新イベントも発生するので更新イベントだけでよい)
      watcher.on('change', (file) => {

        callback && callback(file);

      });

    });

};


/**
 * 処理開始のコンソール文字列を出力する
 *
 * @param {string} [taskName] 実行タスク名
 * @returns {object} 実行開始コンテキスト
 */
exports.consoleBegin = (taskName) => {

  const beginTime     = new Date();                   // 開始日時
  const usingTaskName = taskName || defaultTaskName;  // 実行タスク名

  // 実行開始情報をコンソールへ出力する
  log(
    `[${chalk.gray(moment(beginTime).format(formatConsoleTime))}]`,
    `Beginning '${chalk.cyan(usingTaskName)}'....`
  );

  // 実行開始情報を返す
  return {
    taskName: usingTaskName,
    beginTime,
  };

};


/**
 * 処理終了のコンソール文字列を出力する。
 *
 * @param {object} context 実行開始コンテキスト
 */
exports.consoleFinish = (context) => {

  const finishedTime  = new Date();                       // 処理終了時間
  const processMillis = finishedTime - context.beginTime; // 処理時間(ms)

  // 実行終了情報をコンソールへ出力する
  log(
    `[${chalk.gray(moment(finishedTime).format(formatConsoleTime))}]`,
    `Finished '${chalk.cyan(context.taskName)}' after ${chalk.magenta(processMillis)} ms`
  );

};


/**
 * ビルド処理と監視処理を行う。
 *
 * 環境変数の NODE_WATCH が true の場合にはビルドと監視処理を行い、
 * それ以外の場合はビルドのみを行う。
 *
 * @param {string}              watchTarget   監視対象ファイルまたはディレクトリ
 * @param {(string|function)}   buildCommand  ビルドコマンドまたは処理関数。処理関数の場合は Promise を返却すること
 * @param {object}              [options]     実行オプション
 */
exports.watchBuilding = (watchTarget, buildCommand, options) => {

  if (typeof buildCommand === 'function') {

    const executeWrapper = (file) => {

      const beginContext = exports.consoleBegin();

      // ビルド処理を実行する
      buildCommand(file, options).then(() => {

        exports.consoleFinish(beginContext);

      }).catch((error) => {

        (!options || !options.noError && error) && logError(error);

        exports.consoleFinish(beginContext);

      });

    };

    // ビルド処理を実行する
    executeWrapper();

    // 監視処理が有効な場合は監視処理を実行する
    process.env.NODE_WATCH && exports.watch(watchTarget, executeWrapper);

  } else {

    const executeWrapper = () => {

      const beginContext = exports.consoleBegin();

      // ビルド処理を実行する
      exports.exec(buildCommand, options, () => {

        exports.consoleFinish(beginContext);

      });

    };

    // ビルド処理を実行する
    executeWrapper();

    // 監視処理が有効な場合は監視処理を実行する
    process.env.NODE_WATCH && exports.watch(watchTarget, executeWrapper);

  }

};


/**
 * 差分ビルド処理と監視処理を行う。
 *
 * 環境変数の NODE_WATCH が true の場合にはビルドと監視処理を行い、
 * それ以外の場合はビルドのみを行う。
 *
 * @param {string}      watchTarget   監視対象ファイルまたはディレクトリ
 * @param {string}      srcDirPath    対象ソースファイルディレクトリ
 * @param {string}      destDirPath   対象出力先ディレクトリ
 * @param {string}      pattern       ビルド対象ファイルパターン
 * @param {function}    buildCommand  ビルド処理関数
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
    buildProcessing,
    {
      noError: true
    }
  );

};
