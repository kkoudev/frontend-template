/**
 * @file Build settings.
 *
 * @author Koichi Nagaoka
 */

const path      = require('path');
const moment    = require('moment');

// --------------------------------------------------
// Common settings
// --------------------------------------------------

const isProduction        = process.env.NODE_ENV === 'production';  // Production mode or not.
const isCompressImage     = process.env.COMPRESS_IMAGE === 'true';  // Compress images or not.
const isGTMProduction     = process.env.GTM_ENV === 'production';   // GTM Production mode or not.
const projectRoot         = path.resolve(__dirname, '..');          // Project root directory path.
const scriptsRoot         = `${projectRoot}/node_scripts`;          // Task script root directory path.
const documentDir         = isProduction ? 'build' : '.temp';       // Document directory name.
const documentRoot        = `${projectRoot}/${documentDir}`;        // Document root directory path.
const bundlesDir          = 'bundles';                              // Bundle file directory name.
const pagesDir            = 'pages';                                // Pages directory name.
const sourceRoot          = `${projectRoot}/app`;                   // Directory path of application sources.
const clientRoot          = `${sourceRoot}/client`;                 // Directory path of client application.
const serverRoot          = `${sourceRoot}/server`;                 // Directory path of server application.
const scriptsDir          = 'scripts';                              // Script directory name.
const scriptsBundlesDir   = `${scriptsDir}/${pagesDir}`;            // Bundle target JavaScript directory relative path.
const scriptsBundlesPath  = `${clientRoot}/${scriptsBundlesDir}`;   // Bundle target JavaScript directory full path.
const scriptsExt          = '{ts,tsx}';                             // Script file extension.
const scriptsBundleName   = 'vendor';                               // Bundle file name of script libraries.
const stylesDir           = 'styles';                               // CSS directory name.
const stylesExt           = 'sss';                                  // CSS file extension.
const viewsDir            = 'views';                                // View directory name.
const viewsRootDir        = `${viewsDir}/root`;                     // View root directory relative path.
const imagesDir           = 'images';                               // Images directory name.
const spritesDir          = '_sprites';                             // Sprites of images directory name.
const spritesPadding      = 10;                                     // Padding of sprite image.
const htdocsDir           = 'htdocs';                               // Htdocs directory name.
const eslintCache         = '.eslintcache';                         // ESLint cache file name.
const eslintCachePath     = `${projectRoot}/${eslintCache}`;        // ESLint cache file path.
const criticalWidth       = 1300;                                   // Critical area width
const criticalHeight      = 900;                                    // Critical area height

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
  'iOS >= 10',
  'Android >= 5',
];

// Pug settings
const pugOptions          = {

  pretty: true,
  locals: {

    env: {
      isProduction,
      isGTMProduction,
      time: moment().format('YYYYMMDDhhmm'),
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
const useBackendServer    = false;                        // Use backend server or not.


module.exports = {
  isProduction,
  isCompressImage,
  isGTMProduction,
  projectRoot,
  scriptsRoot,
  documentDir,
  documentRoot,
  bundlesDir,
  pagesDir,
  sourceRoot,
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
  htdocsDir,
  eslintCache,
  eslintCachePath,
  criticalWidth,
  criticalHeight,
  imagesExts,
  browsers,
  pugOptions,
  compressImagesOptions,
  frontendServerPort,
  backendServerPort,
  backendSocketPath,
  useBackendServer,
};
