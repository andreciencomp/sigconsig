const express = require('express');
const FachadaNegocio = require('../negocio/FachadaNegocio');
const ExceptionService = require('../excessoes/ExceptionService');
const AuthMiddleware = require('../Middleware/AuthMiddleware');
const PagamentoComissaoController = require('../controllers/PagamentoComissaoController');
const router = express.Router();

const pagamentoComissaoController = new PagamentoComissaoController();

router.post('/pagamentos_comissoes/gerar/:contrato_id', AuthMiddleware.nivelFinanceiro, pagamentoComissaoController.gerar);

router.get('/pagamentos_comissoes', AuthMiddleware.nivelFinanceiro, pagamentoComissaoController.listar);

router.delete('/pagamentos_comissoes/deletar/:id', AuthMiddleware.nivelFinanceiro, pagamentoComissaoController.deletar);

module.exports = router;