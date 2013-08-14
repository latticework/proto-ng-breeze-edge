/// <reference path="gruntjs.d.ts" />

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

interface IGruntContribCopyCompactConfig extends ITaskCompactConfig<IGruntContribCopyConfigOptions> { }
interface IGruntContribCopyFilesConfig extends ITaskFilesConfig<IGruntContribCopyConfigOptions> { }
interface IGruntContribCopyFilesArrayhConfig extends ITaskFilesArrayConfig<IGruntContribCopyConfigOptions, ITaskFilesObject> { }

interface IGruntContribCopyConfig extends IMultiTaskConfig<IGruntContribCopyConfigOptions> { }

interface IGruntConfig {
    copy?: IGruntContribCopyConfig;
}