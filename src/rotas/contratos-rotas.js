const express = require('express');
const router = express.Router();
const FachadaNegocio = require('../negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const ContratoValidator = require('../validators/ContratoValidator');
const AuthMiddleware = require('../Middleware/AuthMiddleware');

router.get('/contratos/:id', AuthMiddleware.nivelCadastro, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        const contrato = await fachada.obterContratoPorID(req.params.id);
        return res.status(200).send(contrato);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }

})

router.post('/contratos/cadastrar', AuthMiddleware.nivelCadastro, async (req, res) => {
    try {
        ContratoValidator.validarCadastro(req.body);
        const fachada = new FachadaNegocio();
        const contratoId = await fachada.cadastrarContrato(req.body);
        return res.status(201).send(contratoId);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }

});

router.put('/contratos/atualizar', AuthMiddleware.nivelCadastro, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        const contratoId = await fachada.atualizarContrato(req.body);
        return res.status(200).send(contratoId);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.post('/contratos/liberar/:id', AuthMiddleware.nivelFinanceiro, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        const contratoId = await fachada.liberarContrato(req.params.id, req.body.dtLiberacao);
        return res.status(200).send(contratoId);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }

});

router.post('/contratos/liberar', AuthMiddleware.nivelFinanceiro, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        const feedbacks = await fachada.liberarVariosContratos(req.body, req.dadosUsuario.id);
        return res.status(200).send(feedbacks);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }

});

router.get('/contratos',AuthMiddleware.nivelCadastro, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        const contratos = await fachada.listarContratos(req.query);
        return res.status(200).send(contratos);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.delete('/contratos/deletar/:id', AuthMiddleware.nivelAdmin, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        const contratoId = await fachada.deletarContrato(req.params.id);
        return res.status(200).send(contratoId);
        
    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

module.exports = router;