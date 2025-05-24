const express = require('express');
const fachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const router = express.Router();

router.get('/cidades',async function(req,res){
    let fachada = fachadaNegocio.instancia;
    try{
        let cidades = await fachada.listarCidades();
        return res.status(200).send({dados: cidades});

    }catch(e){
        ExceptionService.checkError(e,res);
    }
});

router.get('/cidades/:id', async function(req, res){
    let fachada = fachadaNegocio.instancia;
    try{
        let cidade = await fachada.obterCidadePorId(req.params.id);
        return res.status(200).send({dados: cidade});

    }catch(e){
        ExceptionService.checkError(e,res);
    }
    
});

router.get('/cidades/estado/:estado_id',async function(req,res){
    let fachada = fachadaNegocio.instancia;
    try{
        let cidades = await fachada.listarCidadesPorEstado(req.params.estado_id);
        return res.status(200).send({dados: cidades});
    }catch(e){
        ExceptionService.checkError(e, res);
    }
});

router.get('/cidades/deletar/:id', authService.usuarioAdminFiltro, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const cidadeID = await fachada.deletarCidade(req.params.id);
        return res.status(200).send({dados:req.params.id});

    }catch(e){
        ExceptionService.checkError(e, res);
    }
});

module.exports = router;    