const express = require('express');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const EstadoController = require('../controllers/EstadoController');
const estadoRouter = express.Router();

const estadoController = new EstadoController();

estadoRouter.get('/estados/:id', AuthMiddleware.nivelAutenticado, estadoController.obterPorId);

estadoRouter.post('/estados/cadastrar', AuthMiddleware.nivelAdmin, estadoController.cadastrar);

estadoRouter.put('/estados/atualizar', AuthMiddleware.nivelAdmin, estadoController.atualizar);

estadoRouter.get('/estados', AuthMiddleware.nivelAutenticado, estadoController.listar);

estadoRouter.delete('/estados/deletar/:id', AuthMiddleware.nivelAdmin, estadoController.deletar);

module.exports = estadoRouter;