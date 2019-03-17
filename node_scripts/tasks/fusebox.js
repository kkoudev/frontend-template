/**
 * @file Build settings of FuseBox.
 *
 * @author Koichi Nagaoka
 */

const glob      = require('glob');
const path      = require('path');
const funcs     = require('../utils/functions');
const settings  = require('../../config/settings');
const fsbx      = require('fuse-box');

/**
 * FuseBox build process.
 */
const buildProcess = () => {

  const fuse = fsbx.FuseBox.init({
    useTypescriptCompiler: true,
    homeDir: `${settings.projectRoot}`,
    output: `${settings.documentRoot}/${settings.scriptsDir}/$name.js`,
    sourceMaps: !settings.isProduction,
    hash: false,
    cache: !settings.isProduction,
    plugins: [
      fsbx.EnvPlugin({
        NODE_ENV: process.env.NODE_ENV
      }),
      fsbx.VueComponentPlugin(),
      settings.isProduction && fsbx.UglifyJSPlugin(),
    ]
  });

  const bundles     = []; // バンドル情報一覧
  const fuseBundles = []; // FuseBoxバンドル情報一覧

  // バンドルファイル分処理を繰り返す
  glob.sync(`${settings.scriptsBundlesPath}/**/*.${settings.scriptsExt}`).forEach((file) => {

    const bundlePath    = file.substring(settings.scriptsBundlesPath.length + 1);
    const projectPath   = file.substring(settings.projectRoot.length + 1);

    // バンドルファイルパス一覧へ追加する
    bundles.push({
      name: `${path.dirname(bundlePath)}/${path.basename(bundlePath, path.extname(bundlePath))}`,
      projectPath
    });

  });

  // バンドル構築対象を作成する
  const bundleVendorTargets = bundles.reduce((previous, current) => {
    return previous ? `${previous} + ${current.projectPath}` : current.projectPath;
  }, '');

  // バンドルファイルを作成する
  fuse.bundle(settings.scriptsBundleName)
    .instructions(`~ ${bundleVendorTargets}`);

  // バンドルファイル分処理を繰り返す
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
  `${settings.clientRoot}/${settings.scriptsDir}`,
  buildProcess,
  {
    noError: true
  }
);
