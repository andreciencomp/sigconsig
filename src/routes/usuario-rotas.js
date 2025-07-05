const express = require('express');
const roteador = express.Router();;
const AuthMiddleware = require('../middleware/AuthMiddleware');
const UsuarioController = require('../controllers/UsuarioController');

const usuarioController = new UsuarioController();

roteador.post('/usuarios/cadastrar', AuthMiddleware.nivelAdmin, usuarioController.cadastrar);

roteador.put('/usuarios/atualizar/senha/', AuthMiddleware.nivelAutenticado, usuarioController.atualizarSenha);

module.exports = roteador;