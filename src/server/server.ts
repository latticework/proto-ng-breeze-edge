/*global module:false*/
/// <reference path="../../Scripts/typings/node/node.d.ts" />
(function () {
    "use strict";
    var express = require('express');
    var routes = require('./routes');

    var app = express();

    app.configure(function () {
        app.use(express.bodyParser());
        app.use(express.static(__dirname + '/../client'));

        app.get('/todo', routes.getallTodoes);
        app.get('/todo/MetaData', routes.getMetadata);
        app.get('/todo/:todoid', routes.getTodoById);
        app.post('/todo', routes.saveChanges);

    });
    console.log('listing on port::' + process.env.PORT);
    app.listen(process.env.PORT || 9000);

})();