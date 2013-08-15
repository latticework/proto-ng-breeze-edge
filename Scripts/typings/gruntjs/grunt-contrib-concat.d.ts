/// <reference path="gruntjs.d.ts" />

/** Configuration options for the IGruntContribConcatConfigOptions.stripBanners property */
interface IGruntContribConcatStripBannerOptions {
    /** If true all all block comments are removed, even those that begin with the exclamation point (!). */
    block?: boolean;
    /** If true, any contiguous leading // line comments are stripped. */
    line?: boolean;
}

/** Configuration options object of the grunt-contrib-concat task */
interface IGruntContribConcatConfigOptions {
    /** 
     * Concatenated files will be joined on this string. If you're post-processing concatenated JavaScript files with a 
     * minifier, you may need to use a semicolon ';' as the separator. Default is grunt.util.linefeed.
     */
    separator?: string;

    /**
     * This string will be prepended to the beginning of the concatenated output. It is processed using 
     * grunt.template.process, using the default options. (Default processing options are explained in the 
     * grunt.template.process documentation.)  Default is empty string.
     */
    banner?: string;

    /**
     * This string will be appended to the end of the concatenated output. It is processed using 
     * grunt.template.process, using the default options. (Default processing options are explained in the 
     * grunt.template.process documentation.)  Default is empty string.
     */
    footer?: string;

    /** 
     * Strip JavaScript banner comments from source files. If false, no comments are stripped. If true, block comments 
     * are stripped unless they begin with the exclamation point (!). If an IGruntContribConcatStripBannerOptions, 
     * uses those settings.
     */
    stripBanners?: any;

    /**
     * Process source files before concatenating, either as grunt templates or with a custom function. If false, no 
     * processing will occur. If true, files will be processed using grunt.template.process defaults.
     */
    process?: any;
}

/** Compact version of the grunt-contrib-concat target configuration object. */
interface IGruntContribConcatCompactConfig extends ITaskCompactConfig<IGruntContribConcatConfigOptions> { }
/** Files version of the grunt-contrib-concat target configuration object. */
interface IGruntContribConcatFilesConfig extends ITaskFilesConfig<IGruntContribConcatConfigOptions> { }
/** Files Array version of the grunt-contrib-concat target configuration object. */
interface IGruntContribConcatFilesArrayConfig extends ITaskFilesArrayConfig<IGruntContribConcatConfigOptions, ITaskFilesObject> { }

/** 
 * Configuration object of the grunt-contrib-concat task. Cast target object to one of IGruntContribConcatCompactConfig
 * IGruntContribConcatFilesConfig, or IGruntContribConcatFilesArrayConfig.
 */
interface IGruntContribConcatConfig extends IMultiTaskConfig<IGruntContribConcatConfigOptions> { }

interface IGruntConfig {
    concat?: IGruntContribConcatConfig;
}