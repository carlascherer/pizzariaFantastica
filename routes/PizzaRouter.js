const express = require('express');
const multer = require('multer');
const path = require('path');
// const { Router } = require('express'); (jeito 1 de chamar o Router)
const Router = express.Router(); // jeito 2 de chamar o Router
const pizzaController = require('../controllers/PizzaController')

const auth = require('../middlewares/auth');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join('public', 'img'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
var upload = multer({ storage });

Router.get('/', pizzaController.index);
Router.get('/pizza/:id', pizzaController.show);
Router.get('/create', auth, pizzaController.create);
Router.post('/create', auth, upload.any(), pizzaController.store);
Router.get('/edit/:id', auth,  pizzaController.edit);
Router.put('/edit/:id', auth, upload.any(), pizzaController.update);
Router.get('/search', pizzaController.search);

module.exports = Router;