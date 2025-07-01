const express = require('express');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const PagamentoComissaoController = require('../controllers/PagamentoComissaoController');
const router = express.Router();

const pagamentoComissaoController = new PagamentoComissaoController();

router.post('/pagamentos_comissoes/gerar/:contrato_id', AuthMiddleware.nivelFinanceiro, pagamentoComissaoController.gerar);

router.put('/pagamentos_comissoes/efetivar/:id', AuthMiddleware.nivelFinanceiro, pagamentoComissaoController.efetivar);

router.get('/pagamentos_comissoes', AuthMiddleware.nivelFinanceiro, pagamentoComissaoController.listar);

router.delete('/pagamentos_comissoes/deletar/:id', AuthMiddleware.nivelFinanceiro, pagamentoComissaoController.deletar);

module.exports = router;