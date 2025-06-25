const express = require('express');
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');

const router = express.Router();


router.post('/pagamentos_comissoes/pagar/:id', authService.usuarioFinanceiroFiltro, async (req, res) => {
    try {
        const fachadaNegocio = new FachadaNegocio();
        const resultado = await fachadaNegocio.gerarPagamentoDeComissao(req.params.id, req.dadosUsuario.id);
        return res.status(201).send({ dados: resultado });
    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
})

router.get('/pagamentos_comissoes', authService.usuarioFinanceiroFiltro, async (req, res)=>{
    try{
        const fachadaNegocio = new FachadaNegocio();
        const pagamentos = await fachadaNegocio.listarTodosPagamentos();
        return res.status(200).send({pagamentos});

    }catch(e){  
        ExceptionService.enviarExcessao(e, res);
    }
})

router.delete('/pagamentos_comissoes/deletar/:id', authService.usuarioFinanceiroFiltro, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const id = await fachada.deletarPagamentoComissao(req.params.id);
        return res.status(200).send(id);

    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
})

module.exports = router;