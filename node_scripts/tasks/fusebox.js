/**
 * @file FuseBox関連設定ファイル。
 *
 * @author Koichi Nagaoka
 */

const funcs   = require('../utils/functions');
const glob    = require('glob');
const path    = require('path');
const config  = require('../settings');
const fsbx    = require('fuse-box');

/**
 * FuseBoxのビルド処理を行う。
 *
 */
const buildProcess = () => {

  // FuseBoxの初期設定
  const fuse = fsbx.FuseBox.init({
    homeDir: `${config.projectRoot}`,
    output: `${config.documentRoot}/${config.scriptsDir}/$name.js`,
    sourceMaps: !config.isProduction,
    hash: false,
    cache: !config.isProduction,
    plugins: [
      fsbx.EnvPlugin({
        NODE_ENV: process.env.NODE_ENV
      }),
      fsbx.BabelPlugin({
        config: {
          sourceMaps: !config.isProduction,
          presets: [
            [
              'env',
              {
                targets: {
                  browsers: config.browsers
                }
              }
            ]
          ],
          plugins: [],
        },
      }),
      fsbx.VuePlugin({
        babel: {
          config: {
            plugins: ['transform-es2015-modules-commonjs']
          }
        }
      }),
      config.isProduction && fsbx.UglifyJSPlugin(),
    ]
  });

  const bundles     = []; // バンドル情報一覧
  const fuseBundles = []; // FuseBoxバンドル情報一覧

  // バンドルファイル分処理を繰り返す
  glob.sync(`${config.scriptsBundlesPath}/**/*.${config.scriptsExt}`).forEach((file) => {

    const bundlePath    = file.substring(config.scriptsBundlesPath.length + 1);
    const projectPath   = file.substring(config.projectRoot.length + 1);

    // バンドルファイルパス一覧へ追加する
    bundles.push({
      name: `${path.dirname(bundlePath)}/${path.basename(bundlePath, `.${config.scriptsExt}`)}`,
      projectPath
    });

  });

  // バンドル構築対象を作成する
  const bundleVendorTargets = bundles.reduce((previous, current) => {
    return previous ? `${previous} + ${current.projectPath}` : current.projectPath;
  }, '');

  // バンドルファイルとpacksファイルを作成する
  fuse.bundle(config.scriptsBundleName)
    .instructions(`~ ${bundleVendorTargets}`);

  // packsファイル分処理を繰り返す
  bundles.forEach((bundle) => {

    // バンドル一覧へ追加する
    fuseBundles.push(
      fuse.bundle(bundle.name)
        .instructions(`!> [${bundle.projectPath}]`)
    );

  });

  // FuseBoxを起動する
  return fuse.run();

};

// ビルド監視処理を開始する
funcs.watchBuilding(
  `${config.appRoot}/${config.scriptsDir}`,
  buildProcess,
  {
    noError: true
  }
);
