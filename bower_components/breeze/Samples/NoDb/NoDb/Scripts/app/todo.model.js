﻿(function (ko, breeze, datacontext) {
    
    // Extract Breeze metadata definition types
    var DataType = breeze.DataType;
    var EntityType = breeze.EntityType;
    var DataProperty = breeze.DataProperty;
    var NavigationProperty = breeze.NavigationProperty;
    var AutoGeneratedKeyType = breeze.AutoGeneratedKeyType;
    var Validator = breeze.Validator;

    // The empty metadataStore to which we add types
    var store = datacontext.metadataStore;
    addTodoItemType(store);
    addTodoListType(store);

    // Type definitions

    function addTodoItemType(store) {
        store.addEntityType({
            shortName: "TodoItem",
            namespace: "NoDb.Models",
            autoGeneratedKeyType: AutoGeneratedKeyType.Identity,
            dataProperties: {
                todoItemId: { dataType: DataType.Int32, isNullable: false, isPartOfKey: true },
                title: { dataType: DataType.String, maxLength: 30, isNullable: false, 
                    validators: [ Validator.required(), Validator.maxLength( {maxLength: 30})]     // Add client-side validation to 'title' 
                },
                isDone: { dataType: DataType.Boolean,  isNullable: false },
                todoListId: { dataType: DataType.Int32, isNullable: false }
            },
            navigationProperties: {
                // returns a single parent TodoList and associates with TodoList.Todos
                todoList: { entityTypeName: "TodoList", isScalar: true, foreignKeyNames: ["todoListId"],  associationName: "TodoList_Items" } 
            }
        });

        store.registerEntityTypeCtor("TodoItem", null, todoItemInitializer);
    }

    function todoItemInitializer(todoItem) {
        todoItem.errorMessage = ko.observable();
    }
   
    function addTodoListType(store) {
        store.addEntityType({
            shortName: "TodoList",
            namespace: "NoDb.Models",
            autoGeneratedKeyType: AutoGeneratedKeyType.Identity,
            dataProperties: {
                todoListId: { dataType: DataType.Int32, isNullable: false, isPartOfKey: true },
                title: { dataType: DataType.String, maxLength: 30, isNullable: false }
            },
            navigationProperties: {
                // returns a collection of TodoItems -- associates with TodoItem.TodoList
                todos: { entityTypeName: "TodoItem", isScalar: false, associationName: "TodoList_Items" }
            }
        });

        var TodoList = function () {
            this.title = "My todos";
        };

        TodoList.prototype.addTodo = function () {
            if (this.newTodoTitle()) {
                var todoItem = datacontext.createTodoItem(
                {
                    title: this.newTodoTitle()
                    //, todoList: this  // can't set a navigation property in an initalizer ?
                });
                todoItem.todoList(this); // ... therefore must assign AFTER creation
                datacontext.saveNewTodoItem(todoItem);
                this.newTodoTitle("");
            }
        };

        TodoList.prototype.deleteTodo = function () { // "this" is the TodoItem
            return datacontext.deleteTodoItem(this);
        };

        store.registerEntityTypeCtor("TodoList", TodoList, todoListInitializer);
    }

    function todoListInitializer(todoList) {
        todoList.errorMessage = ko.observable();
        todoList.isEditingListTitle = ko.observable(false);
        todoList.newTodoTitle = ko.observable();
    }


    
})(ko, breeze, todoApp.datacontext);

