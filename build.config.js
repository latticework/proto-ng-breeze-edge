"use strict";

var userConfig = {
    build_dir: 'build',
    compile_dir: 'bin',
    app_files: {
        js: ['src/**/*.js'],
        atpl: ['src/app/**/*.tpl.html'],
        ctpl: ['src/common/**/*.tpl.html'],
        html: ['src/index.html'],
        scss: 'src/scss/main.scss'
    },
    vendor_files: {
        js: [
            'bower_components/angular/angular.js',
            'bower_components/metro-ui-css/javascript/*.js',
            'packages/Breeze.WebApi.1.4.0/content/Scripts/breeze.debug.js'
        ],
        css: []
    }
};


module.exports = userConfig;

//@ sourceMappingURL=build.config.js.map
