define(["require", "exports"], function(require, exports) {
    "use strict";

    /**
    * This file/module contains all configuration for the build process.
    */
    var userConfig = {
        /**
        * The `build_dir` folder is where our projects are compiled during
        * development and the `compile_dir` folder is where our app resides once it's
        * completely built.
        */
        build_dir: 'debug',
        compile_dir: 'release',
        /**
        * This is a collection of file patterns that refer to our app code (the
        * stuff in `src/`). These file paths are used in the configuration of
        * build tasks. `js` is all project javascript, scss tests. `ctpl` contains
        * our reusable components' (`src/common`) template HTML files, while
        * `atpl` contains the same, but for our app's code. `html` is just our
        * main HTML file, `scss` is our main stylesheet, and `unit` contains our
        * app's unit tests.
        */
        app_files: {
            //        js: [ 'src/**/*.js', '!src/**/*.spec.js' ],
            //        jsunit: [ 'src/**/*.spec.js' ],
            js: ['src/**/*.js'],
            atpl: ['src/app/**/*.tpl.html'],
            ctpl: ['src/common/**/*.tpl.html'],
            html: ['src/index.html'],
            scss: 'src/scss/main.scss'
        },
        /**
        * This is the same as `app_files`, except it contains patterns that
        * reference vendor code (`vendor/`) that we need to place into the build
        * process somewhere. While the `app_files` property ensures all
        * standardized files are collected for compilation, it is the user's job
        * to ensure non-standardized (i.e. vendor-related) files are handled
        * appropriately in `vendor_files.js`.
        *
        * The `vendor_files.js` property holds files to be automatically
        * concatenated and minified with our project source files.
        *
        * The `vendor_files.css` property holds any CSS files to be automatically
        * included in our app.
        */
        vendor_files: {
            js: [
                'bower_components/angular/angular.js',
                'bower_components/metro-ui-css/javascript/*.js',
                'packages/Breeze.WebApi.1.4.0/content/Scripts/breeze.debug.js'
            ],
            css: [
                'bower_components/metro-ui-css/css/*.css'
            ]
        }
    };

    
    return userConfig;
});
//# sourceMappingURL=build.config.js.map
