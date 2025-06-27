const express = require('express');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const authService = require('../servicos/auth_service');
const ExceptionService = require('../servicos/ExceptionService');
const OrgaoValidator = require('../publico/validators/OrgaoValidator');

const roteador = express.Router();

roteador.get('/orgaos/:id', authService.usuarioAutenticadoFiltro, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        const orgao = await fachada.obterOrgaoPorID(req.params.id);
        return res.status(200).send(orgao);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

roteador.post('/orgaos/cadastrar', authService.usuarioAdminFiltro, async (req, res) => {
    try {
        OrgaoValidator.validarCadastro(req.body);
        const fachada = new FachadaNegocio();
        const orgaoId = await fachada.cadastrarOrgao(req.body);
        return res.status(201).send(orgaoId);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

roteador.put('/orgaos/atualizar',authService.usuarioAdminFiltro, async (req, res)=>{
    try{
        OrgaoValidator.validarAtualizacao(req.body);
        const fachada = new FachadaNegocio();
        const orgaoId = await fachada.atualizarOrgao(req.body);
        return res.status(201).send(orgaoId);
        
    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

roteador.get('/orgaos', authService.usuarioAutenticadoFiltro, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        const orgaos = await fachada.listarOrgaos();
        return res.status(200).send(orgaos);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

roteador.delete('/orgaos/deletar/:id', authService.usuarioAdminFiltro, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        const orgaoId = await fachada.deletarOrgao(req.params.id);
        return res.status(200).send(orgaoId);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

module.exports = roteador;