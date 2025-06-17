const express = require('express');
const roteadorBancos = express.Router();
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const BancoValidator = require('../publico/validators/BancoValidator');

roteadorBancos.get('/bancos/codigo/:codigo',async (req, res, next)=>{
    try{
        const fachada = new FachadaNegocio();
        const banco = await fachada.obterBancoPorCodigo(req.params.codigo);
        return res.status(200).send({dados:banco});
        
    }catch(e){
        ExceptionService.enviarExcessao(e,res);
    }
});

roteadorBancos.post('/bancos/cadastrar',authService.usuarioAdminFiltro, async(req, res, next)=>{
        try{
            BancoValidator.validarCadastro(req.body);
            const fachada = new FachadaNegocio();
            const resultado = await fachada.cadastrarBanco(req.body);
            res.status(201).send({dados:resultado});
            
        }catch(e){
            ExceptionService.enviarExcessao(e,res);
        }
});

roteadorBancos.put('/bancos/atualizar',authService.usuarioAdminFiltro,async(req, res)=>{
    try{
        let atributos = req.body;
        BancoValidator.validarAtualizacao (atributos);
        const fachada = new FachadaNegocio();
        const resultado = await fachada.atualizarBanco(atributos);
        return res.status(200).send({dados: resultado});
    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

roteadorBancos.get('/bancos', async(req, res, next)=>{
    try{
        const fachada = new FachadaNegocio();
        const bancos = await fachada.listarBancos();
        return res.status(200).send({dados: bancos});

    }catch(e){
        ExceptionService.enviarExcessao(e,res);

    }
});

roteadorBancos.delete('/bancos/deletar/:id', authService.usuarioAdminFiltro, async(req, res)=>{
    try{
        const fachadaNegocio = new FachadaNegocio();
        const idDeletado  = await fachadaNegocio.deletarBanco(req.params.id);
        return res.status(200).send({id: idDeletado});
        
    }catch(e){
        ExceptionService.enviarExcessao(e,res);
    }
});

module.exports = roteadorBancos;