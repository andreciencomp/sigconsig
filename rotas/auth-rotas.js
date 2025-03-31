const ExceptionService =  require('../servicos/ExceptionService');
const express = require('express');
const router = express.Router();
const c = require('../config');
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const jwt = require('jsonwebtoken');


router.get('/login', async (req, res)=>{
    
    try{
        let infoLogin =  await authService.obterBasicLoginInfo(req);
        fachada =  FachadaNegocio.instancia;
        
        let usuario =   await fachada.login(infoLogin.nomeUsuario, infoLogin.senha);
        let payload = {
            id:usuario.id,
            tipo:usuario.tipo
        };
        let token = authService.gerarToken(payload);
        res.status(200).send({token: token, dados: usuario});

    }catch(e){
        
        ExceptionService.checkError(e,res);
    }

});

module.exports = router;