const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../Middleware/AuthMiddleware');
const ContratoController = require('../controllers/ContratoController');

const contratoController = new ContratoController();

router.get('/contratos/:id', AuthMiddleware.nivelCadastro, contratoController.obterPorId);

router.post('/contratos/cadastrar', AuthMiddleware.nivelCadastro, contratoController.cadastrar);

router.put('/contratos/atualizar', AuthMiddleware.nivelCadastro, contratoController.atualizar);

router.post('/contratos/liberar/:id', AuthMiddleware.nivelFinanceiro, contratoController.liberar);

router.post('/contratos/liberar', AuthMiddleware.nivelFinanceiro, contratoController.liberarVarios);

router.get('/contratos',AuthMiddleware.nivelCadastro, contratoController.listar);

router.delete('/contratos/deletar/:id', AuthMiddleware.nivelAdmin, contratoController.deletar);

module.exports = router;