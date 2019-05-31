# 0.16.0  (2019-05-31)

### Changed

-   ESLint rules.
-   Upgrade versions of all dependences.
-   Node.js version `12.3.1`.

# 0.15.0  (2019-03-17)

### Added

-   "sitemap" and "robots-generator" modules.

### Changed

-   TSLint has been removed and replaced with ESLint.
-   Upgrade versions of all dependences.
-   Node.js version `11.12.0`.

# 0.14.0  (2019-01-14)

### Added

-   "cssnano" module.

### Changed

-   Set grid option of "autoprefixer".

### Removed

-   "csswring" module.

# 0.13.0  (2019-01-13)

### Changed

-   TSLint rules.
-   Upgrade versions of all dependences.

# 0.12.0  (2019-01-07)

### Added

-   Icon fonts template.

### Changed

-   Upgrade versions of all dependences.

# 0.11.0  (2019-01-07)

### Added

-   LoadCSS supported.
-   Critical-path CSS supported. (Only dist generating files)
-   Lazy loading images supported.
-   GTM Pug templates by environment.
-   "vanilla-lazyload", "critical" and "fg-loadcss" module.
-   "patch:critical", "patch" in npm scripts.

### Changed

-   The npm scripts changes "dist" to "dist:dev" and "dist:prod".
-   TSLint rules.
-   The "target" change "es2018" to "es5" in tsconfig.json

### Removed

-   "blazy" module.

# 0.10.0  (2019-01-04)

### Added

-   "postcss-image-set-polyfill", "postcss-functions" in PostCSS plugins.
-   "picturefill" module.
-   "minimum-scale" in Pug template.
-   "image-set" polyfill mixin.

### Changed

-   Upgrade versions of all dependences.

# 0.9.1  (2019-01-01)

### Fixed

-   Remove "whitespace" rule from tslint.json. Uses "tslint:recommended" rule.

# 0.9.0  (2018-12-25)

### Added

-   "postcss-simple-vars", "postcss-nested" in PostCSS plugins.

### Changed

-   FuseBox target transpiling script format from Babel to TypeScript.
-   Node.js version `11.5.0`.

### Removed

-   "dns-prefetch" from Pug template.
-   "precss", "postcss-functions", "postcss-nested-props" and "postcss-style-guide" from PostCSS plugins.
-   "target-densitydpi", "minimum-scale", "maximum-scale" and "shrink-to-fit" from viewport in Pug template.
-   Unnecessary dependencies and files.

# 0.8.0  (2018-09-01)

### Added

-   "rxjs" module.
-   "compress-images" module.

### Removed

-   "imagemin" related modules.

# 0.7.0  (2018-09-01)

### Fixed

-   Cannot output console error message.

### Changed

-   Upgrade versions of all dependences.

# 0.6.0  (2018-08-19)

### Added

-   "jest" module.

### Changed

-   Upgrade versions of all dependences.
-   Node.js version `10.9.0`.
-   ESLint rules.
-   Use "ndw" in setup.sh.

### Removed

-   "karma" and "jasmine" related modules.

# 0.5.0  (2018-04-15)

### Added

-   "Templates" parts.

# 0.4.0  (2018-04-15)

### Changed

-   Rename `app` directory to `client`.
-   Upgrade versions of all dependencies.
-   Update Node.js version `9.7.1` to `9.11.1`.

# 0.3.0  (2018-03-11)

### Added

-   "material" task. This task is to copy some files in materials directory.

### Changed

-   Refactors all tasks.
-   Updates template of backend-server.

# 0.2.0  (2018-03-05)

### Added

-   Added backend-server (Express). Set "useBackendServer" variable "false" in config/settings.js when backend server want to be disabled.

### Changed

-   Moved "node_scripts/settings.js" to "config/settings.js".

# 0.1.1  (2018-03-02)

### Changed

-   Upgrade versions of all dependences.

# 0.1.0  (2018-03-02)

### Added

-   Added sanitize.css.

### Removed

-   Removed normalize.css.

### Changed

-   Upgrade versions of all dependencies.
-   Files in the node_modules directory are ignored from stylelint.

# 0.0.1 (2018-01-02)

-   Initial release
