// Type definitions for Grunt JS
// Project: http://gruntjs.com/
// Definitions by: Basarat Ali Syed <https://github.com/basarat>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


////////////////
/// Grunt task config object:
/// "config-name" : http://gruntjs.com/configuring-tasks
////////////////

interface ITaskConfig<TOptions> {
    options?: TOptions;
}

interface IGruntTaskFileMappingProperties {
    /** 
     * Either a valid fs.Stats method name or a function that is passed the matched src filepath and returns true or 
     * false. 
     */
    filter?: any;
    /** 
     * When a match is not found, return a list containing the pattern itself. Otherwise, an empty list is returned if 
     * there are no matches. Combined with grunt's --verbose flag, this option can help debug file path issues. 
     */
    nonnull?: boolean;
    /** 
     * Allow patterns to match filenames starting with a period, even if the pattern does not explicitly have a period 
     * in that spot. 
    */
    dot?: boolean;
    /**
     * If set, patterns without slashes will be matched against the basename of the path if it contains slashes. For 
     * example, a?b would match the path / xyz / 123 / acb, but not / xyz / acb / 123.
     */
    matchBase?: boolean;
    /** Process a dynamic src - dest file mapping. Set to true to enable the following options. */
    expand?: boolean;
    /** All src matches are relative to (but don't include) this path. */
    cwd?: string;
    /** place any existing extension with this value in generated dest paths. */
    ext?: string;
    /** Remove all path parts from generated dest paths. */
    flatten?: boolean;
    /**
     * This function is called for each matched src file, (after extension renaming and flattening). The dest and 
     * matched src path are passed in, and this function must return a new dest value. If the same dest is returned 
     * more than once, each src which used it will be added to an array of sources for it.
     */
    rename?: (src: string, dest: string) => string;
}

interface ITaskCompactConfig<TOptions> extends ITaskConfig<TOptions>, IGruntTaskFileMappingProperties {
    src: string[];
    dest?: string;
}

interface ITaskFilesConfig<TOptions> extends ITaskConfig<TOptions> {
    files: {
        [dest: string]: string[];
    };
}

interface ITaskFilesObject extends IGruntTaskFileMappingProperties  {
    src: string[];
    dest?: string;
}

/**
 * This form supports multiple src-dest file mappings per-target, while also allowing additional properties per mapping.
 */
interface ITaskFilesArrayConfig<TOptions, TTaskFilesObject extends ITaskFilesObject>
    extends ITaskConfig<TOptions> {
    /** An array of ITaskFilesObject or subtype that supports additional properties */
    files: TTaskFilesObject[];
}

interface IMultiTaskConfig<TOptions> {
    options?: TOptions;
    [task: string]: any;
}

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
    /** Defines properties to be used by other Grunt tasks. banner is already defined. */
    meta?: {
        /** Comment that goes at the top of concatenated or minified project files. Usually contains tempalte tags. */
        banner: string;
    }
}

////////////////
/// Sample grunt plugin definition: 
/// uglify : https://github.com/gruntjs/grunt-contrib-uglify
////////////////
interface IGruntContribUglifyConfigOptions {
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

// Backwards compatability.
interface IGruntUglifyConfig extends IGruntContribUglifyConfigOptions { }

interface ITaskGruntContribUglifyCompactConfig extends ITaskCompactConfig<IGruntContribUglifyConfigOptions> { }
interface ITaskGruntContribUglifyFilesConfig extends ITaskFilesConfig<IGruntContribUglifyConfigOptions> { }
interface ITaskGruntContribUglifyFilesArrayConfig extends ITaskFilesArrayConfig<IGruntContribUglifyConfigOptions, ITaskFilesObject> { }

interface IGruntContribUglifyConfig extends IMultiTaskConfig<IGruntContribUglifyConfigOptions> { }


interface IGruntConfig {
    uglify?: IGruntContribUglifyConfig;
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
// Grunt template object 
// http://gruntjs.com/api/grunt.template
////////////////
/** Options object for the IGruntTemplate.process function. */
interface IGruntTemplateProcessOptions {
    /** Object used as data object. Default is the entire config object. */
    data?: any;
    /** Name of the delimiter set to use as specified by IGruntTemplate.addDelimiters. Default is 'config'. */
    delimiters?: string;
}

/** 
 * Template strings can be processed manually using the provided template functions. In addition, the config.get 
 * method (used by many tasks) automatically expands <% %> style template strings specified as config data inside the 
 * Gruntfile.
 */
interface IGruntTemplate {
    /** 
     * Process a Lo-Dash template string. The template argument will be processed recursively until there are no more 
     * templates to process.
     * @param template The template to process
     * @param options An IGruntTemplateProcessOptions object
     */
    process: (template: string, options?: IGruntTemplateProcessOptions) => string;
    /** 
     * Set the Lo-Dash template delimiters to a predefined set in case grunt.util._.template needs to be called 
     * manually. The config delimiters <% %> are included by default. You probably won't need to use this method, 
     * because you'll be using grunt.template.process which uses this method internally.
     * @param name Name of the delimiter set to use as specified by IGruntTemplate.addDelimiters. Default is 'config'.
     */
    setDelimiters: (name: string) => void;
    /**
     * Add a named set of Lo-Dash template delimiters. You probably won't need to use this method, because the built-
     * in delimiters should be sufficient, but you could always add {% %} or [% %] style delimiters.
     * @param name Name of the delimiter set to add.
     * @param opener Text of the open template delimiter. e.g.: '<%'
     * @param closer Text of the close template delimiter. e.g.: '%>'
     */
    addDelimiters: (name: string, opener: string, closer: string) => void;

    /**
     * Format a date using the node dateformat library.
     * @param date: The date to format
     * @param format: The dateformat format string
     */
    date: (date: number, format: string) => string;

    /**
     * Format today's date using the node dateformat library.
     * @param format: The dateformat format string
     */
    today: (format: string) => string;
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
    template: IGruntTemplate;
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