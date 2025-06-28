const express = require('express');
const ExceptionService = require('../servicos/ExceptionService');
const FachadaNegocio = require('../negocio/FachadaNegocio');
const CidadeValidator = require('../validators/CidadeValidator');
const AuthMiddleware = require('../Middleware/AuthMiddleware');
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

router.post('/cidades/cadastrar', AuthMiddleware.nivelAdmin, async (req, res) => {
    try {
        CidadeValidator.validarCadastro(req.body);
        const fachada = new FachadaNegocio();
        const cidadeId = await fachada.cadastrarCidade(req.body);
        return res.status(201).send(cidadeId);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.put('/cidades/atualizar', AuthMiddleware.nivelAdmin, async(req, res)=>{
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

router.delete('/cidades/deletar/:id', AuthMiddleware.nivelAdmin, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        const cidadeId = await fachada.deletarCidade(req.params.id);
        return res.status(200).send(cidadeId);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

module.exports = router;    