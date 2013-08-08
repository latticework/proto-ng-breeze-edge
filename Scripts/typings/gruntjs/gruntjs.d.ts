// Type definitions for Grunt JS
// Project: http://gruntjs.com/
// Definitions by: Basarat Ali Syed <https://github.com/basarat>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


////////////////
/// To add plugins update the IGruntConfig using open ended interface syntax
////////////////
interface IGruntConfig {
    pkg?: any;
}

////////////////
/// Sample grunt plugin definition: 
/// uglify : https://github.com/gruntjs/grunt-contrib-uglify
////////////////
interface IGruntUglifyConfig {
    mangle?: boolean;
    compress?: boolean;
    beautify?: boolean;
    report?: any; // false / 'min' / 'gzip'
    sourceMap?: any; // String / Function 
    sourceMapRoot?: string;
    sourceMapIn?: string;
    sourceMappingURL?: any; // String / Function
    sourceMapPrefix?: number;
    wrap?: string;
    exportAll?: boolean;
    preserveComments?: any; // boolean / string / function 
    banner?: string;
}
interface IGruntConfig {
    uglify?: {
        options?: IGruntUglifyConfig;
        build?: {
            src: string;
            dest: string;
        };

    };
}


////////////////
// Grunt task object 
// http://gruntjs.com/api/grunt.task
////////////////
interface IGruntTaskBase {
    loadNpmTasks(pluginName: string);
    loadTasks(tasksPath: string);
    registerTask(taskName: string, taskList: string[]);
    registerTask(taskName: string, description: string, taskFunction: () => boolean);
    registerTask(taskName: string, description: string, taskFunction: () => void);
    registerMultiTask(taskName: string, description: string, taskFunction: () => boolean);
    registerMultiTask(taskName: string, description: string, taskFunction: () => void);
    renameTask(oldName: string, newName: string);
}

interface IGruntTask extends IGruntTaskBase {
    clearQueue();
    normalizeMultiTaskFiles(data: any, targetname?: string);
    run(...taskList: IGruntTask[]);
}

////////////////
// task members available in a task function.
// http://gruntjs.com/inside-tasks
////////////////
interface IGruntRunningTask extends IGruntTask {
    async(): (boolean) => void;
    options(defaultObj?: any);
    name: string;
    requires(...taskList: string[]);
    requiresConfig(...props: string[]);

    args: string[];
    errorCount: number;
    flags: any;
    nameArgs: string;
}

interface IGruntTaskFileObject {
    src: string[];
    dest: string;
}

interface IGruntRunningMultiTask extends IGruntTask {
    data: any;
    files: IGruntTaskFileObject[];
    filesSrc: string[];
    target: string;
}

////////////////
// Main Grunt object 
// http://gruntjs.com/api/grunt
////////////////
interface IGrunt extends IGruntTaskBase {
    // Config
    config: IGruntConfigObject;
    initConfig(config?: IGruntConfig);


    // Tasks
    task: any;

    // Errors
    warn: Function;
    fatal: Function;

    // Misc: 
    package: any;
    version: any;

    // File
    file: IGruntFileObject;

    // Event
    event: any;
    // Fail
    fail: any;
    // Log
    log: any;
    // Options
    option: any;
    // Template
    template: any;
    // Util
    util: any;
}

////////////////
/// Grunt Config object
/// http://gruntjs.com/api/grunt.config#accessing-config-data
////////////////
interface IGruntConfigObject {
    (...param: any[]): any;
    init: (config?: IGruntConfig) => void;
    get: Function;
    process: Function;
    getRaw: Function;
    set: Function;
    escape: (propString: string) => void;
    requires: Function;
}

////////////////
// Grunt File object
// http://gruntjs.com/api/grunt.file
////////////////
interface IGruntFileObjectOptionsSimple {
    encoding?: string;
}
interface IGruntFileObjectOptions extends IGruntFileObjectOptionsSimple {
    process?: Function;
    noProcess?: any;
}
interface IGruntFileObject {

    // Character encoding
    defaultEncoding: string;

    // Reading and writing
    read(filepath, options?: IGruntFileObjectOptionsSimple);
    readJSON(filepath, options?: IGruntFileObjectOptionsSimple);
    readYAML(filepath, options?: IGruntFileObjectOptionsSimple);
    write(filepath, contents, options?: IGruntFileObjectOptionsSimple);
    copy(srcpath, destpath, options?: IGruntFileObjectOptions);
    delete (filepath, options?: { force?: boolean; });

    // Directories
    mkdir(dirpath, mode?);
    recurse(rootdir, callback);

    // Globbing patterns
    expand(patterns);
    expand(options, patterns);
    expandMapping(patterns, dest, options?);
    match(patterns, filepaths);
    match(options, patterns, filepaths);
    isMatch(patterns, filepaths): boolean;
    isMatch(options, patterns, filepaths): boolean;

    // file types
    exists(...paths: any[]);
    isLink(...paths: any[]);
    isDir(...paths: any[]);
    isFile(...paths: any[]);

    // paths
    isPathAbsolute(...paths: any[]);
    arePathsEquivalent(...paths: any[]);
    isPathCwd(...paths: any[]);
    setBase(...paths: any[]);

    // External libraries
    glob: any;
    minimatch: any;
    findup: any;
}


////////////////
/// Globally called export function module.exports
////////////////

declare var exports: (grunt: IGrunt) => void;