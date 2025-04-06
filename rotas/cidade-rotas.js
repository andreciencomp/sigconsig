const express = require('express');
const fachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const router = express.Router();

router.get('/cidades/:id', async function(req, res){
    let fachada = fachadaNegocio.instancia;
    try{
        let cidade = await fachada.obterCidadePorId(req.params.id);
        return res.status(200).send({dado: cidade});

    }catch(e){
        ExceptionService.checkError(e,res);
    }
    
});

module.exports = router;