const express = require('express');
const router = express.Router();
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const {validarCadastroContrato} = require('../publico/validators/ContratoValidator');

router.get('/contratos/:id', authService.usuarioCadastroFiltro, async (req, res) => {
    let fachada = new FachadaNegocio();
    try {
        const contrato = await fachada.obterContratoPorID(req.params.id);
        return res.status(200).send({ dados: contrato });
    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }

})

router.post('/contratos/cadastrar', authService.usuarioCadastroFiltro, async (req, res) => {
    try {
        validarCadastroContrato(req.body);
        const fachada = new FachadaNegocio();
        const resposta = await fachada.cadastrarContrato(req.body);
        return res.status(201).send({ dados: resposta });
    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }

});

router.post('/contratos/atualizar',authService.usuarioCadastroFiltro,async (req,res)=>{
    try {
        let fachada = new FachadaNegocio();
        let resposta = await fachada.atualizarContrato(req.body);
        return res.status(200).send({ dados: resposta });
    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.post('/contratos/liberar/:id', authService.usuarioFinanceiroFiltro, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        const resultado = await fachada.liberarContrato(req.params.id, req.body.dtLiberacao);
        return res.status(200).send({ dados: resultado });
    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }

});

router.post('/contratos/liberar', authService.usuarioFinanceiroFiltro, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        const resultado = await fachada.liberarVariosContratos(req.body, req.dadosUsuario.id);
        return res.status(200).send({ dados: resultado });

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }

});

router.post('/contratos', authService.usuarioCadastroFiltro, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        const contratos = await fachada.listarContratosPorCriterios(req.body);
        return res.status(200).send({ dados: contratos });
    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.get('/contratos/deletar/:id', authService.usuarioAdminFiltro, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        await fachada.deletarContrato(req.params.id);
        return res.status(200).send({dados:req.params.id});
        
    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

module.exports = router;