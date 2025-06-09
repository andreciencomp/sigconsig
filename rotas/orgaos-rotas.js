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
        const objetoComId = await fachada.cadastrarOrgao(sigla, nome);
        return res.status(201).send({dados:objetoComId});

    }catch(e){

        ExceptionService.enviarExcessao(e, res);
    }
});

roteador.get('/orgaos', authService.usuarioAutenticadoFiltro,async(req,res,next)=>{

    let fachada = FachadaNegocio.instancia;
    try{
        let orgaos = await fachada.listarOrgaos();
        return res.status(200).send({dados:orgaos});

    }catch(e){

        ExceptionService.enviarExcessao(e, res);

    }


});



module.exports = roteador;