const express = require('express');
const fachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const EstadoValidator = require('../publico/validators/EstadoValidator');

const estadoRouter = express.Router();

estadoRouter.get('/estados/:id',async (req, res)=>{
    try{
        let fachada = new FachadaNegocio();
        const estado = await fachada.obterEstadoPorID(req.params.id);
        return res.status(200).send({dados:estado});

    }catch(e){
        ExceptionService.checkError(e, res);
    }
});

estadoRouter.get('/estados',async function(req, res){
    
    try{
        let fachada = fachadaNegocio.instancia;
        let estados = await fachada.listarEstados();
        return res.status(200).send({dados: estados});
    }catch(e){
        ExceptionService.checkError(e, res);
    }
    
});

estadoRouter.post('/estados/cadastrar', authService.usuarioAdminFiltro, async (req, res)=>{
    try{
        EstadoValidator.validarCadastro(req.body);
        const fachada = new FachadaNegocio();
        const estadoID = await fachada.cadastrarEstado(req.body);
        return res.status(201).send({dados:estadoID});

    }catch(e){
        ExceptionService.checkError(e, res);
    }
});

estadoRouter.get('/estados/deletar/:id',authService.usuarioAdminFiltro, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const id = await fachada.deletarEstado(req.params.id);
        return res.status(200).send({dados:id});

    }catch(e){
        ExceptionService.checkError(e, res);
    }
});

module.exports = estadoRouter;