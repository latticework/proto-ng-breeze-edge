
var express = require('express'),
    routes = require('./routes');

var app = express();

app.use(express.bodyParser());

app.configure(function () {  

    app.get('/todo', routes.getallTodoes);
    app.get('/todo/:todoid', routes.getTodoById);
    //app.get('/todobycriteria', routes.gettodoByCriteria);
    app.post('/todo', routes.saveChanges);

});

console.log('listing on port::' + 8080);
app.listen(8080);
