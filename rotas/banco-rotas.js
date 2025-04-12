const express = require('express');
const roteadorBancos = express.Router();
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');

roteadorBancos.get('/bancos/obter/:codigo',async (req, res, next)=>{

    try{
        let fachada = await FachadaNegocio.instancia;
        let banco = await fachada.obterBancoPorCodigo(req.params.codigo);
        res.status(200).send(banco);
        return;
    }catch(e){
        ExceptionService.checkError(e,res);
    }

});

roteadorBancos.post('/bancos/cadastrar',
            authService.usuarioAdminFiltro, async(req, res, next)=>{
        
        try{
            let fachada = FachadaNegocio.instancia;
            let bancoCadastrado = await fachada.cadastrarBanco(req.body.codigo, req.body.nome);
            res.status(201).send(authService.criarPayload(null,bancoCadastrado,null,'OK'));
        }catch(e){
            ExceptionService.checkError(e,res);
        }

});

roteadorBancos.get('/bancos', async(req, res, next)=>{
    
    let fachada = FachadaNegocio.instancia;
    try{
        let bancos = await fachada.listarBancos();
        return res.status(200).send({dado: bancos});

    }catch(e){
        ExceptionService.checkError(e,res);

    }
});

module.exports = roteadorBancos;

