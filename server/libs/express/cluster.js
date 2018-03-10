/**
 * @file Clustering module for Express application.
 */

const cluster = require('cluster');
const express = require('express');
const os      = require('os');

/**
 * This type is initial callback for Express application.
 *
 * @callback initialCallback
 * @param {object} Express application instance
 */

/**
 * Creates cluster Express application.
 *
 * @param {initialCallback} initialCallback
 */
module.exports = (initialCallback) => {

  // Master cluster process?
  if (cluster.isMaster) {

    const cpuCount = os.cpus().length;

    // Each by cpu count.
    for (let i = 0; i < cpuCount; i++) {

      // fork process
      cluster.fork();

    }

  } else {

    // Creates Express app instance.
    const app = express();

    // Initialize application settings.
    initialCallback(app);

  }

};
