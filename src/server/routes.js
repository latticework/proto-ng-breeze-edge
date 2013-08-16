(function() {
    "use strict";

    var edge = require('edge');
    var stringify = require('json-stringify-safe');

    var assemblypath = __dirname + '/bin/proto_edge_cs_net45.dll';
    var todoContexttype = 'proto_edge_cs_net45.TodoController';


    var getallTodoes = edge.func({
        assemblyFile: assemblypath,
        typeName: todoContexttype,
        methodName: 'GetTodoes'
    });

    var getTodoById = edge.func({
        assemblyFile: assemblypath,
        typeName: todoContexttype,
        methodName: 'GetTodoById'
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

    var getallFakeTodoes = edge.func({
        assemblyFile: assemblypath,
        typeName: todoContexttype,
        methodName: 'GetFakeTodoes'
    });

    var getFakeTodoById = edge.func({
        assemblyFile: assemblypath,
        typeName: todoContexttype,
        methodName: 'GetFakeTodoById'
    });

    var saveFakeChanges = edge.func({
        assemblyFile: assemblypath,
        typeName: todoContexttype,
        methodName: 'SaveFakeChanges'
    });

    var getFakeMetaData = edge.func({
        assemblyFile: assemblypath,
        typeName: todoContexttype,
        methodName: 'GetFakeMetaData'
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

   
    module.exports.getallFakeTodoes = function (req, res, next) {        
        getallFakeTodoes(req.url, function (error, result) {
            if (error) { throw error; }

            res.send(result);
        });
    };

    module.exports.getFakeTodoById = function (req, res, next) {
        getFakeTodoById(req.params.todoid, function (error, result) {
            if (error) { throw error; }

            res.send(result);
        });
    };

    module.exports.saveFakeChanges = function (req, res, next) {

        //res.send(req.body);
        saveFakeChanges(stringify(req.body, null, 2), function (error, result) {
            if (error) { throw error; }

            res.send(result);
        });
    };

    module.exports.getFakeMetaData = function (req, res, next) {

        //res.send(req.body);
        getFakeMetaData(null, function (error, result) {
            if (error) { throw error; }
            res.send(result);
        });

    };

}());
