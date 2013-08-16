(function () {
    "use strict";
    var express = require('express');
    var routes = require('./routes');

    var app = express();

    app.configure(function () {
        app.use(express.bodyParser());
        app.use(express.static(__dirname + '/../client'));

        app.get('/api/todo', routes.getallTodoes);
        app.get('/api/todo/MetaData', routes.getMetadata);
        app.get('/api/todo/:todoid', routes.getTodoById);
        app.post('/api/todo', routes.saveChanges);

        app.get('/api/faketodo', routes.getallFakeTodoes);
        app.get('/api/faketodo/MetaData', routes.getFakeMetaData);
        app.get('/api/faketodo/:todoid', routes.getFakeTodoById);
        app.post('/api/faketodo', routes.saveFakeChanges);
    });
    console.log('listing on port::' + process.env.PORT);
    app.listen(process.env.PORT || 9000);
})();
