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
    });
    console.log('listing on port::' + process.env.PORT);
    app.listen(process.env.PORT || 9000);
})();
