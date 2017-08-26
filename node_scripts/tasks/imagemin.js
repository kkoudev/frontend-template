/**
 * @file 画像圧縮関連設定ファイル。
 *
 * @author Koichi Nagaoka
 */

const glob      = require('glob');
const path      = require('path');
const fs        = require('fs-extra');
const imagemin  = require('imagemin');
const mozjpeg   = require('imagemin-mozjpeg');
const pngquant  = require('imagemin-pngquant');
const svgo      = require('imagemin-svgo');
const gifsicle  = require('imagemin-gifsicle');

const funcs     = require('../utils/functions');
const config    = require('../settings');


// ビルド監視処理を開始する
funcs.watchBuilding(
  `${config.appRoot}/${config.imagesDir}`,
  () => {

    // 対象画像ファイルパス一覧を取得する
    const imagePaths = glob.sync(
      `${config.appRoot}/${config.imagesDir}/**/*.{${config.imagesExts.join(',')}}`,
      {
        ignore: `${config.appRoot}/${config.imagesDir}/${config.spritesDir}/**/*`
      }
    );

    // 画像圧縮処理を行う
    // imageminの output 指定だとソースのディレクトリ構造を維持しないため、出力先を空指定にしてラッピング処理を記述する
    // 但し、imageminのバグで出力先に null を指定するとオプションが全て無効になってしまうため、undefined を指定している
    return imagemin(
      imagePaths,
      undefined,    // eslint-disable-line no-undefined
      {
        plugins: config.isProduction ? [
          pngquant({
            speed: 1,
            nofs: false,
          }),
          mozjpeg({
            quality: 100,
            progressive: true,
            quantTable: 3
          }),
          svgo({
            plugins: [
              {
                removeTitle: true
              },
            ]
          }),
          gifsicle({
            interlaced: true
          })
        ] : []
      }
    ).then((files) => {

      // 対象画像ファイル分繰り返し
      files.forEach((file, index) => {

        // 出力先ファイルパスを作成する
        const destImageFilePath = path.resolve(
          config.documentRoot,
          path.relative(config.appRoot, imagePaths[index])
        );

        // ファイルを書き込む
        fs.outputFile(destImageFilePath, file.data);

      });

    });

  }
);
