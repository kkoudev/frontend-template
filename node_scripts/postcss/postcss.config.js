/**
 * @file Settings of PostCSS.
 *
 * @author Koichi Nagaoka
 */

const fs            = require('fs');
const path          = require('path');
const postcss       = require('postcss');
const nested        = require('postcss-nested');
const sorting       = require('postcss-sorting');
const easyImport    = require('postcss-easy-import');
const simpleVars    = require('postcss-simple-vars');
const mixins        = require('postcss-mixins');
const calc          = require('postcss-calc');
const hexrgba       = require('postcss-hexrgba');
const webfont       = require('postcss-webfont');
const imageSet      = require('postcss-image-set-polyfill');
const reporter      = require('postcss-reporter');
const assets        = require('postcss-assets');
const sprites       = require('postcss-sprites');
const functions     = require('postcss-functions');
const cssnano       = require('cssnano');
const cssMqpacker   = require('css-mqpacker');
const sugarss       = require('sugarss');
const stylelint     = require('stylelint');
const settings      = require('../../config/settings');


/**
 * Get value of pixel unit.
 *
 * @param {number} value pixel numbers.
 * @returns {string} Returns pixel value.
 */
const toPixel = (value) => {

  return value ? `${Number(value)}px` : '0';

};

/**
 * Creates properties of sprites.
 *
 * @param {object} rule   CSS rule
 * @param {object} token  CSS token
 * @param {object} image  Target image of sprites
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
    `${settings.clientRoot}/${settings.stylesDir}`,
    `${settings.clientRoot}/${settings.imagesDir}/${image.spriteUrl}`
  );

  // Creates css properties.
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

  // Append css properties of sprites.
  rule.insertAfter(token, width);
  rule.insertAfter(width, height);
  rule.insertAfter(height, backgroundImage);
  rule.insertAfter(backgroundImage, backgroundPosition);
  rule.insertAfter(backgroundPosition, backgroundSize);

};


const imageDirPath = `${settings.clientRoot}/${settings.imagesDir}`;

// Base settings
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
  simpleVars(),
  nested(),
  hexrgba(),
  webfont({
    publishPath: settings.documentRoot,
    stylesheetPath: './styles',
    outputPath: `${settings.documentRoot}/fonts`,
  }),
  functions({
    glob: path.resolve(__dirname, 'functions', '*.js'),
  }),
  imageSet(),
  assets({
    loadPaths: [
      imageDirPath
    ],
    basePath: settings.clientRoot,
    baseUrl: '../',
    cachebuster: true
  }),
  sprites({
    stylesheetPath: imageDirPath,
    spritePath: imageDirPath,
    retina: true,
    filterBy (image) {

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
  calc({
    mediaQueries: true,
  }),
  sorting(),
  settings.isProduction && cssMqpacker(),
  settings.isProduction && cssnano({
    configFile: path.resolve(__dirname, 'cssnano.config.js'),
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
