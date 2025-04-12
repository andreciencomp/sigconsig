const express = require('express');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const validarCliente = require('../publico/validators/ClienteValidator');
const router = express.Router();

router.post('/clientes/cadastrar', async (req, res)=>{
    let fachadaNegocio = FachadaNegocio.instancia;
    try{
        validarCliente(req.body);
        const retorno = await fachadaNegocio.cadastrarCliente(req.body);
        return res.status(200).send({dado:{id:retorno}});
    }catch(e){
        ExceptionService.checkError(e, res);
    }
});

module.exports = router;