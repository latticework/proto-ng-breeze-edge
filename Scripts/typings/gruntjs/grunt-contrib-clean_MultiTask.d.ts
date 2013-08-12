/// <reference path="gruntjs.d.ts" />

interface IGruntContribCleanConfigOptions {
    force?: boolean;
    "no-write"?: boolean;
}

interface IGruntContribCleanLongConfig extends ITaskCompactConfig<IGruntContribCleanConfigOptions> { }

interface IGruntContribClean extends IMultiTaskConfig<IGruntContribCleanConfigOptions> {
}

interface IGruntConfig {
    clean?: IGruntContribClean;
}
