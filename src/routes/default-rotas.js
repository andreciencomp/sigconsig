const express = require('express');
const roteador = express.Router();
const DefaultController = require('../controllers/DefaultController');

const defaultController = new DefaultController();
roteador.get('/', defaultController.index);

module.exports = roteador;