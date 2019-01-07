/**
 * @file Lazy load images
 */
const LazyLoad = require('vanilla-lazyload'); // tslint:disable-line

new LazyLoad({
  elements_selector: '.js-lazyload',
});
