/**
 * @file Build and application settings.
 *
 * @author Koichi Nagaoka
 */

const path      = require('path');
const moment    = require('moment');

// --------------------------------------------------
// Common settings
// --------------------------------------------------

const isProduction        = process.env.NODE_ENV === 'production';  // Production mode or not.
const isStyleGuideEnabled = process.env.STYLE_GUIDE === 'true';     // Creates styleguide or not.
const isCompressImage     = process.env.COMPRESS_IMAGE === 'true';  // Compress images or not.
const projectRoot         = path.resolve(__dirname, '..');          // Project root directory path.
const scriptsRoot         = `${projectRoot}/node_scripts`;          // Task script root directory path.
const documentDir         = isProduction ? 'build' : '.temp';       // Document directory name.
const documentRoot        = `${projectRoot}/${documentDir}`;        // Document root directory path.
const bundlesDir          = 'bundles';                              // Bundle file directory name.
const pagesDir            = 'pages';                                // Pages directory name.
const clientRoot             = `${projectRoot}/client`;             // Directory path of client application.
const serverRoot          = `${projectRoot}/server`;                // Directory path of server application.
const scriptsDir          = 'scripts';                              // Script directory name.
const scriptsBundlesDir   = `${scriptsDir}/${pagesDir}`;            // Bundle target JavaScript directory relative path.
const scriptsBundlesPath  = `${clientRoot}/${scriptsBundlesDir}`;   // Bundle target JavaScript directory full path.
const scriptsExt          = 'js';                                   // Script file extension.
const scriptsBundleName   = 'vendor';                               // Bundle file name of script libraries.
const stylesDir           = 'styles';                               // CSS directory name.
const stylesExt           = 'sss';                                  // CSS file extension.
const viewsDir            = 'views';                                // View directory name.
const viewsRootDir        = `${viewsDir}/root`;                     // View root directory relative path.
const imagesDir           = 'images';                               // Images directory name.
const spritesDir          = '_sprites';                             // Sprites of images directory name.
const spritesPadding      = 10;                                     // Padding of sprite image.
const materialsDir        = 'materials';                            // Materials directory name.

// Target image file extensions
const imagesExts          = [
  'jpg',
  'jpeg',
  'png',
  'svg',
  'gif',
];

// Target browsers
const browsers            = [
  'last 3 versions',
  'IE >= 11',
  'iOS >= 9',
  'Android >= 4',
];

// Pug settings
const pugOptions          = {

  pretty: true,
  locals: {

    env: {
      isProduction,
      time: moment().format('YYYYMMDDhhmm'),
      dnsPrefetches: [
        isProduction ? 'example.com' : 'localhost', // TODO : プロジェクトによってここは修正すること
        'fonts.googleapis.com'
      ],
      preconnects: [
        isProduction ? 'https://example.com' : 'http://localhost',  // TODO : プロジェクトによってここは修正すること
        'https://fonts.googleapis.com'
      ]
    }

  }

};

// compress-images settings
const compressImagesOptions = {

  // jpg options
  jpg: {
    jpg: {
      engine: 'jpegtran',
      command: ['-progressive', '-copy', 'none', '-optimize']
    }
  },

  // png options
  png: {
    png: {
      engine: 'pngquant',
      command: ['--speed', '1']
    }
  },

  // svg options
  svg: {
    svg: {
      engine: 'svgo',
      command: ['--multipass']
    }
  },

  gif: {
    gif: {
      engine: 'gifsicle',
      command: ['--interlace']
    }
  }

};


// --------------------------------------------------
// Server settings.
// --------------------------------------------------

const frontendServerPort  = 8000;                         // Port number of frontend server. (BrowserSync)
const backendServerPort   = 9000;                         // Port number of backend server. (Express)
const backendSocketPath   = '/sockets/node.sock';         // Socket file path of backend server.
const useBackendServer    = true;                         // Use backend server or not.


module.exports = {
  isProduction,
  isStyleGuideEnabled,
  isCompressImage,
  projectRoot,
  scriptsRoot,
  documentDir,
  documentRoot,
  bundlesDir,
  pagesDir,
  clientRoot,
  serverRoot,
  scriptsDir,
  scriptsBundlesDir,
  scriptsBundlesPath,
  scriptsExt,
  scriptsBundleName,
  stylesDir,
  stylesExt,
  viewsDir,
  viewsRootDir,
  imagesDir,
  spritesDir,
  spritesPadding,
  materialsDir,
  imagesExts,
  browsers,
  pugOptions,
  compressImagesOptions,
  frontendServerPort,
  backendServerPort,
  backendSocketPath,
  useBackendServer,
};
