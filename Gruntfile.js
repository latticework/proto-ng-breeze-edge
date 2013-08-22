/*global module:false*/
/// <reference path="./Scripts/typings/gruntjs/gruntjs.d.ts" />
/// <reference path="./Scripts/typings/gruntjs/grunt-contrib-clean.d.ts" />
/// <reference path="./Scripts/typings/gruntjs/grunt-contrib-copy.d.ts" />
/// <reference path="./Scripts/typings/gruntjs/grunt-contrib-concat.d.ts" />
/// <reference path="./Scripts/typings/gruntjs/grunt-contrib-sass.d.ts" />
/// <reference path="./IGruntConfig.d.ts" />
/// <reference path="./Scripts/typings/node/node.d.ts" />
// https://raw.github.com/joshdmiller/ng-boilerplate/v0.3.0-release/gruntfile.js
var toExport = function (grunt) {
    "use strict";

    // require time-grunt at the top and pass in the grunt instance
    require('time-grunt')(grunt);

    /**
    * load required grunt tasks. these are installed based on the versions listed
    * in `package.json` when you do `npm install` in this directory.
    */
    //    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //    grunt.loadNpmTasks('grunt-conventional-changelog');
    grunt.loadNpmTasks('grunt-html2js');

    //    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-typescript');

    /**
    * load in our build configuration file.
    */
    //    import userconfig = module('build.config');
    var userconfig = require('./build.config.js');

    /**
    * this is the configuration object grunt uses to give each plugin its
    * instructions.
    */
    var taskconfig = {
        /**
        * we read in our `package.json` file so we can access the package name and
        * version. it's already there, so we don't repeat ourselves here.
        */
        pkg: grunt.file.readJSON("package.json"),
        /**
        * the banner is the comment that is placed at the top of our compiled
        * source files. it is first processed as a grunt template, where the `<%=`
        * pairs are evaluated based on this very configuration object.
        */
        meta: {
            banner: '/**\n' + ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' + ' * <%= pkg.homepage %>\n' + ' *\n' + ' * copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' + ' * licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' + ' */\n'
        },
        //        /**
        //         * creates a changelog on a new version.
        //         */
        //        changelog: {
        //            options: {
        //                dest: 'changelog.md',
        //                template: 'changelog.tpl'
        //            }
        //        },
        //
        //        /**
        //         * increments the version number, etc.
        //         */
        //        bump: {
        //            options: {
        //                files: [
        //                    "package.json",
        //                    "bower.json"
        //                ],
        //                commit: false,
        //                commitmessage: 'chore(release): v%version%',
        //                commitfiles: [
        //                    "package.json",
        //                    "client/bower.json"
        //                ],
        //                createtag: false,
        //                tagname: 'v%version%',
        //                tagmessage: 'version %version%',
        //                push: false,
        //                pushto: 'origin'
        //            }
        //        },
        // the directories to delete when `grunt clean` is executed.
        clean: ['<%= build_dir %>', '<%= compile_dir %>'],
        /**
        * the `copy` task just copies files from a to b. we use it here to copy
        * our project assets (images, fonts, etc.) and javascripts into
        * `build_dir`, and then to copy the assets to `compile_dir`.
        */
        copy: {
            buildClientAssets: {
                files: [
                    {
                        src: ['**'],
                        dest: '<%= build_dir %>/client/assets/',
                        expand: true,
                        cwd: 'src/client/assets'
                    }
                ]
            },
            buildClientSrcJS: {
                files: [
                    {
                        src: ['<%= app_files.clientjs %>'],
                        dest: '<%= build_dir %>',
                        expand: true,
                        cwd: '<%= app_files.clientjs_cwd %>'
                    }
                ]
            },
            buildClientVendorJS: {
                files: [
                    {
                        src: ['<%= client_vendor_files.js %>'],
                        dest: '<%= build_dir %>/client',
                        expand: true,
                        cwd: '.'
                    }
                ]
            },
            buildServerVendorJS: {
                files: [
                    {
                        src: ['<%= server_vendor_files.js %>'],
                        dest: '<%= build_dir %>/server/',
                        expand: true,
                        cwd: '.'
                    }
                ]
            },
            buildServerSrcJS: {
                files: [
                    {
                        src: ['<%= app_files.serverjs %>'],
                        dest: '<%= build_dir %>',
                        expand: true,
                        cwd: '<%= app_files.serverjs_cwd %>'
                    }
                ]
            },
            buildServerSrcCS: {
                files: [
                    {
                        src: ['<%= app_files.servercs %>'],
                        dest: '<%= build_dir %>/server/bin',
                        expand: true,
                        cwd: '<%= app_files.servercs_cwd %>'
                    }
                ]
            },
            compileClientAssets: {
                files: [
                    {
                        src: ['**'],
                        dest: '<%= compile_dir %>/client/assets',
                        expand: true,
                        cwd: '<%= build_dir %>/client/assets'
                    }
                ]
            }
        },
        /**
        * `grunt concat` concatenates multiple source files into a single file.
        */
        concat: {
            /**
            * the `compileClientJS` target is the concatenation of our application source
            * code and all specified vendor source code into a single file.
            */
            compileClientJS: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: [
                    '<%= client_vendor_files.js %>',
                    'module.prefix',
                    '<%= build_dir %>/client/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.common.dest %>',
                    '<%= client_vendor_files.js %>',
                    'module.suffix'
                ],
                dest: '<%= compile_dir %>/client/assets/<%= pkg.name %>.js'
            }
        },
        /**
        * `ng-min` annotates the sources before minifying. that is, it allows us
        * to code without the array syntax.
        */
        ngmin: {
            compile: {
                files: [
                    {
                        src: ['<%= app_files.clientjs %>'],
                        dest: '<%= build_dir %>',
                        expand: true,
                        cwd: '<%= build_dir %>'
                    }
                ]
            }
        },
        /**
        * minify the sources!
        */
        uglify: {
            compile: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: {
                    '<%= concat.compileClientJS.dest %>': ['<%= concat.compileClientJS.dest %>']
                }
            }
        },
        sass: {
            build: {
                options: {
                    lineNumbers: true
                },
                files: [
                    {
                        src: ['<%= app_files.scss %>'],
                        dest: '<%= build_dir %>/client/assets/<%= pkg.name %>.css'
                    }
                ]
            },
            compile: {
                options: {
                    lineNumbers: true,
                    style: "compressed"
                },
                files: [
                    {
                        src: ['<%= app_files.scss %>'],
                        dest: '<%= compile_dir %>/client/assets/<%= pkg.name %>.css'
                    }
                ]
            }
        },
        /**
        * `jshint` defines the rules of our linter as well as which files we
        * should check. this file, all javascript sources, and all our unit tests
        * are linted based on the policies listed in `options`. but we can also
        * specify exclusionary patterns by prefixing them with an exclamation
        * point (!); this is useful when code comes from a third party but is
        * nonetheless inside `src/`.
        */
        jshint: {
            buildClientSrcJS: [
                '<%= app_files.clientjs %>',
                '<%= app_files.serverjs %>'
            ],
            buildServerSrcJS: [
                '<%= app_files.clientjs %>',
                '<%= app_files.serverjs %>'
            ],
            test: [],
            gruntfile: [
                'build.config.js',
                'gruntfile.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true
            },
            globals: {}
        },
        /**
        * html2js is a grunt plugin that takes all of your template files and
        * places them into javascript files as strings that are added to
        * angularjs's template cache. this means that the templates too become
        * part of the initial payload as one javascript file. neat!
        */
        html2js: {
            /**
            * these are the templates from `src/app`.
            */
            app: {
                options: {
                    base: 'src/app'
                },
                src: ['<%= app_files.atpl %>'],
                dest: '<%= build_dir %>/client/templates-app.js'
            },
            /**
            * these are the templates from `src/common`.
            */
            common: {
                options: {
                    base: 'src/common'
                },
                src: ['<%= app_files.ctpl %>'],
                dest: '<%= build_dir %>/client/templates-common.js'
            }
        },
        /**
        * the karma configurations.
        */
        karma: {
            options: {
                configfile: '<%= build_dir %>/client/karma-unit.js'
            },
            unit: {
                runnerport: 9101,
                background: true
            },
            continuous: {
                singlerun: true
            }
        },
        /**
        * the `index` task compiles the `index.html` file as a grunt template. css
        * and js files co-exist here but they get split apart later.
        */
        index: {
            /**
            * during development, we don't want to have wait for compilation,
            * concatenation, minification, etc. so to avoid these steps, we simply
            * add all script files directly to the `<head>` of `index.html`. the
            * `src` property contains the list of included files.
            */
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= client_vendor_files.js %>',
                    '<%= build_dir %>/client/app/**/*.js',
                    '<%= html2js.common.dest %>',
                    '<%= html2js.app.dest %>',
                    '<%= client_vendor_files.css %>',
                    '<%= sass.build.files[0].dest %>'
                ]
            },
            /**
            * when it is time to have a completely compiled application, we can
            * alter the above to include only a single javascript and a single css
            * file. now we're back!
            */
            compile: {
                dir: '<%= compile_dir %>',
                src: [
                    '<%= concat.compileClientJS.dest %>',
                    '<%= client_vendor_files.css %>',
                    '<%= sass.compile.files[0].dest %>'
                ]
            }
        },
        //        /**
        //         * this task compiles the karma template so that changes to its file array
        //         * don't have to be managed manually.
        //         */
        //        karmaconfig: {
        //            unit: {
        //                dir: '<%= build_dir %>',
        //                src: [
        //                    '<%= client_vendor_files.js %>',
        //                    '<%= html2js.app.dest %>',
        //                    '<%= html2js.common.dest %>',
        //                    'vendor/angular-mocks/angular-mocks.js'
        //                ]
        //            }
        //        },
        // typescript configuration for grunt.
        typescript: {
            client: {
                src: ['src/client/**/*.ts'],
                //                    dest: 'js',
                options: {
                    module: 'amd',
                    target: 'es5',
                    base_path: '',
                    sourcemap: true,
                    fullsourcemappath: true
                }
            },
            server: {
                src: ['src/server/**/*.ts'],
                //                    dest: 'js',
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    base_path: '',
                    sourcemap: false
                }
            }
        },
        /**
        * and for rapid development, we have a watch set up that checks to see if
        * any of the files listed below change, and then to execute the listed
        * tasks when they do. this just saves us from having to type "grunt" into
        * the command-line every time we want to see what we're working on; we can
        * instead just leave "grunt watch" running in a background terminal. set it
        * and forget it, as ron popeil used to tell us.
        *
        * but we don't need the same thing to happen for all the files.
        */
        delta: {
            /**
            * by default, we want the live reload to work for all tasks; this is
            * overridden in some tasks (like this file) where browser resources are
            * unaffected. it runs by default on port 35729, which your browser
            * plugin should auto-detect.
            */
            // http://rhumaric.com/2013/07/renewing-the-grunt-livereload-magic/
            options: {
                livereload: true
            },
            /**
            * when the gruntfile changes, we just want to lint it. in fact, when
            * your gruntfile changes, it will automatically be reloaded!
            */
            gruntfile: {
                files: 'gruntfile.js',
                tasks: ['jshint:gruntfile'],
                options: {
                    livereload: false
                }
            },
            /**
            * when our javascript source files change, we want to run lint them and
            * run our unit tests.
            */
            jssrc: {
                files: [
                    '<%= app_files.clientjs %>',
                    '<%= app_files.serverjs %>'
                ],
                tasks: ['jshint:src', 'copy:buildClientSrcJS', 'copy:buildServerSrcJS']
            },
            /**
            * when assets are changed, copy them. note that this will *not* copy new
            * files, so this is probably not very useful.
            */
            assets: {
                files: [
                    'src/assets/**/*'
                ],
                tasks: ['copy:buildClientAssets']
            },
            /**
            * when index.html changes, we need to compile it.
            */
            html: {
                files: ['<%= app_files.html %>'],
                tasks: ['index:build']
            },
            /**
            * when our templates change, we only rewrite the template cache.
            */
            tpls: {
                files: [
                    '<%= app_files.atpl %>',
                    '<%= app_files.ctpl %>'
                ],
                tasks: ['html2js']
            },
            /**
            * when the css files change, we need to compile and minify them.
            * TODO: Minify css files.
            */
            sass: {
                files: [],
                tasks: ['']
            }
        }
    };

    grunt.initConfig(grunt.util._.extend(taskconfig, userconfig));

    grunt.registerTask('printConfig', 'print the Grunt config object.', function () {
        // http://stackoverflow.com/questions/16196763/print-out-grunt-js-config-during-the-build
        // http://stackoverflow.com/questions/4810841/json-pretty-print-using-javascript
        grunt.log.writeln(JSON.stringify(grunt.config(), null, 2));
    });

    /**
    * in order to make it safe to just compile or copy *only* what was changed,
    * we need to ensure we are starting from a clean, fresh build. so we rename
    * the `watch` task to `delta` (that's why the configuration var above is
    * `delta`) and then add a new task called `watch` that does a clean build
    * before watching for changes.
    */
    grunt.renameTask('watch', 'delta');
    grunt.registerTask('watch', ['build', 'delta']);

    /**
    * the default task is to build and compile.
    */
    grunt.registerTask('default', ['build', 'compile']);

    /**
    * the `build` task gets your app ready to run for development and testing.
    */
    grunt.registerTask('client', [
        'clean',
        'typescript:client',
        'html2js',
        'jshint:gruntfile',
        'jshint:buildClientSrcJS',
        'sass:build',
        'copy:buildClientVendorJS',
        'copy:buildClientAssets',
        'copy:buildClientSrcJS',
        'index:build'
    ]);

    /**
    * the `build` task gets your app ready to run for development and testing.
    */
    grunt.registerTask('server', [
        'clean',
        'typescript:server',
        'jshint:gruntfile',
        'jshint:buildServerSrcJS',
        'copy:buildServerVendorJS',
        'copy:buildServerSrcJS',
        'copy:buildServerSrcCS'
    ]);

    /**
    * the `build` task gets your app ready to run for development and testing.
    */
    grunt.registerTask('build', [
        'clean',
        'typescript',
        'html2js',
        'jshint',
        'sass:build',
        'copy:buildClientVendorJS',
        'copy:buildClientAssets',
        'copy:buildClientSrcJS',
        'copy:buildServerVendorJS',
        'copy:buildServerSrcJS',
        'copy:buildServerSrcCS',
        'index:build'
    ]);

    /**
    * the `compile` task gets your app ready for deployment by concatenating and
    * minifying your code.
    */
    grunt.registerTask('compile', [
        'copy:compileClientAssets',
        'ngmin',
        'concat',
        'uglify',
        'index:compile'
    ]);

    /**
    * a utility function to get all app javascript sources.
    */
    function filterForJS(files) {
        return files.filter(function (file, index, array) {
            return file.match(/\.js$/);
        });
    }

    /**
    * a utility function to get all app css sources.
    */
    function filterForCss(files) {
        return files.filter(function (file, index, array) {
            return file.match(/\.css$/);
        });
    }

    /**
    * the index.html template includes the stylesheet and javascript sources
    * based on dynamic names calculated in this gruntfile. this task assembles
    * the list into variables for the template to use and then runs the
    * compilation.
    */
    grunt.registerMultiTask('index', 'Process index.html template', function () {
        var task = this;

        var dirre = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g');

        //for (var foo in this) {
        //    grunt.log.writeln(foo);
        //}
        var jsfiles = filterForJS(task.filesSrc).map(function (file) {
            return file.replace(dirre, '');
        });

        var cssfiles = filterForCss(task.filesSrc).map(function (file) {
            return file.replace(dirre, '');
        });

        grunt.file.copy('src/client/index.html', task.data.dir + '/client/index.html', {
            process: function (contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsfiles,
                        styles: cssfiles,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });
    ///**
    // * in order to avoid having to specify manually the files needed for karma to
    // * run, we use grunt to manage the list for us. the `karma/*` files are
    // * compiled as grunt templates for use by karma. yay!
    // */
    //grunt.registerMultiTask( 'karmaconfig', 'process karma config templates', function () {
    //    var jsfiles = filterforjs( this.filessrc );
    //    grunt.file.copy( 'karma/karma-unit.tpl.js', grunt.config( 'build_dir' ) + '/karma-unit.js', {
    //        process: function ( contents, path ) {
    //            return grunt.template.process( contents, {
    //                data: {
    //                    scripts: jsfiles
    //                }
    //            });
    //        }
    //    });
    //});
};


module.exports = toExport;

