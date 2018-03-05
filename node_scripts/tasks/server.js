/**
 * @file The frontend server settings.
 *
 * @author Koichi Nagaoka
 */

const browserSync = require('browser-sync');
const settings    = require('../../config/settings');

// BrowserSync settings.
const browserSyncSettings = {

  // Watch target files.
  files: [
    `${settings.documentRoot}`,
  ],

  // Default launch port number
  port: settings.frontendServerPort,

  // Support https
  https: false,

  // Notify browser-sync
  notify: false,

  // Auto open browser
  open: false,

};

// Use backend server?
if (settings.useBackendServer) {

  // append proxy settings.
  browserSyncSettings.proxy = `localhost:${settings.backendServerPort}`;

} else {

  // append server settings.
  browserSyncSettings.server = {

    // Document root directories.
    baseDir: [
      `${settings.documentRoot}`,
    ]

  };

}


// Launch browser-sync
browserSync(browserSyncSettings);
