const express = require('express');
const roteadorBancos = express.Router();
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');

roteadorBancos.get('/bancos/codigo/:codigo',async (req, res, next)=>{

    try{
        let fachada = await FachadaNegocio.instancia;
        let banco = await fachada.obterBancoPorCodigo(req.params.codigo);
        res.status(200).send({dados:banco});
        return;
    }catch(e){
        ExceptionService.checkError(e,res);
    }

});

roteadorBancos.post('/bancos/cadastrar',
            authService.usuarioAdminFiltro, async(req, res, next)=>{
        
        try{
            let fachada = FachadaNegocio.instancia;
            let objetoBancoId = await fachada.cadastrarBanco(req.body.codigo, req.body.nome);
            res.status(201).send({dados:objetoBancoId});
        }catch(e){
            ExceptionService.checkError(e,res);
        }

});

roteadorBancos.get('/bancos', async(req, res, next)=>{
    
    let fachada = FachadaNegocio.instancia;
    try{
        let bancos = await fachada.listarBancos();
        return res.status(200).send({dados: bancos});

    }catch(e){
        ExceptionService.checkError(e,res);

    }
});

roteadorBancos.delete('/bancos/deletar/:id', authService.usuarioAdminFiltro, async(req, res)=>{
    try{
        const fachadaNegocio = new FachadaNegocio();
        const idDeletado  = await fachadaNegocio.deletarBanco(req.params.id);
        return res.status(200).send({id: idDeletado});
        
    }catch(e){
        ExceptionService.checkError(e,res);
    }
});

module.exports = roteadorBancos;

