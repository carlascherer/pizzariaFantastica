const express = require('express');

// const { Router } = require('express'); (jeito 1 de chamar o Router)

const Router = express.Router(); // jeito 2 de chamar o Router
const pizzaController = require('../controllers/PizzaController')

Router.get('/', pizzaController.index);
Router.get('/pizza/:id', pizzaController.show);
Router.get('/create', pizzaController.create);
Router.post('/create', pizzaController.store);
Router.get('/edit/:id', pizzaController.edit);
Router.post('/edit/:id', pizzaController.update);

module.exports = Router;