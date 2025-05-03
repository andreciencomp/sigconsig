const express = require('express');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const validarCliente = require('../publico/validators/ClienteValidator');
const authService = require('../servicos/auth_service');

const router = express.Router();

router.get('/clientes/:id', authService.usuarioCadastroFiltro, async (req, res)=>{
    try{
        const fachadaNegocio = new FachadaNegocio();
        const cliente = await fachadaNegocio.obterClientePorId(req.params.id);
        return res.status(200).send({dados:cliente});
    }catch(e){  
        ExceptionService.checkError(e, res);
    }
});

router.post('/clientes/cadastrar', authService.usuarioCadastroFiltro, async (req, res)=>{
    let fachadaNegocio = FachadaNegocio.instancia;
    try{
        validarCliente(req.body);
        const retorno = await fachadaNegocio.cadastrarCliente(req.body);
        return res.status(201).send({dado:{id:retorno}});
    }catch(e){
        ExceptionService.checkError(e, res);
    }
});

module.exports = router;