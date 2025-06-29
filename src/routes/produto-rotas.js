const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../Middleware/AuthMiddleware');
const ProdutoController = require('../controllers/ProdutoController');

const produtoController = new ProdutoController();

router.get('/produtos/:id', AuthMiddleware.nivelAutenticado, produtoController.obterPorId);

router.post('/produtos/cadastrar', AuthMiddleware.nivelAdmin, produtoController.cadastrar);

router.put('/produtos/atualizar', AuthMiddleware.nivelAdmin, produtoController.atualizar);

router.get('/produtos', AuthMiddleware.nivelAutenticado, produtoController.listar);

router.delete('/produtos/deletar/:id',  AuthMiddleware.nivelAdmin, produtoController.deletar);

module.exports = router;