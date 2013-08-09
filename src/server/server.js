
var express = require('express'),
    routes = require('./routes');

var app = express();

app.configure(function () {

    //http://localhost:8080/todo
    //http://localhost:8080/todo?$top=2
    //http://localhost:8080/todo?$filter=Completed%20eq%20true
    //http://localhost:8080/todo?$top=2&$filter=Completed%20eq%20true      
    app.get('/todo', routes.getallTodoes);
    app.get('/todo/:todoid', routes.getTodoById);
    app.get('/todobycriteria', routes.gettodoByCriteria);    
});

console.log('listing on port::' + 8080);
app.listen(8080);
