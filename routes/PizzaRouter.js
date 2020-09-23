const express = require('express');
const multer = require('multer');
const path = require('path');

// const { Router } = require('express'); (jeito 1 de chamar o Router)

const Router = express.Router(); // jeito 2 de chamar o Router
const pizzaController = require('../controllers/PizzaController')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('public', 'img'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

Router.get('/', pizzaController.index);
Router.get('/pizza/:id', pizzaController.show);
Router.get('/create', pizzaController.create);
Router.post('/create', upload.any(), pizzaController.store);
Router.get('/edit/:id', pizzaController.edit);
Router.put('/edit/:id', upload.any(), pizzaController.update);
Router.get('/search', pizzaController.search);

module.exports = Router;