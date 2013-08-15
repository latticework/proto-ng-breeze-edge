/// <reference path="gruntjs.d.ts" />

/**
 * Options object for grunt-contrib-clean task.
 */
interface IGruntContribCleanConfigOptions {
    /** 
     * This overrides this task from blocking deletion of folders outside current working dir (CWD). Use with caution. 
     * Default is false.
     */
    force?: boolean;
    /** 
     * Will log messages of what would happen if the task was ran but doesn't actually delete the files. Default is 
     * false. 
     */
    "no-write"?: boolean;
    /** 
     * Will log messages of what would happen if the task was ran but doesn't actually delete the files. Default is 
     * false. 
     */
    nowrite?: boolean;
}

/** Non-MultiTask version of the grunt-contrib-clean task. */
interface IGruntContribCleanTaskConfig extends ITaskCompactConfig<IGruntContribCleanConfigOptions> { }

/** Target object for the MultiTask version of the grunt-contrib-clean task. */
interface IGruntContribCleanLongConfig extends ITaskCompactConfig<IGruntContribCleanConfigOptions> { }
/** MultiTask version of the grunt-contrib-clean task. */
interface IGruntContribCleanMultiTaskConfig extends IMultiTaskConfig<IGruntContribCleanConfigOptions> { }

//interface IGruntConfig {
//    /**
//     * grunt-contrib-clean. Clean files and folders. Array of paths to delete.
//     */
//    clean?: string[];
//    // or
//    /**
//     * grunt-contrib-clean. Clean files and folders. Set src to list of paths to delete.
//     */
//    clean?: IGruntContribCleanTaskConfig;
//    // or
//    /**
//     * grunt-contrib-clean. Clean files and folders. Cast MultiTask objects to IGruntContribCleanLongConfig.
//     */
//    clean?: IGruntContribCleanMultiTaskConfig;
//}
