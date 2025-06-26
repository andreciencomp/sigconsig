const express = require('express');
const router = express.Router();
const ExceptionService =  require('../servicos/ExceptionService');
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ComissionamentoPromotoraValidator = require('../publico/validators/ComissionamentoPromotoraValidator');
const ComissionamentoCorretorValidator = require('../publico/validators/ComissionamentoCorretorValidator');

router.get('/comissionamentos/promotora/:id', authService.usuarioFinanceiroFiltro, async(req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const comissionamento = await fachada.obterComissionamentoPromotoraPorId(req.params.id);
        return res.status(200).send(comissionamento);
        
    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

router.post('/comissionamentos/promotora/cadastrar',authService.usuarioAdminFiltro, async(req, res)=>{
    try{
        ComissionamentoPromotoraValidator.validarCadastro(req.body);
        const fachada = new FachadaNegocio();
        const idComissionamento = await fachada.cadastrarComissionamentoPromotora(req.body);
        return res.status(201).send(idComissionamento);

    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

router.post('/comissionamentos/corretor/cadastrar',async(req, res)=>{
    try{
        ComissionamentoCorretorValidator.validarCadastro(req.body);
        const fachada = new FachadaNegocio();
        const idComissionamento = await fachada.cadastrarComissionamentoCorretor(req.body);
        return res.status(201).send(idComissionamento);
        
    }catch(e){
        ExceptionService.enviarExcessao(e,res);
    }
});


module.exports = router;