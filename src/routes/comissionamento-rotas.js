const express = require('express');
const router = express.Router();
const ExceptionService =  require('../excessoes/ExceptionService');
const FachadaNegocio = require('../negocio/FachadaNegocio');
const ComissionamentoPromotoraValidator = require('../validators/ComissionamentoPromotoraValidator');
const ComissionamentoCorretorValidator = require('../validators/ComissionamentoCorretorValidator');
const AuthMiddleware = require('../Middleware/AuthMiddleware');

router.get('/comissionamentos/promotora/:id', AuthMiddleware.nivelFinanceiro, async(req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const comissionamento = await fachada.obterComissionamentoPromotoraPorId(req.params.id);
        return res.status(200).send(comissionamento);
        
    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

router.post('/comissionamentos/promotora/cadastrar', AuthMiddleware.nivelAdmin, async(req, res)=>{
    try{
        ComissionamentoPromotoraValidator.validarCadastro(req.body);
        const fachada = new FachadaNegocio();
        const idComissionamento = await fachada.cadastrarComissionamentoPromotora(req.body);
        return res.status(201).send(idComissionamento);

    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

router.post('/comissionamentos/corretor/cadastrar',AuthMiddleware.nivelAdmin,async(req, res)=>{
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