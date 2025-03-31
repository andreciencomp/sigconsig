const express = require('express');
const roteador = express.Router();
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const authService = require('../servicos/auth_service');
const ExceptionService = require('../servicos/ExceptionService');

roteador.post('/usuarios/cadastrar/admin',
        authService.usuarioSuperFiltro, async (req, res,next)=>{
    let fachada = FachadaNegocio.instancia;
    try{
        await fachada.cadastrarUsuario(req.body.nomeUsuario, req.body.senha, 'USUARIO_ADMIN');
        res.status(201).send({dados:'OK'});
        
    }catch(e){
        ExceptionService.checkError(e,res); 
    }
    
    
});


roteador.post('/usuarios/cadastrar/outros', authService.usuarioAdminFiltro,async (req, res)=>{

    let fachada = FachadaNegocio.instancia;
    try{
        if(req.body.tipo == 'USUARIO_ADMIN' || req.body.tipo == 'USUARIO_SUPER'){

            throw 'DADOS_INVALIDOS_EXCEPTION';
        }
        
        await fachada.cadastrarUsuario(req.body.nomeUsuario, req.body.senha, req.body.tipo);

    }catch(e){

        ExceptionService.checkError(e);
        
    }
    res.status(201).send(authService.criarPayload(null,null,null,'OK'));

});



module.exports = roteador;