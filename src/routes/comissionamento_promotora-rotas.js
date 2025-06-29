const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/AuthMiddleware');
const ComissionamentoPromotoraController = require('../controllers/ComissionamentoPromotoraController');

const comissionamentoPromotoraController = new ComissionamentoPromotoraController();

router.get('/comissionamentos/promotora/:id', AuthMiddleware.nivelFinanceiro, comissionamentoPromotoraController.obterPorId);

router.post('/comissionamentos/promotora/cadastrar', AuthMiddleware.nivelAdmin, comissionamentoPromotoraController.cadastrar);

module.exports = router;