var edge = require('edge'),
    stringify = require('json-stringify-safe');

var assemblypath = __dirname + '../../../bin/proto_edge_cs_net45.dll',
    todoContexttype = 'proto_edge_cs_net45.TodoContext';

var getallTodoes = edge.func({
    assemblyFile: assemblypath,
    typeName: todoContexttype,
    methodName: 'GetAllTodoes'
});

var getTodoById = edge.func({
    assemblyFile: assemblypath,
    typeName: todoContexttype,
    methodName: 'GetTodo'
});

var gettodoByCriteria = edge.func({
    assemblyFile: assemblypath,
    typeName: todoContexttype,
    methodName: 'GettodoByCriteria'
});

exports.getallTodoes = function (req, res, next) {
    //getallTodoes(req.query, function (error, result) {
    getallTodoes(req.url, function (error, result) {
        if (error) throw error;
        res.send(result)
    });
};

exports.getTodoById = function (req, res, next) {    
    getTodoById(req.params.todoid, function (error, result) {
        if (error) throw error;
        res.send(result)
    });
};

var todoObject = {

    //title: 'todo title',
    completed: 'true',
    //todoId: 1    
};
var todoCriteria = stringify(todoObject, null, 2);

exports.gettodoByCriteria = function (req, res, next) {
    gettodoByCriteria(todoCriteria, function (error, result) {
        if (error) throw error;
        res.send(result)
    });
};
