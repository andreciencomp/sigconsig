const express = require('express');
const router = express.Router();
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const validarContrato = require('../publico/validators/ContratoValidator');

router.post('/contratos/cadastrar', authService.usuarioCadastroFiltro, async (req, res) => {
    try {
        validarContrato(req.body);
        let fachadaNegocio = FachadaNegocio.instancia;
        let resposta = await fachadaNegocio.cadastrarContrato(req.body);
        return res.status(201).send({dados:resposta});
    } catch (e) {
        ExceptionService.checkError(e, res);
    }

});

router.post('/contratos/liberar/:id', authService.usuarioFinanceiroFiltro, async(req,res)=>{
    try{
        const fachadaNegocio = FachadaNegocio.instancia;
        const resultado = await fachadaNegocio.liberarContrato(req.params.id, req.dadosUsuario.id);
        return res.status(200).send({dados:resultado});
    }catch(e){
        ExceptionService.checkError(e,res);
    }
    
});

router.post('/contratos/liberar', authService.usuarioFinanceiroFiltro, async(req,res)=>{
    try{
        const fachadaNegocio = FachadaNegocio.instancia;
        const resultado = await fachadaNegocio.liberarVariosContratos(req.body, req.dadosUsuario.id);
        return res.status(200).send({dados:resultado});
        
    }catch(e){
        ExceptionService.checkError(e,res);
    }
    
});

router.post('/contratos', authService.usuarioCadastroFiltro, async (req, res)=>{
    try{
        const fachadaNegocio = FachadaNegocio.instancia;
        const contratos = await fachadaNegocio.listarContratosPorCriterios(req.body);
        return res.status(200).send({dados: contratos});
    }catch(e){
        ExceptionService.checkError(e,res);
    }
});

module.exports = router;