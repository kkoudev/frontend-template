/**
 * @file Settings of PostCSS.
 *
 * @author Koichi Nagaoka
 */

const fs            = require('fs');
const path          = require('path');
const postcss       = require('postcss');
const nestedProps   = require('postcss-nested-props');
const sorting       = require('postcss-sorting');
const easyImport    = require('postcss-easy-import');
const mixins        = require('postcss-mixins');
const functions     = require('postcss-functions');
const calc          = require('postcss-calc');
const hexrgba       = require('postcss-hexrgba');
const webfont       = require('postcss-webfont');
const reporter      = require('postcss-reporter');
const assets        = require('postcss-assets');
const sprites       = require('postcss-sprites');
const styleGuide    = require('postcss-style-guide');
const precss        = require('precss');
const autoprefixer  = require('autoprefixer');
const csswring      = require('csswring');
const cssMqpacker   = require('css-mqpacker');
const sugarss       = require('sugarss');
const stylelint     = require('stylelint');
const settings      = require('../config/settings');


/**
 * 単位付きサイズを取得する。
 *
 * @param {number} value ピクセルサイズとなる値
 * @returns {string} 値が 0 以外なら px 単位付きで返す。0の場合は単位無し
 */
const toPixel = (value) => {

  return value ? `${Number(value)}px` : '0';

};

/**
 * スプライト画像のCSS更新処理
 *
 * @param {object} rule   更新後のCSSプロパティ一覧
 * @param {object} token  CSSトークン情報
 * @param {object} image  スプライト画像情報
 */
const onUpdateRule = (rule, token, image) => {

  const imageCachebuster  = fs.statSync(image.path).mtime.getTime().toString(16);
  const imageRetinaRatio  = image.retina ? image.ratio : 1;
  const imageWidth        = toPixel(image.coords.width / imageRetinaRatio);
  const imageHeight       = toPixel(image.coords.height / imageRetinaRatio);
  const imageX            = toPixel(-1 * Math.abs(image.coords.x / image.ratio));
  const imageY            = toPixel(-1 * Math.abs(image.coords.y / image.ratio));
  const spriteWidth       = toPixel(image.spriteWidth / image.ratio);
  const spriteHeight      = toPixel(image.spriteHeight / image.ratio);
  const spritePath        = path.relative(
    `${settings.appRoot}/${settings.stylesDir}`,
    `${settings.appRoot}/${settings.imagesDir}/${image.spriteUrl}`
  );

  // プロパティ情報を作成する
  const width              = postcss.decl({
    prop: 'width',
    value: imageWidth
  });
  const height             = postcss.decl({
    prop: 'height',
    value: imageHeight
  });
  const backgroundImage    = postcss.decl({
    prop: 'background-image',
    value: `url('${spritePath}?${imageCachebuster}')`
  });
  const backgroundSize     = postcss.decl({
    prop: 'background-size',
    value: `${spriteWidth} ${spriteHeight}`
  });
  const backgroundPosition = postcss.decl({
    prop: 'background-position',
    value: `${imageX} ${imageY}`
  });

  // 作成したプロパティ情報でCSSプロパティ情報を更新する
  rule.insertAfter(token, width);
  rule.insertAfter(width, height);
  rule.insertAfter(height, backgroundImage);
  rule.insertAfter(backgroundImage, backgroundPosition);
  rule.insertAfter(backgroundPosition, backgroundSize);

};


const imageDirPath = `${settings.appRoot}/${settings.imagesDir}`;

// ベースプラグイン設定情報
const BASE_PLUGINS = [
  easyImport({
    extensions: ['.sss'],
    plugins: [
      stylelint({
        configBasedir: settings.projectRoot,
        configFile: '.stylelintrc.yml'
      })
    ]
  }),
  mixins(),
  precss(),
  nestedProps(),
  functions({
    glob: path.resolve(__dirname, 'postcss/functions', '*.js')
  }),
  calc({
    mediaQueries: true,
  }),
  hexrgba(),
  webfont({
    publishPath: settings.documentRoot,
    stylesheetPath: './styles',
    outputPath: `${settings.documentRoot}/fonts`,
  }),
  sorting(),
  autoprefixer({
    browsers: settings.browsers
  }),
  assets({
    loadPaths: [
      imageDirPath
    ],
    basePath: settings.appRoot,
    baseUrl: '../',
    cachebuster: true
  }),
  sprites({
    stylesheetPath: imageDirPath,
    spritePath: imageDirPath,
    retina: true,
    filterBy(image) {

      return new RegExp(`${settings.imagesDir}\/${settings.spritesDir}`).test(
        image.url) ? Promise.resolve() : Promise.reject();

    },
    spritesmith: {
      padding: settings.spritesPadding
    },
    svgsprite: {
      shape: {
        spacing: {
          padding: settings.spritesPadding
        }
      }
    },
    hooks: {
      onUpdateRule,
    }
  }),
  settings.isProduction && cssMqpacker(),
  settings.isProduction && csswring({
    removeAllComments: true
  }),
  settings.isStyleGuideEnabled && styleGuide({
    project: 'Example StyleGuide',
    dest: `${settings.documentRoot}/styleguide/index.html`,
    showCode: false,
  }),
  reporter({
    clearReportedMessages: true,
    throwError: true,
  })
].filter(Boolean);

// 設定情報を返す
module.exports = {

  map: !settings.isProduction,
  parser: sugarss,
  plugins: BASE_PLUGINS,

};
