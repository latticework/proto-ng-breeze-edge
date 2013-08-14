(function() {
    "use strict";

    var edge = require('edge');
    var stringify = require('json-stringify-safe');

    var assemblypath = __dirname + '../../../bin/proto_edge_cs_net45.dll';
    var todoContexttype = 'proto_edge_cs_net45.TodoService';


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

    var saveChanges = edge.func({
        assemblyFile: assemblypath,
        typeName: todoContexttype,
        methodName: 'SaveChanges'
    });

    var getMetadata = edge.func({
        assemblyFile: assemblypath,
        typeName: todoContexttype,
        methodName: 'GetMetaData'
    });

    module.exports.getallTodoes = function (req, res, next) {
        //getallTodoes(req.query, function (error, result) {
        getallTodoes(req.url, function (error, result) {
            if (error) {throw error; }

            res.send(result);
        });
    };

    module.exports.getTodoById = function (req, res, next) {
        getTodoById(req.params.todoid, function (error, result) {
            if (error) {throw error; }

            res.send(result);
        });
    };

    module.exports.saveChanges = function (req, res, next) {

        //res.send(req.body);
        saveChanges(stringify(req.body, null, 2), function (error, result) {
            if (error) {throw error; }

            res.send(result);
        });
    };

    module.exports.getMetadata = function (req, res, next) {

        //res.send(req.body);
        getMetadata(null, function (error, result) {
            if (error) { throw error; }

            res.send(result);
        });

    };

}());
