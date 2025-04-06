const express = require('express');
const fachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');

const estadoRouter = express.Router();

estadoRouter.get('/estados',async function(req, res){
    
    try{
        let fachada = fachadaNegocio.instancia;
        let estados = await fachada.listarEstados();
        return res.status(200).send({dado: estados});
    }catch(e){
        ExceptionService.checkError(e);
    }
    
});

module.exports = estadoRouter;