const express = require('express');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const authService = require('../servicos/auth_service');
const ExceptionService = require('../servicos/ExceptionService');

const roteador = express.Router();

roteador.post('/orgaos/cadastrar',authService.usuarioAdminFiltro, async (req, res, next)=>{

    let fachada = FachadaNegocio.instancia;
    let sigla = req.body.sigla;
    let nome = req.body.nome;
    try{
        await fachada.cadastrarOrgao(sigla, nome);
        return res.status(201).send({excessao:null, msg:'OK'});
    }catch(e){

        ExceptionService.checkError(e, res);
    }
});

roteador.get('/orgaos', authService.usuarioAutenticadoFiltro,async(req,res,next)=>{

    let fachada = FachadaNegocio.instancia;
    try{
        let orgaos = await fachada.listarOrgaos();
        return res.status(200).send({dado:orgaos, excessao:null});

    }catch(e){

        ExceptionService.checkError(e, res);

    }


});



module.exports = roteador;