/// <reference path="gruntjs.d.ts" />

// grunt-contrib-sass: See https://github.com/gruntjs/grunt-contrib-sass.

///** 
// * Output style options for IGruntContribSassConfigOptions.style property. Use 
// * GruntContribSassConfigOutputStyle[GruntContribSassConfigOutputStyle.nested] stlye to get the string representation 
// * for the property.
// */
//declare enum GruntContribSassConfigOutputStyle {
//    nested,
//    compact,
//    compressed,
//    expanded,
//}

/** Configuration options object of the grunt-contrib-sass task */
interface IGruntContribSassConfigOptions {
    /**
     * Enable Source Maps. Requires Sass 3.3.0, which can be installed with gem install sass --pre. Default is false.
     */
    sourcemap?: boolean;
    /** Show a full traceback on error. Default is false. */
    trace?: boolean;
    /** Force Unix newlines in written files. Default is false on Windows, otherwise true. */
    unixNewlines?: boolean;
    /** Just check syntax, don't evaluate. Default is false. */
    check?: boolean;
    /** 
     * Output style. Use GruntContribSassConfigOutputStyle[GruntContribSassConfigOutputStyle.nested]. Default is 
     * "nested".  
     */
    style?: string;
    /** How many digits of precision to use when outputting decimal numbers. Default is 3. */
    precision?: number;
    /** Silence warnings and status messages during compilation. Default is false. */
    quiet?: boolean;
    /** 
     * Make Compass imports available and load project configuration (config.rb located close to the Gruntfile.js). 
     * Default is false. 
     */
    compass?: boolean;
    /** 
     * Emit extra information in the generated CSS that can be used by the FireSass Firebug plugin. Default is false.
     */
    debugInfo?: boolean;
    /** Emit comments in the generated CSS indicating the corresponding source line. Default is false. */
    lineNumbers?: boolean;
    /** 
     * Add a (or multiple) Sass import paths. This typescript interface requires an array. Underlying object does not. 
     */
    loadPath?: string[];
    /** 
     * Require a (or multiple) Ruby library before running Sass. This typescript interface requires an array. 
     * Underlying object does not.
     */
    require?: string[];
    /** The path to put cached Sass files. Default is ".sass-cache". */
    cacheLocation?: string;
    /** Don't cache to sassc files. Default is false. */
    noCache?: boolean;
    /** Run sass with bundle exec, I,.e.: bundle exec sass. Default is false. */
    bundleExec?: boolean;
    /** 
     * Prepend the specified string to the output file. Useful for licensing information. Default is an empty string. 
     */
    banner?: string;
}


/** Compact version of the grunt-contrib-concat target configuration object. */
interface IGruntContribSassCompactConfig extends ITaskCompactConfig<IGruntContribSassConfigOptions> { }
/** Files version of the grunt-contrib-concat target configuration object. */
interface IGruntContribSassFilesConfig extends ITaskFilesConfig<IGruntContribSassConfigOptions> { }
/** Files Array version of the grunt-contrib-concat target configuration object. */
interface IGruntContribSassFilesArrayConfig extends ITaskFilesArrayConfig<IGruntContribSassConfigOptions, ITaskFilesObject> { }

/** 
 * Configuration object of the grunt-contrib-concat task. Cast target object to one of IGruntContribSassCompactConfig
 * IGruntContribSassFilesConfig, or IGruntContribSassFilesArrayConfig.
 */
interface IGruntContribSassConfig extends IMultiTaskConfig<IGruntContribSassConfigOptions> { }

interface IGruntConfig {
    sass?: IGruntContribSassConfig;
}