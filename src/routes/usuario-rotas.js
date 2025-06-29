const express = require('express');
const roteador = express.Router();;
const AuthMiddleware = require('../Middleware/AuthMiddleware');
const UsuarioController = require('../controllers/UsuarioController');

const usuarioController = new UsuarioController();

roteador.post('/usuarios/cadastrar',
    AuthMiddleware.nivelAdmin, usuarioController.cadastrar);

module.exports = roteador;