const express = require('express');
const userController = require('../controllers/users.controller');
const usersRoutes = express.Router();

usersRoutes.get('/', userController.getUsers);
usersRoutes.delete('/:id', userController.deleteUser);
usersRoutes.patch('/:id', userController.patchUser);

module.exports = usersRoutes;
