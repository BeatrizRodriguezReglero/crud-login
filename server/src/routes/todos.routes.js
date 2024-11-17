const express = require('express');
const todosController = require('../controllers/todos.controller');
const todosRoutes = express.Router();

todosRoutes.get('/', todosController.getAllTodos);
todosRoutes.post('/', todosController.createTodo);
todosRoutes.patch('/:id', todosController.updateTodo);
todosRoutes.delete('/:id', todosController.deleteTodo);
/*
todosRoutes.post('/', usersController.postNewUser);
todosRoutes.patch('/:id', usersController.patchUsers);
todosRoutes.delete('/:id', usersController.deleteUsers);*/

module.exports = todosRoutes;
