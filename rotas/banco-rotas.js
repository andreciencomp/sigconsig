const express = require('express');
const roteadorBancos = express.Router();
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');

roteadorBancos.get('/bancos/:codigo',async (req, res, next)=>{

    try{

        let fachada = await FachadaNegocio.instancia;
        let banco = await fachada.obterBancoPorCodigo(req.params.codigo);
        res.status(200).send(banco);
        return;
    }catch(e){

        console.log(e);
        res.status(500).send(authService.criarPayload(null,null,e,"Erro"));
    }



});

module.exports = roteadorBancos;

