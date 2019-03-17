/**
 * @file define sitemap.
 */
const path     = require('path');
const settings = require('./settings');

module.exports = {

  hostname: 'https://example.com',
  cacheTime: 60000,
  urls: [
    {
      url: '/',
      changefreq: 'weekly',
      priority: 1.0,
      lastmodrealtime: true,
      lastmodfile: path.resolve(settings.documentRoot, 'index.html'),
    },
  ],

};
