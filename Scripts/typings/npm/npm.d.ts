// Type definitions for npm
// Project: https://npmjs.org/
// Definitions by: Kenneth Brubaker [https://github.com/kenbrubaker]
// Definitions: https://github.com/borisyankov/DefinitelyTyped

// npm documentation: https://npmjs.org/doc/

// package.json documentation: https://npmjs.org/doc/files/package.json.html


interface INpmPackageJson {
    name: string;
    version: string;
    description: string;
    keywords?: string[];
    homepage?: string;
    bugs?: {
        url?: string;
        email?: string;
    };
    license?: string;
    licenses?: {
        type: string;
        url: string;
    }[];
    author?: {
        name: string;
        email?: string;
        url?: string;
    };
    contributors?: {
        name: string;
        email?: string;
        url?: string;
    }[];
    files?: string[];
    main?: string;
    bin?: { [key: string]: string; };
    man?: string[];
    directories?: {
        lib?: string;
        bin?: string;
        man?: string;
        doc?: string;
        example?: string;
    };
    repository?: {
        type: string;
        url: string;
    }
    // package.scripts documentation : https://npmjs.org/doc/json.html
    scripts?: {
        prepublish?: string;
        publish?: string;
        postpublish?: string;
        preinstall?: string;
        install?: string;
        postinstall?: string;
        preuninstall?: string;
        uninstall?: string;
        postuninstall?: string;
        preupdate?: string;
        update?: string;
        postupdate?: string;
        pretest?: string;
        test?: string;
        posttest?: string;
        prestop?: string;
        stop?: string;
        poststop?: string;
        prestart?: string;
        start?: string;
        poststart?: string;
        prerestart?: string;
        restart?: string;
        postrestart?: string;
    };
    config?: any;
    dependencies?: { [packageName: string]: string; };
    devDependencies?: { [packageName: string]: string; };
    bundledDependencies?: string[];
    optionalDependencies?: { [packageName: string]: string; };
    engines?: {
        node: string;
        npm?: string;
    };
    engineStrict?: boolean;
    os?: string[];
    cpu?: string[];
    preferGlobal?: boolean;
    private?: boolean;
    publishConfig?: any;
}
