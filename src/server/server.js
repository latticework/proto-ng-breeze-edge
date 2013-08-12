
var express = require('express'),
    routes = require('./routes');

var app = express();

app.configure(function () {
    app.use(express.bodyParser());
});

app.configure(function () {

    app.get('/todo', routes.getallTodoes);
    app.get('/todo/MetaData', routes.getMetadata);
    app.get('/todo/:todoid', routes.getTodoById);    
    app.post('/todo', routes.saveChanges);   

});

console.log(app.settings.env);
console.log('listing on port::' + 8080);
app.listen(8080); 
