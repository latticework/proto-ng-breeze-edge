/*global module:false*/
/// <reference path="./Scripts/typings/gruntjs/gruntjs.d.ts" />
/// <reference path="./Scripts/typings/node/node.d.ts" />

// https://raw.github.com/joshdmiller/ng-boilerplate/v0.3.0-release/gruntfile.js
var toExport = function(grunt: IGrunt) {
    "use strict";
    /**
     * load required grunt tasks. these are installed based on the versions listed
     * in `package.json` when you do `npm install` in this directory.
     */
//    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
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
    var userconfig = require( './build.config.js' );


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
            banner: '/**\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' *\n' +
                ' * copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
                ' */\n'
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
        clean: [
            '<%= build_dir %>',
            '<%= compile_dir %>',
        ],

        /**
         * the `copy` task just copies files from a to b. we use it here to copy
         * our project assets (images, fonts, etc.) and javascripts into
         * `build_dir`, and then to copy the assets to `compile_dir`.
         */
        copy: {
            build_assets: {
                files: [
                    {
                        src: [ '**' ],
                        dest: '<%= build_dir %>/assets/',
                        cwd: 'src/assets',
                        expand: true,
                    }
                ]
            },
            build_appjs: {
                files: [
                    {
                        src: [ '<%= app_files.js %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendorjs: {
                files: [
                    {
                        src: [ '<%= vendor_files.js %>' ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            compile_assets: {
                files: [
                    {
                        src: [ '**' ],
                        dest: '<%= compile_dir %>/assets',
                        cwd: '<%= build_dir %>/assets',
                        expand: true
                    }
                ]
            }
        },

        /**
         * `grunt concat` concatenates multiple source files into a single file.
         */
        concat: {
            /**
             * the `compile_js` target is the concatenation of our application source
             * code and all specified vendor source code into a single file.
             */
            compile_js: {
//                options: {
//                    banner: '<%= meta.banner %>'
//                },
                src: [
                    '<%= vendor_files.js %>',
                    'module.prefix',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.common.dest %>',
                    '<%= vendor_files.js %>',
                    'module.suffix'
                ],
                dest: '<%= compile_dir %>/assets/<%= pkg.name %>.js',
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
                        src: [ '<%= app_files.js %>' ],
                        cwd: '<%= build_dir %>',
                        dest: '<%= build_dir %>',
                        expand: true
                    }
                ]
            }
        },

        /**
         * minify the sources!
         */
        uglify: {
            compile: {
//                options: {
//                    banner: '<%= meta.banner %>'
//                },
                files: {
                    '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
                }
            }
        },

//        keep until we figure out scss builds.
//        /**
//         * `recess` handles our less compilation and uglification automatically.
//         * only our `main.less` file is included in compilation; all other files
//         * must be imported from this file.
//         */
//        recess: {
//            build: {
//                src: [ '<%= app_files.less %>' ],
//                dest: '<%= build_dir %>/assets/<%= pkg.name %>.css',
//                options: {
//                    compile: true,
//                    compress: false,
//                    nounderscores: false,
//                    noids: false,
//                    zerounits: false
//                }
//            },
//            compile: {
//                src: [ '<%= recess.build.dest %>' ],
//                dest: '<%= recess.build.dest %>',
//                options: {
//                    compile: true,
//                    compress: true,
//                    nounderscores: false,
//                    noids: false,
//                    zerounits: false
//                }
//            }
//        },

        /**
         * `jshint` defines the rules of our linter as well as which files we
         * should check. this file, all javascript sources, and all our unit tests
         * are linted based on the policies listed in `options`. but we can also
         * specify exclusionary patterns by prefixing them with an exclamation
         * point (!); this is useful when code comes from a third party but is
         * nonetheless inside `src/`.
         */
        jshint: {
            src: [
                '<%= app_files.js %>'
            ],
            test: [
//                '<%= app_files.jsunit %>'
            ],
            gruntfile: [
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
                src: [ '<%= app_files.atpl %>' ],
                dest: '<%= build_dir %>/templates-app.js'
            },

            /**
             * these are the templates from `src/common`.
             */
            common: {
                options: {
                    base: 'src/common'
                },
                src: [ '<%= app_files.ctpl %>' ],
                dest: '<%= build_dir %>/templates-common.js'
            }
        },

        /**
         * the karma configurations.
         */
        karma: {
            options: {
                configfile: '<%= build_dir %>/karma-unit.js'
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
                    '<%= vendor_files.js %>',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= html2js.common.dest %>',
                    '<%= html2js.app.dest %>',
                    '<%= vendor_files.css %>',
//                    '<%= recess.build.dest %>'
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
                    '<%= concat.compile_js.dest %>',
                    '<%= vendor_files.css %>',
//                    '<%= recess.compile.dest %>'
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
//                    '<%= vendor_files.js %>',
//                    '<%= html2js.app.dest %>',
//                    '<%= html2js.common.dest %>',
//                    'vendor/angular-mocks/angular-mocks.js'
//                ]
//            }
//        },

            // typescript configuration for grunt.
            typescript: {
                src: {
                    src: ['src/**/*.ts'],
//                    dest: 'js',
                    options: {
                        module: 'amd',
                        target: 'es5',
                        base_path: '',
                        sourcemap: true,
                        fullsourcemappath: true,
//                        declaration: true,
                    },
                },
                gruntmodules: {
                    src: [
                        'build.config.ts',
                        'Gruntfile.ts',
                    ],
//                    dest: 'js',
                    options: {
//                        nolib: true,
                        module: 'commonjs',
                        target: 'es5', //or es3
                        base_path: '',
                        sourcemap: false,
//                        fullsourcemappath: true,
//                        declaration: true,
                    },
                },
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
                tasks: [ 'jshint:gruntfile' ],
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
                    '<%= app_files.js %>'
                ],
                tasks: [ 'jshint:src',/* 'karma:unit:run',*/ 'copy:build_appjs' ]
            },

            /**
             * when assets are changed, copy them. note that this will *not* copy new
             * files, so this is probably not very useful.
             */
            assets: {
                files: [
                    'src/assets/**/*'
                ],
                tasks: [ 'copy:build_assets' ]
            },

            /**
             * when index.html changes, we need to compile it.
             */
            html: {
                files: [ '<%= app_files.html %>' ],
                tasks: [ 'index:build' ]
            },

            /**
             * when our templates change, we only rewrite the template cache.
             */
            tpls: {
                files: [
                    '<%= app_files.atpl %>',
                    '<%= app_files.ctpl %>'
                ],
                tasks: [ 'html2js' ]
            },

//            /**
//             * when the css files change, we need to compile and minify them.
//             */
//            scss: {
//                files: [ 'src/**/*.scss' ],
//                tasks: [ 'recess:build' ]
//            },

//            /**
//             * when a javascript unit test file changes, we only want to lint it and
//             * run the unit tests. we don't want to do any live reloading.
//             */
//            jsunit: {
//                files: [
//                    '<%= app_files.jsunit %>'
//                ],
//                tasks: [ 'jshint:test', 'karma:unit:run' ],
//                options: {
//                    livereload: false
//                }
//            },
        }
    };

    grunt.initConfig( grunt.util._.extend( taskconfig, userconfig ) );


    /**
     * in order to make it safe to just compile or copy *only* what was changed,
     * we need to ensure we are starting from a clean, fresh build. so we rename
     * the `watch` task to `delta` (that's why the configuration var above is
     * `delta`) and then add a new task called `watch` that does a clean build
     * before watching for changes.
     */
    grunt.renameTask( 'watch', 'delta' );
    grunt.registerTask( 'watch', [ 'build',/* 'karma:unit',*/ 'delta' ] );

    /**
     * the default task is to build and compile.
     */
    grunt.registerTask( 'default', [ 'build', 'compile' ] );

    /**
     * the `build` task gets your app ready to run for development and testing.
     */
    grunt.registerTask( 'build', [
        'clean',
        'html2js',
        'jshint',
//        'recess:build',
        'copy:build_assets',
        'copy:build_appjs',
        'copy:build_vendorjs',
        'index:build',
//        'karma:continuous',
    ]);

    /**
     * the `compile` task gets your app ready for deployment by concatenating and
     * minifying your code.
     */
    grunt.registerTask( 'compile', [
//        'recess:compile',
        'copy:compile_assets',
        'ngmin',
        'concat',
        'uglify',
        'index:compile'
    ]);

    /**
     * a utility function to get all app javascript sources.
     */
    function filterForJS(files: string[]) {
        return files.filter((file, index, array) => <boolean><any>file.match(/\.js$/));
    }

    /**
     * a utility function to get all app css sources.
     */
    function filterForCss(files: string[]) {
        return files.filter((file, index, array) => <boolean><any>file.match(/\.css$/));
    }

    /**
     * the index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this gruntfile. this task assembles
     * the list into variables for the template to use and then runs the
     * compilation.
     */
    var indexTaskFunction = function () {
        var task = <IGruntRunningMultiTask>this;

        var dirre = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g');

        //for (var foo in this) {
        //    grunt.log.writeln(foo);
        //}

        var jsfiles = filterForJS(task.filesSrc ).map( function ( file ) {
            return file.replace( dirre, '' );
        });

        var cssfiles = filterForCss(task.filesSrc ).map( function ( file ) {
            return file.replace( dirre, '' );
        });

        grunt.file.copy('src/index.html', task.data.dir + '/index.html', {
            process: function ( contents, path ) {
                return grunt.template.process( contents, {
                    data: {
                        scripts: jsfiles,
                        styles: cssfiles,
                        version: grunt.config( 'pkg.version' )
                    }
                });
            }
        });
    }

    grunt.registerMultiTask('index', 'Process index.html template', indexTaskFunction);

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

export = toExport;