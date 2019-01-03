/**
 * @file Common processes
 */
import 'ts-polyfill/lib/es2015-core';
import 'ts-polyfill/lib/es2015-promise';
import 'ts-polyfill/lib/es2015-collection';
import 'ts-polyfill/lib/es2016-array-include';
import 'ts-polyfill/lib/es2017-string';
import 'ts-polyfill/lib/es2017-object';
import 'ts-polyfill/lib/es2018-promise';
import WebFont from 'webfontloader';
import picturefill from 'picturefill';

// polyfill
picturefill();

// Load web fonts
WebFont.load({
  google: {
    families: ['Droid Sans'], // TODO : Specify using web fonts
  },
});
