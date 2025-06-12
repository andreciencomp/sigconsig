const express = require('express');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const authService = require('../servicos/auth_service');
const ExceptionService = require('../servicos/ExceptionService');

const roteador = express.Router();

roteador.get('/orgaos/:id', authService.usuarioAutenticadoFiltro, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        const result = await fachada.obterOrgaoPorID(req.params.id);
        return res.status(200).send({ dados: result });
    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

roteador.post('/orgaos/cadastrar', authService.usuarioAdminFiltro, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        const objetoComId = await fachada.cadastrarOrgao(req.body.sigla, req.body.nome);
        return res.status(201).send({ dados: objetoComId });

    } catch (e) {

        ExceptionService.enviarExcessao(e, res);
    }
});

roteador.get('/orgaos', authService.usuarioAutenticadoFiltro, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        const orgaos = await fachada.listarOrgaos();
        return res.status(200).send({ dados: orgaos });

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

roteador.delete('/orgaos/deletar/:id', authService.usuarioAdminFiltro, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        const resultado = await fachada.deletarOrgao(req.params.id);
        return res.status(200).send({ dados: resultado });

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});



module.exports = roteador;