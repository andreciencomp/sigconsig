const express = require('express');
const fachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
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
        ExceptionService.checkError(e);
    }
});

module.exports = router;