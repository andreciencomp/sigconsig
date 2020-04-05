const express = require('express');
const roteador = express.Router();
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const authService = require('../servicos/auth_service');

roteador.post('/usuarios/cadastrar/admin',
        authService.usuarioSuperFiltro, async (req, res, next)=>{
    
    let fachada = FachadaNegocio.instancia;
    try{
        if(req.body.tipo != 'USUARIO_ADMIN'){

            throw 'DADOS_INVALIDOS';
        }
        await fachada.cadastrarUsuario(req.body.nomeUsuario, req.body.senha, req.body.tipo);
        
    }catch(e){
        switch(e){
            case 'BD_EXCEPTION':
                res.status(400).send(authService.criarPayload(null,null,e,'Chave duplicada'));
                return;

            case 'DADOS_INVALIDOS':
                res.status(400).send(authService.criarPayload(null, null,e,'Tipo de usuário inválido'));
                return;
            default:
                res.status(400).send(authService.criarPayload(null,null,e,'Erro desconhecido'));
                return;
        }  
    }
    res.status(201).send(authService.criarPayload(null,null,null,'OK'));
    
});


roteador.post('/usuarios/cadastrar/outros', authService.usuarioAdminFiltro,async (req, res, next)=>{

    let fachada = FachadaNegocio.instancia;
    try{
        if(req.body.tipo == 'USUARIO_ADMIN' || req.body.tipo == 'USUARIO_SUPER'){

            throw 'DADOS_INVALIDOS';
        }
        
        await fachada.cadastrarUsuario(req.body.nomeUsuario, req.body.senha, req.body.tipo);

    }catch(e){
        switch(e){
            case 'BD_EXCEPTION':
                res.status(400).send(authService.criarPayload(null, null, e, 'Chave duplicada'));
                return;

            case 'DADOS_INVALIDOS':
                res.status(400).send(authService.criarPayload(null, null, e, 'Tipo de usuário invalido'));
                return;

            default:
                res.status(400).send(authService.criarPayload(null, null, e,'Erro desconhecido'));
                return;
        }
    }
    res.status(201).send(authService.criarPayload(null,null,null,'OK'));

});



module.exports = roteador;