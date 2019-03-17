/**
 * @file Creates sitemap.
 *
 * @author Koichi Nagaoka
 */

const path          = require('path');
const fs            = require('fs-extra');
const sm            = require('sitemap');
const robots        = require('robots-generator');
const funcs         = require('../utils/functions');
const settings      = require('../../config/settings');
const smConfig      = require('../../config/sitemap');
const robotsConfing = require('../../config/robots');

// Creates sitemap.xml
fs.writeFileSync(path.resolve(settings.documentRoot, 'sitemap.xml'), sm.createSitemap(smConfig).toXML(), { encoding: 'utf-8' });
fs.writeFileSync(path.resolve(settings.documentRoot, 'sitemap.xml.gz'), sm.createSitemap(smConfig).toGzip(), { encoding: 'utf-8' });

// Creates robots
robots(robotsConfing, (error, robotsFile) => {

  // error occurred
  if (error) {

    // output error message
    funcs.logError(error);
    return;

  }

  // Creates robots file
  fs.writeFileSync(path.resolve(settings.documentRoot, 'robots.txt'), robotsFile.join('\n') + '\n', { encoding: 'utf-8' });

});
