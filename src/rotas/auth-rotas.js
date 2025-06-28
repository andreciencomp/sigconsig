const ExceptionService =  require('../servicos/ExceptionService');
const express = require('express');
const router = express.Router();
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../negocio/FachadaNegocio');

router.get('/login', async (req, res)=>{
    try{
        const infoLogin = authService.obterBasicLoginInfo(req);
        const fachada =  new FachadaNegocio();
        
        const usuario =   await fachada.login(infoLogin.nomeUsuario, infoLogin.senha);
        const jwtPayload = { id:usuario.id,tipo:usuario.tipo};
        const token = authService.gerarToken(jwtPayload);
        res.status(200).send({token: token, usuario: usuario});

    }catch(e){
        ExceptionService.enviarExcessao(e,res);
    }
});

module.exports = router;