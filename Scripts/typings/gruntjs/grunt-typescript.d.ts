/// <reference path="gruntjs.d.ts" />

/**
 * Options object for grunt-typescript task.
 */
interface IGruntTypescriptConfigOptions {
    /** Do not include a default lib.d.ts with global declarations. */
    nolib?: boolean;
    /** Specify ECMAScript target version: "ES3" or "ES5". Default is "ES3". */
    target?: string;
    /** Specify module code generation: "commonjs" or "amd". */
    module?: string;
    /** Generates corresponding .map files. Default is false. */
    sourcemap?: boolean;
    /** Writes the full path of map file in the generated js file. Default is false. */
    fullSourceMapPath?: boolean;
    /** Generates corresponding .d.ts file. */
    declaration?: boolean;
    /** Emit comments to output. */
    comments?: boolean;
    /** Warn on expressions and declarations with an implied 'any' type. Default is false. */
    noImplicitAny?: boolean;
    /** 
     * Allow 'bool' as a synonym for 'boolean'. This feature is deprecated and will not be included in Typescript 1.x. 
     * Default is false.
     */
    allowbool?: boolean;
    /** 
     * Allow 'module(...)' as a synonym for 'require(...)'. This feature is deprecated and will not be included in 
     * Typescript 1.x. Default is false.*/
    allowimportmodule?: boolean;
    ignoreTypeCheck?: boolean;
    base_path?: string;
    /** Do not allow auto semicolon insertion. this option is experimental. */
    disallowAsi?: boolean;
}

/** Compact version of the grunt-contrib-concat target configuration object. */
interface IGruntTypescriptCompactConfig extends ITaskCompactConfig<IGruntTypescriptConfigOptions> { }
/** Files version of the grunt-contrib-concat target configuration object. */
interface IGruntTypescriptFilesConfig extends ITaskFilesConfig<IGruntTypescriptConfigOptions> { }
/** Files Array version of the grunt-contrib-concat target configuration object. */
interface IGruntTypescriptFilesArrayConfig extends ITaskFilesArrayConfig<IGruntTypescriptConfigOptions, ITaskFilesObject> { }

/** 
 * Configuration object of the grunt-typescript task. Cast target object to one of IGruntTypescriptCompactConfig
 * IGruntTypescriptFilesConfig, or IGruntTypescriptFilesArrayConfig.
 */
interface IGruntTypescriptConfig extends IMultiTaskConfig<IGruntTypescriptConfigOptions> { }

interface IGruntConfig {
    typescript?: IGruntTypescriptConfig;
}