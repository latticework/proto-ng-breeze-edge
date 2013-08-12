/// <reference path="gruntjs.d.ts" />

interface IGruntContribCleanConfigOptions {
    force?: boolean;
    "no-write"?: boolean;
}

interface IGruntConfig {
    clean?: IGruntContribCleanConfig;
}
