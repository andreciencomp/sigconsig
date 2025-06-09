const ExceptionService =  require('../servicos/ExceptionService');
const express = require('express');
const router = express.Router();
const c = require('../config');
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');

router.get('/login', async (req, res)=>{
    try{
        let infoLogin =  await authService.obterBasicLoginInfo(req);
        fachada =  new FachadaNegocio();
        
        let usuario =   await fachada.login(infoLogin.nomeUsuario, infoLogin.senha);
        let jwtPayload = {
            id:usuario.id,
            tipo:usuario.tipo
        };
        let token = authService.gerarToken(jwtPayload);
        res.status(200).send({token: token, dados: usuario});

    }catch(e){
        
        ExceptionService.enviarExcessao(e,res);
    }
});

module.exports = router;