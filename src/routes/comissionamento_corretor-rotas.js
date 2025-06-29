const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/AuthMiddleware');
const ComissionamentoCorretorController = require('../controllers/ComissionamentoCorretorController');

const comissionamentoCorretorController = new ComissionamentoCorretorController();

router.post('/comissionamentos/corretor/cadastrar',AuthMiddleware.nivelAdmin, comissionamentoCorretorController.cadastrar);

module.exports = router;