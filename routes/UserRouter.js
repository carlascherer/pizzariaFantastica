const express = require('express');
const Router = express.Router();
const userController = require('../controllers/UserController');

Router.get('/', userController.index);
Router.get('/cadastro', userController.create);
Router.post('/cadastro', userController.store);
Router.get('/login', userController.show);
Router.post('/login', userController.login);

module.exports = Router;