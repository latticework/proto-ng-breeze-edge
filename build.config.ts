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
        clientjs: [
            '**/*.ts',
            '*.js',
            '*.js.map',
        ],
        clientjs_cwd: 'src/client',
        serverjs: ['**/*.js'],
        serverjs_cwd: 'src/server',
        servercs: ['**'],
        servercs_cwd: 'net45/proto-edge-cs-net45/bin/Debug',

        atpl: ['src/client/app/**/*.tpl.html'],
        ctpl: ['src/client/common/**/*.tpl.html'],

        html: ['src/client/index.html'],
        scss: 'src/client/scss/main.scss',
    },

    /**
        * This is the same as `app_files`, except it contains patterns that
        * reference vendor code (`vendor/`) that we need to place into the build
        * process somewhere. While the `app_files` property ensures all
        * standardized files are collected for compilation, it is the user's job
        * to ensure non-standardized (i.e. vendor-related) files are handled
        * appropriately in `client_vendor_files.js`.
        *
        * The `client_vendor_files.js` property holds files to be automatically
        * concatenated and minified with our project source files.
        *
        * The `client_vendor_files.css` property holds any CSS files to be automatically
        * included in our app.
        */
    client_vendor_files: {
        js: [
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/jquery/jquery.js',
            'bower_components/jquery-mousewheel/jquery.mousewheel.js',
            //'bower_components/metro-ui-css/javascript/*.js',
            'Scripts/q.js',
            'Scripts/breeze.debug.js',
            //'vendor/placeholders/angular-placeholders-0.0.1-SNAPSHOT.min.js',
            //'vendor/angular-ui-router/release/angular-ui-router.js',
            //'vendor/angular-ui-utils/modules/route/route.js'
        ],
        css: [
            //'bower_components/metro-ui-css/css/modern.css',
            //'bower_components/metro-ui-css/css/modern-responsive.css',
            'bower_components/todomvc-common/base.css',
        ],
        assets: [
            'bower_components/todomvc-common/bg.png',
        ],
    },

    server_vendor_files: {
        js: [
            'node_modules/edge/lib/**/*',
            'node_modules/express/lib/**/*',
            'node_modules/json-stringify-safe/stringify.js',
        ],
    }
};

export = userConfig;
