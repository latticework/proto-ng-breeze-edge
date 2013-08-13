/// <reference path="gruntjs.d.ts" />

interface IGruntContribCleanConfigOptions {
    force?: boolean;
    "no-write"?: boolean;
}

interface IGruntContribCleanShortConfig extends Array<string> {
}

interface IGruntContribCleanMediumConfig {
    [target: string]: string[];
}

interface IGruntContribCleanLongConfig {
    [target: string]: string[];
}

