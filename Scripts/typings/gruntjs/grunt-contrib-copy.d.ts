/// <reference path="gruntjs.d.ts" />

interface IGruntContribCopyConfigOptions {
}

interface IGruntContribCopyCompactConfig extends ITaskCompactConfig<IGruntContribCopyConfigOptions> { }
interface IGruntContribCopyCompactConfig extends ITaskFilesConfig<IGruntContribCopyConfigOptions> { }
interface IGruntContribCopyCompactConfig extends ITaskFilesArrayConfig<IGruntContribCopyConfigOptions, ITaskFilesObject> { }

interface IGruntContribCopyCompactConfig { }