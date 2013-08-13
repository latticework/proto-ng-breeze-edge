/// <reference path="gruntjs.d.ts" />

interface IGruntContribCleanConfigOptions {
    force?: boolean;
    "no-write"?: boolean;
}

interface IGruntContribCleanConfig extends ITaskCompactConfig<IGruntContribCleanConfigOptions> { }

//interface IGruntConfig {
//    clean?: IGruntContribCleanConfig;
//}
