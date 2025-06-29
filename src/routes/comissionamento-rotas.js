const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../Middleware/AuthMiddleware');
const ComissionamentoPromotoraController = require('../controllers/ComissionamentoPromotoraController');
const ComissionamentoCorretorController = require('../controllers/ComissionamentoCorretorController');

const comissionamentoPromotoraController = new ComissionamentoPromotoraController();
const comissionamentoCorretorController = new ComissionamentoCorretorController();

router.get('/comissionamentos/promotora/:id', AuthMiddleware.nivelFinanceiro, comissionamentoPromotoraController.obterPorId);

router.post('/comissionamentos/promotora/cadastrar', AuthMiddleware.nivelAdmin, comissionamentoPromotoraController.cadastrar);

router.post('/comissionamentos/corretor/cadastrar',AuthMiddleware.nivelAdmin, comissionamentoCorretorController.cadastrar);

module.exports = router;