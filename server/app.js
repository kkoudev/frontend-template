/**
 * @file The entry point of server application.
 *
 * @author Koichi Nagaoka
 */

const settings    = require('../config/settings');
const express     = require('express');
const app         = express();
const router      = require('./routes/index');


// Set using middlewares.
app.use(router);
app.use(settings.backendURIRootPath, express.static(settings.documentRoot));

// Use backend server
if (settings.useBackendServer) {

  // Launch server application.
  app.listen(settings.backendServerPort);

}

// exports
module.exports = app;
