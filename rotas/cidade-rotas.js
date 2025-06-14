const express = require('express');
const fachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const CidadeValidator = require('../publico/validators/CidadeValidator');
const router = express.Router();

router.get('/cidades', async function (req, res) {
    try {
        const fachada = new FachadaNegocio();
        const cidades = await fachada.listarCidades();
        return res.status(200).send({ dados: cidades });

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.get('/cidades/:id', async function (req, res) {
    try {
        const fachada = new FachadaNegocio();
        const cidade = await fachada.obterCidadePorId(req.params.id);
        return res.status(200).send({ dados: cidade });

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.post('/cidades/cadastrar', authService.usuarioAdminFiltro, async (req, res) => {
    try {
        CidadeValidator.validarCadastro(req.body);
        const fachada = new FachadaNegocio();
        const cidadeID = await fachada.cadastrarCidade(req.body);
        return res.status(201).send({ dados: cidadeID });

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
})

router.put('/cidades/atualizar',authService.usuarioAdminFiltro, async(req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const cidadeAtualizada = await fachada.atualizarCidade(req.body);
        return res.status(200).send({dados: cidadeAtualizada});
    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

router.get('/cidades/estado/:estado_id', async function (req, res) {
    try {
        const fachada = new FachadaNegocio();
        let cidades = await fachada.listarCidadesPorEstado(req.params.estado_id);
        return res.status(200).send({ dados: cidades });

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.get('/cidades/deletar/:id', authService.usuarioAdminFiltro, async (req, res) => {
    try {
        const fachada = new FachadaNegocio();
        await fachada.deletarCidade(req.params.id);
        return res.status(200).send({ dados: req.params.id });

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

module.exports = router;    