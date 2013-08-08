"use strict";

var userConfig = {
    build_dir: 'debug',
    compile_dir: 'release',
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
        css: [
            'bower_components/metro-ui-css/css/*.css'
        ]
    }
};


module.exports = userConfig;

