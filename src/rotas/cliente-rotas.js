const express = require('express');
const FachadaNegocio = require('../negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const authService = require('../servicos/auth_service');
const ClienteValidator = require('../validators/ClienteValidator');

const router = express.Router();

router.get('/clientes/:id', authService.usuarioCadastroFiltro, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const cliente = await fachada.obterClientePorId(req.params.id);
        return res.status(200).send(cliente);
    }catch(e){  
        ExceptionService.enviarExcessao(e,res);
    }
});

router.get('/clientes/cpf/:cpf', authService.usuarioCadastroFiltro, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const cliente = await fachada.obterClientePorCpf(req.params.cpf);
        return res.status(200).send(cliente);

    }catch(e){  
        ExceptionService.enviarExcessao(e,res);
    }
});

router.get('/clientes/nome/:nomeLike', authService.usuarioCadastroFiltro, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const clientes = await fachada.listarClientesPorNomeLike(req.params.nomeLike);
        return res.status(200).send(clientes);

    }catch(e){  
        ExceptionService.enviarExcessao(e,res);
    } 
});

router.post('/clientes/cadastrar', authService.usuarioCadastroFiltro, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        ClienteValidator.validarCadastro(req.body);
        const clienteId = await fachada.cadastrarCliente(req.body);
        return res.status(201).send(clienteId);

    }catch(e){
        ExceptionService.enviarExcessao(e,res);
       
    }
});

router.put('/clientes/atualizar',authService.usuarioCadastroFiltro, async (req, res)=>{
    try{
        ClienteValidator.validarAtualizacao(req.body);
        const fachada = new FachadaNegocio();
        const clienteId = await fachada.atualizarCliente(req.body);
        return res.status(200).send(clienteId);

    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

router.delete('/clientes/deletar/:id', authService.usuarioCadastroFiltro, async(req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const clienteId = await fachada.deletarCliente(req.params.id);
        return res.status(200).send(clienteId);

    }catch(e){
        ExceptionService.enviarExcessao(e,res)
    }
})

router.get('/clientes',authService.usuarioAutenticadoFiltro, async(req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const clientes = await fachada.listarClientes();
        return res.status(200).send(clientes);

    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

module.exports = router;