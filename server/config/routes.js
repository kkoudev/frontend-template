/**
 * @file Router settings.
 *
 * @author Koichi Nagaoka
 */

const express       = require('express');
const router        = express.Router();

// Setting router
require('../routes/index')(router);

module.exports = router;
