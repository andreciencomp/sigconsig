const express = require('express');
const roteadorBancos = express.Router();
const FachadaNegocio = require('../negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const BancoValidator = require('../validators/BancoValidator');
const AuthMiddleware = require('../Middleware/AuthMiddleware');

roteadorBancos.get('/bancos/codigo/:codigo',async (req, res, next)=>{
    try{
        const fachada = new FachadaNegocio();
        const banco = await fachada.obterBancoPorCodigo(req.params.codigo);
        return res.status(200).send(banco);
        
    }catch(e){
        ExceptionService.enviarExcessao(e,res);
    }
});

roteadorBancos.post('/bancos/cadastrar',AuthMiddleware.nivelAdmin, async(req, res, next)=>{
        try{
            BancoValidator.validarCadastro(req.body);
            const fachada = new FachadaNegocio();
            const bancoId = await fachada.cadastrarBanco(req.body);
            res.status(201).send(bancoId);
            
        }catch(e){
            ExceptionService.enviarExcessao(e,res);
        }
});

roteadorBancos.put('/bancos/atualizar',AuthMiddleware.nivelAdmin,async(req, res)=>{
    try{
        BancoValidator.validarAtualizacao (req.body);
        const fachada = new FachadaNegocio();
        const bancoId = await fachada.atualizarBanco(req.body);
        return res.status(200).send(bancoId);

    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

roteadorBancos.get('/bancos', async(req, res, next)=>{
    try{
        const fachada = new FachadaNegocio();
        const bancos = await fachada.listarBancos();
        return res.status(200).send(bancos);

    }catch(e){
        ExceptionService.enviarExcessao(e,res);

    }
});

roteadorBancos.delete('/bancos/deletar/:id', AuthMiddleware.nivelAdmin, async(req, res)=>{
    try{
        const fachadaNegocio = new FachadaNegocio();
        const bancoId  = await fachadaNegocio.deletarBanco(req.params.id);
        return res.status(200).send(bancoId);
        
    }catch(e){
        ExceptionService.enviarExcessao(e,res);
    }
});

module.exports = roteadorBancos;