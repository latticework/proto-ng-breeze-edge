/// <reference path="gruntjs.d.ts" />

/** Configuration options object of the grunt-contrib-copy task */
interface IGruntContribCopyConfigOptions {
    /** 
     * Returns the processed contents of the specified file. 
     * @param content The original file contents.
     * @param srcpath The file path of the file to process. 
     */
    processContent?: (content: string, srcPath: string) => string;
    
    // Eventually passed to grunt.files.match and normalized to array of string, so we pick array of string.
    /** Array of patterns to match that will not be processed */
    processContentExclude?: string[];
}

/** Compact version of the grunt-contrib-copy target configuration object. */
interface IGruntContribCopyCompactConfig extends ITaskCompactConfig<IGruntContribCopyConfigOptions> { }
/** Files version of the grunt-contrib-copy target configuration object. */
interface IGruntContribCopyFilesConfig extends ITaskFilesConfig<IGruntContribCopyConfigOptions> { }
/** Files Array version of the grunt-contrib-copy target configuration object. */
interface IGruntContribCopyFilesArrayConfig extends ITaskFilesArrayConfig<IGruntContribCopyConfigOptions, ITaskFilesObject> { }

/** 
 * Configuration object of the grunt-contrib-copy task. Cast target object to one of IGruntContribCopyCompactConfig
 * IGruntContribCopyFilesConfig, or IGruntContribCopyFilesArrayConfig.
 */
interface IGruntContribCopyConfig extends IMultiTaskConfig<IGruntContribCopyConfigOptions> { }

interface IGruntConfig {
    copy?: IGruntContribCopyConfig;
}