const express = require('express');
const router = express.Router();
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const {validarCadastroContrato} = require('../publico/validators/ContratoValidator');

router.get('/contratos/:id', authService.usuarioCadastroFiltro, async (req, res) => {
    let fachadaNegocio = new FachadaNegocio();
    try {
        const contrato = await fachadaNegocio.obterContratoPorID(req.params.id);
        return res.status(200).send({ dados: contrato });
    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }

})

router.post('/contratos/cadastrar', authService.usuarioCadastroFiltro, async (req, res) => {
    try {
        validarCadastroContrato(req.body);
        let fachadaNegocio = FachadaNegocio.instancia;
        let resposta = await fachadaNegocio.cadastrarContrato(req.body);
        return res.status(201).send({ dados: resposta });
    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }

});

router.post('/contratos/atualizar',authService.usuarioCadastroFiltro,async (req,res)=>{
    try {
        let fachadaNegocio = FachadaNegocio.instancia;
        let resposta = await fachadaNegocio.atualizarContrato(req.body);
        return res.status(200).send({ dados: resposta });
    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.post('/contratos/liberar/:id', authService.usuarioFinanceiroFiltro, async (req, res) => {
    try {
        const fachadaNegocio = FachadaNegocio.instancia;
        const resultado = await fachadaNegocio.liberarContrato(req.params.id, req.body.dtLiberacao);
        return res.status(200).send({ dados: resultado });
    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }

});

router.post('/contratos/liberar', authService.usuarioFinanceiroFiltro, async (req, res) => {
    try {
        const fachadaNegocio = FachadaNegocio.instancia;
        const resultado = await fachadaNegocio.liberarVariosContratos(req.body, req.dadosUsuario.id);
        return res.status(200).send({ dados: resultado });

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }

});

router.post('/contratos', authService.usuarioCadastroFiltro, async (req, res) => {
    try {
        const fachadaNegocio = FachadaNegocio.instancia;
        const contratos = await fachadaNegocio.listarContratosPorCriterios(req.body);
        return res.status(200).send({ dados: contratos });
    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.get('/contratos/deletar/:id', authService.usuarioAdminFiltro, async (req, res)=>{
    try{
        const fachadaNegocio = new FachadaNegocio();
        await fachadaNegocio.deletarContrato(req.params.id);
        return res.status(200).send({dados:req.params.id});
        
    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

module.exports = router;