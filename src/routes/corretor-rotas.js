const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../Middleware/AuthMiddleware');
const CorretorController = require('../controllers/CorretorController');

const corretorController = new CorretorController();

router.get('/corretores/:id', AuthMiddleware.nivelCadastro, corretorController.obterPorId);

router.post('/corretores/cadastrar', AuthMiddleware.nivelAdmin, corretorController.cadastrar);

router.put('/corretores/atualizar', AuthMiddleware.nivelAdmin, corretorController.atualizar);

router.get('/corretores', AuthMiddleware.nivelAutenticado, corretorController.listar);

router.delete('/corretores/deletar/:id', AuthMiddleware.nivelAdmin, corretorController.deletar)

module.exports = router;