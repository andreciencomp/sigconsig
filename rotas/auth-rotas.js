const express = require('express');
const router = express.Router();
const c = require('../config');
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../src/negocio/FachadaNegocio');
const jwt = require('jsonwebtoken');

router.get('/login', async (req, res, next)=>{
    let infoLogin =  authService.obterBasicLoginInfo(req);
    if(!infoLogin){
        let resposta = authService.criarPayload(null,'AUTH_HEADER','Cabeçalho inválido');
        res.status(401).send(resposta);
        return;
    }

    fachada =  FachadaNegocio.instancia;
    try{
        let usuario =   await fachada.login(infoLogin.nomeUsuario, infoLogin.senha);
        let payload = {
            id:usuario.id,
            tipo:usuario.tipo
        }
    
        let token = authService.gerarToken(payload);
        res.status(200).send(authService.criarPayload(token,usuario,null,null));

    }catch(err){
        res.status(401).send(authService.criarPayload(null,err,'Login Incorreto'));
    }

});

module.exports = router;