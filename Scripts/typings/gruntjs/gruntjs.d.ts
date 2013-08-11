// Type definitions for Grunt JS
// Project: http://gruntjs.com/
// Definitions by: Basarat Ali Syed <https://github.com/basarat>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


////////////////
/// Grunt task config object:
/// "config-name" : http://gruntjs.com/configuring-tasks
//interface ITaskConfig<TOptions> {
//    options?: TOptions;
//}

//interface ITaskWithFilesConfig<TOptions> extends ITaskConfig<TOptions> {
//    src: string[];
//    dest?: string;
//}

//interface IMultiTaskConfig<TOptions, TTaskWithFilesConfig extends ITaskWithFilesConfig<TOptions>> {
//    options?: TOptions;
//    [task: string]: TTaskWithFilesConfig;
//}

////////////////
/// NPM Package config object:
/// package.json : https://npmjs.org/doc/json.html
////////////////
interface INpmPackageConfig {
    name: string;
    version: string;
    description: string;
    keywords?: string[];
    homepage?: string;
    bugs?: {
        url?: string;
        email?: string;
    };
    license?: string;
    licenses?: {
        type: string;
        url: string;
    }[];
    author?: {
        name: string;
        email?: string;
        url?: string;
    };
    contributors?: {
        name: string;
        email?: string;
        url?: string;
    }[];
    files?: string[];
    main?: string;
    bin?: { [key: string]: string; };
    man?: string[];
    directories?: {
        lib?: string;
        bin?: string;
        man?: string;
        doc?: string;
        example?: string;
    };
    repository?: {
        type: string;
        url: string;
    }
    ////////////////
    /// NPM Package lifecycle command line scripts object:
    /// package.scripts : https://npmjs.org/doc/json.html
    ////////////////
    scripts?: {
        prepublish?: string;
        publish?: string;
        postpublish?: string;
        preinstall?: string;
        install?: string;
        postinstall?: string;
        preuninstall?: string;
        uninstall?: string;
        postuninstall?: string;
        preupdate?: string;
        update?: string;
        postupdate?: string;
        pretest?: string;
        test?: string;
        posttest?: string;
        prestop?: string;
        stop?: string;
        poststop?: string;
        prestart?: string;
        start?: string;
        poststart?: string;
        prerestart?: string;
        restart?: string;
        postrestart?: string;
    };
    config?: any;
    dependencies?: { [packageName: string]: string; };
    devDependencies?: { [packageName: string]: string; };
    bundledDependencies?: string[];
    optionalDependencies?: { [packageName: string]: string; };
    engines?: {
        node: string;
        npm?: string;
    };
    engineStrict?: boolean;
    os?: string[];
    cpu?: string[];
    preferGlobal?: boolean;
    "private"?: boolean;
    publishConfig?: any;
}

////////////////
/// To add plugins update the IGruntConfig using open ended interface syntax
////////////////
interface IGruntConfig {
    pkg?: INpmPackageConfig;
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
    requires(...taskList: string[]);
    requiresConfig(...props: string[]);

    args: string[];
    errorCount: number;
    flags: any;
    name: string;
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
    util: IGruntUtilObject;
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

interface ILoDash {
    extend : Function;
}

interface IGruntUtilObject {
    _: ILoDash;
}


////////////////
/// Globally called export function module.exports
////////////////

//declare var exports: (grunt: IGrunt) => void;