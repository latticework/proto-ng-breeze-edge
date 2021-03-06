/// <reference path="./Scripts/typings/npm/npm.d.ts" />
{
    "author": { "name": "Latticework" },
    "name": "proto-ng-breeze-edge",
    "version": "0.0.1",
    "description": "proto-ng-breeze-edge\r ====================",
    "homepage": "https://github.com/latticework/proto-ng-breeze-edge",
    "licenses": [
        {
            "type": "MIT",
            "url": "http://opensource.org/licenses/MIT"
        }
    ],
    "main": "release/server/server.js",
    "dependencies": {
        "edge": "~0.7.12",
        "express": "~3.3.4",
        "json-stringify-safe": "~5.0.0",
        "require": "~0.5.0",
        "time-grunt": "~0.1.1"
    },
    "devDependencies": {
        "grunt": "~0.4.1",
        "grunt-contrib-clean": "~0.5.0",
        "grunt-contrib-concat": "~0.3.0",
        "grunt-contrib-copy": "~0.4.1",
        "grunt-contrib-jshint": "~0.6.0",
        "grunt-contrib-qunit": "~0.2.2",
        "grunt-contrib-uglify": "~0.2.2",
        "grunt-contrib-watch": "~0.5.0",
        "grunt-contrib-sass": "~0.4.1",
        "grunt-html2js": "~0.1.6",
        "grunt-ngmin": "0.0.3",
        "grunt-typescript": "~0.2.1"
    },
    "scripts": {
        "start": "node ./debug/web/server.js",
        "test": "test"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/latticework/proto-ng-breeze-edge.git"
    },
    "keywords": [
        "angular",
        "angularjs",
        "breeze",
        "breezejs",
        "edge",
        "edgejs",
        "example"
    ],
    "bugs": {
        "url": "https://github.com/latticework/proto-ng-breeze-edge/issues"
    }
};
//# sourceMappingURL=package.js.map
