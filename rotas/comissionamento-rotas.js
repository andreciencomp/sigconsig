const express = require('express');
const router = express.Router();
const ExceptionService =  require('../servicos/ExceptionService');
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const validarComissionamentoPromotora = require('../publico/validators/ComissionamentoPromotoraValidator');

router.post('/comissionamentos/promotora/cadastrar',authService.usuarioAdminFiltro, async(req, res)=>{
    try{
        validarComissionamentoPromotora(req.body);
        const fachadaNegocio = FachadaNegocio.instancia;
        const idComissionamento = await fachadaNegocio.cadastrarComissionamentoPromotora(req.body);
        return res.status(201).send(idComissionamento);

    }catch(e){
        ExceptionService.checkError(e, res);
    }
});

router.post('/comissionamentos/corretor/cadastrar',async(req, res)=>{
    try{
        const fachadaNegocio = FachadaNegocio.instancia;
        const idComissionamento = await fachadaNegocio.cadastrarComissionamentoCorretor(req.body);
        return res.status(201).send(idComissionamento);
    }catch(e){
        ExceptionService.checkError(e,res);
    }
});

module.exports = router;