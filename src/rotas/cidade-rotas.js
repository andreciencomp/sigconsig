const express = require('express');
const ExceptionService = require('../servicos/ExceptionService');
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../negocio/FachadaNegocio');
const CidadeValidator = require('../validators/CidadeValidator');
const router = express.Router();

router.get('/cidades', async function (req, res) {
    try {
        const fachada = new FachadaNegocio();
        const cidades = await fachada.listarCidades();
        return res.status(200).send(cidades);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.get('/cidades/:id', async function (req, res) {
    try {
        const fachada = new FachadaNegocio();
        const cidadeId = await fachada.obterCidadePorId(req.params.id);
        return res.status(200).send(cidadeId);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.post('/cidades/cadastrar', authService.usuarioAdminFiltro, async (req, res) => {
    try {
        CidadeValidator.validarCadastro(req.body);
        const fachada = new FachadaNegocio();
        const cidadeId = await fachada.cadastrarCidade(req.body);
        return res.status(201).send(cidadeId);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.put('/cidades/atualizar',authService.usuarioAdminFiltro, async(req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const cidadeId = await fachada.atualizarCidade(req.body);
        return res.status(200).send(cidadeId);
    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

router.get('/cidades/estado/:estado_id', async function (req, res) {
    try {
        const fachada = new FachadaNegocio();
        const cidades = await fachada.listarCidadesPorEstado(req.params.estado_id);
        return res.status(200).send(cidades);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.delete('/cidades/deletar/:id', authService.usuarioAdminFiltro, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        const cidadeId = await fachada.deletarCidade(req.params.id);
        return res.status(200).send(cidadeId);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

module.exports = router;    