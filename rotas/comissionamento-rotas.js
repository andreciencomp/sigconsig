const express = require('express');
const router = express.Router();
const ExceptionService =  require('../servicos/ExceptionService');
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const validarComissionamentoPromotora = require('../publico/validators/ComissionamentoPromotoraValidator');

router.post('/comissionamentos/promotora/cadastrar',authService.usuarioAdminFiltro, async(req, res)=>{
    try{
        validarComissionamentoPromotora(req.body);
        const fachada = new FachadaNegocio();
        const idComissionamento = await fachada.cadastrarComissionamentoPromotora(req.body);
        return res.status(201).send({dados:idComissionamento});

    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

router.post('/comissionamentos/corretor/cadastrar',async(req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const idComissionamento = await fachada.cadastrarComissionamentoCorretor(req.body);
        return res.status(201).send({dados:idComissionamento});
    }catch(e){
        ExceptionService.enviarExcessao(e,res);
    }
});


module.exports = router;