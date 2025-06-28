const express = require('express');
const FachadaNegocio = require('../negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const AuthMiddleware = require('../Middleware/AuthMiddleware');

const router = express.Router();

router.post('/pagamentos_comissoes/pagar/:id', AuthMiddleware.nivelFinanceiro, async (req, res) => {
    try {
        const fachadaNegocio = new FachadaNegocio();
        const pagamentoId = await fachadaNegocio.gerarPagamentoDeComissao(req.params.id, req.dadosUsuario.id);
        return res.status(201).send(pagamentoId);
    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
})

router.get('/pagamentos_comissoes', AuthMiddleware.nivelFinanceiro, async (req, res)=>{
    try{
        const fachadaNegocio = new FachadaNegocio();
        const pagamentos = await fachadaNegocio.listarTodosPagamentos();
        return res.status(200).send(pagamentos);

    }catch(e){  
        ExceptionService.enviarExcessao(e, res);
    }
})

router.delete('/pagamentos_comissoes/deletar/:id', AuthMiddleware.nivelFinanceiro, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const pagamentoId = await fachada.deletarPagamentoComissao(req.params.id);
        return res.status(200).send(pagamentoId);

    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
})

module.exports = router;