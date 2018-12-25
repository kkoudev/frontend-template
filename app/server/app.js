/**
 * @file The entry point of server application.
 *
 * @author Koichi Nagaoka
 */

const settings      = require('../../config/settings');
const fs            = require('fs-extra');
const express       = require('express');
const morgan        = require('morgan');
const cluster       = require('./libs/express/cluster');
const routes        = require('./config/routes');
const errorHandler  = require('./handlers/error');


// No use backend server
if (!settings.useBackendServer) {

  // noop
  return;

}

// Exit processing on successful
const exitProcessingSuccessful = () => {

  // Is production mode?
  if (settings.isProduction) {

    // unlink socket
    fs.unlinkSync(settings.backendSocketPath);

  }

  // eslint-disable-next-line
  process.exit(0);

};

// Exit processing on failure
const exitProcessingFailure = () => {

  // Is production mode?
  if (settings.isProduction) {

    // unlink socket
    fs.unlinkSync(settings.backendSocketPath);

  }

  // eslint-disable-next-line
  process.exit(1);

};

// Set exhit processing event.
process.on('SIGHUP', exitProcessingFailure);
process.on('SIGINT', exitProcessingFailure);
process.on('SIGBREAK', exitProcessingFailure);
process.on('SIGTERM', exitProcessingSuccessful);

// Creates cluster.
cluster((app) => {

  // Set locals
  Object.assign(app.locals, {}, settings.pugOptions.locals);

  // Set views template.
  app.set('views', `${settings.serverRoot}/${settings.viewsRootDir}`);
  app.set('view engine', 'pug');

  // Remove headers
  app.disable('etag');
  app.disable('x-powered-by');

  // Set logger
  app.use(morgan('dev'));

  // Set using middlewares.
  app.use(express.static(settings.documentRoot));

  // Set routing.
  app.use(routes);

  // Set error handler
  app.use(errorHandler.handle500);
  app.use('*', errorHandler.handle404);

  // Is production mode?
  if (settings.isProduction) {

    // Launch server application.
    app.listen(settings.backendSocketPath, () => {

      // Change mode socket file.
      fs.chmodSync(settings.backendSocketPath, '0666');

    });

  } else {

    // Launch server application.
    app.listen(settings.backendServerPort);

  }

});
