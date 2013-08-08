var toExport = function (grunt) {
    "use strict";

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-html2js');

    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-typescript');

    var userconfig = require('./build.config.js');

    var taskconfig = {
        pkg: grunt.file.readJSON("package.json"),
        meta: {
            banner: '/**\n' + ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' + ' * <%= pkg.homepage %>\n' + ' *\n' + ' * copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' + ' * licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' + ' */\n'
        },
        clean: [
            '<%= build_dir %>',
            '<%= compile_dir %>'
        ],
        copy: {
            build_assets: {
                files: [
                    {
                        src: ['**'],
                        dest: '<%= build_dir %>/assets/',
                        cwd: 'src/assets',
                        expand: true
                    }
                ]
            },
            build_appjs: {
                files: [
                    {
                        src: ['<%= app_files.js %>'],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendorjs: {
                files: [
                    {
                        src: ['<%= vendor_files.js %>'],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            compile_assets: {
                files: [
                    {
                        src: ['**'],
                        dest: '<%= compile_dir %>/assets',
                        cwd: '<%= build_dir %>/assets',
                        expand: true
                    }
                ]
            }
        },
        concat: {
            compile_js: {
                src: [
                    '<%= vendor_files.js %>',
                    'module.prefix',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.common.dest %>',
                    '<%= vendor_files.js %>',
                    'module.suffix'
                ],
                dest: '<%= compile_dir %>/assets/<%= pkg.name %>.js'
            }
        },
        ngmin: {
            compile: {
                files: [
                    {
                        src: ['<%= app_files.js %>'],
                        cwd: '<%= build_dir %>',
                        dest: '<%= build_dir %>',
                        expand: true
                    }
                ]
            }
        },
        uglify: {
            compile: {
                files: {
                    '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
                }
            }
        },
        jshint: {
            src: [
                '<%= app_files.js %>'
            ],
            test: [],
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
        html2js: {
            app: {
                options: {
                    base: 'src/app'
                },
                src: ['<%= app_files.atpl %>'],
                dest: '<%= build_dir %>/templates-app.js'
            },
            common: {
                options: {
                    base: 'src/common'
                },
                src: ['<%= app_files.ctpl %>'],
                dest: '<%= build_dir %>/templates-common.js'
            }
        },
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
        index: {
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= html2js.common.dest %>',
                    '<%= html2js.app.dest %>',
                    '<%= vendor_files.css %>'
                ]
            },
            compile: {
                dir: '<%= compile_dir %>',
                src: [
                    '<%= concat.compile_js.dest %>',
                    '<%= vendor_files.css %>'
                ]
            }
        },
        typescript: {
            src: {
                src: ['src/**/*.ts'],
                options: {
                    module: 'amd',
                    target: 'es5',
                    base_path: '',
                    sourcemap: true,
                    fullsourcemappath: true
                }
            },
            gruntmodules: {
                src: [
                    'build.config.ts',
                    'Gruntfile.ts'
                ],
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    base_path: '',
                    sourcemap: false
                }
            }
        },
        delta: {
            options: {
                livereload: true
            },
            gruntfile: {
                files: 'gruntfile.js',
                tasks: ['jshint:gruntfile'],
                options: {
                    livereload: false
                }
            },
            jssrc: {
                files: [
                    '<%= app_files.js %>'
                ],
                tasks: ['jshint:src', 'copy:build_appjs']
            },
            assets: {
                files: [
                    'src/assets/**/*'
                ],
                tasks: ['copy:build_assets']
            },
            html: {
                files: ['<%= app_files.html %>'],
                tasks: ['index:build']
            },
            tpls: {
                files: [
                    '<%= app_files.atpl %>',
                    '<%= app_files.ctpl %>'
                ],
                tasks: ['html2js']
            }
        }
    };

    grunt.initConfig(grunt.util._.extend(taskconfig, userconfig));

    grunt.renameTask('watch', 'delta');
    grunt.registerTask('watch', ['build', 'delta']);

    grunt.registerTask('default', ['build', 'compile']);

    grunt.registerTask('build', [
        'clean',
        'html2js',
        'jshint',
        'copy:build_assets',
        'copy:build_appjs',
        'copy:build_vendorjs',
        'index:build'
    ]);

    grunt.registerTask('compile', [
        'copy:compile_assets',
        'ngmin',
        'concat',
        'uglify',
        'index:compile'
    ]);

    function filterForJS(files) {
        return files.filter(function (file, index, array) {
            return file.match(/\.js$/);
        });
    }

    function filterForCss(files) {
        return files.filter(function (file, index, array) {
            return file.match(/\.css$/);
        });
    }

    var indexTaskFunction = function () {
        var task = this;

        var dirre = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g');

        var jsfiles = filterForJS(task.filesSrc).map(function (file) {
            return file.replace(dirre, '');
        });

        var cssfiles = filterForCss(task.filesSrc).map(function (file) {
            return file.replace(dirre, '');
        });

        grunt.file.copy('src/index.html', task.data.dir + '/index.html', {
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
    };

    grunt.registerMultiTask('index', 'Process index.html template', indexTaskFunction);
};


module.exports = toExport;

