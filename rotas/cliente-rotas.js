const express = require('express');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const validarCliente = require('../publico/validators/ClienteValidator');
const authService = require('../servicos/auth_service');

const router = express.Router();

router.get('/clientes/:id', authService.usuarioCadastroFiltro, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const cliente = await fachada.obterClientePorId(req.params.id);
        return res.status(200).send({dados:cliente});
    }catch(e){  
        ExceptionService.enviarExcessao(e,res);
    }
});

router.get('/clientes/cpf/:cpf', authService.usuarioCadastroFiltro, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const cliente = await fachada.obterClientePorCpf(req.params.cpf);
        return res.status(200).send({dados:cliente});

    }catch(e){  
        ExceptionService.enviarExcessao(e,res);
    }
});

router.get('/clientes/nome/:nomeLike', authService.usuarioCadastroFiltro, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const clientes = await fachada.listarClientesPorNomeLike(req.params.nomeLike);
        return res.status(200).send({dados:clientes});

    }catch(e){  
        ExceptionService.enviarExcessao(e,res);
    } 
});

router.post('/clientes/cadastrar', authService.usuarioCadastroFiltro, async (req, res)=>{
    try{
        let fachada = new FachadaNegocio();
        validarCliente(req.body);
        const retorno = await fachada.cadastrarCliente(req.body);
        return res.status(201).send({dados:{id:retorno}});

    }catch(e){
        ExceptionService.enviarExcessao(e,res);
       
    }
});

router.delete('/clientes/deletar/:id', authService.usuarioCadastroFiltro, async(req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const id = await fachada.deletarCliente(req.params.id);
        return res.status(200).send({dados: {id: id}});

    }catch(e){
        ExceptionService.enviarExcessao(e,res)
    }
})

router.get('/clientes',authService.usuarioAutenticadoFiltro, async(req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const clientes = await fachada.listarClientes();
        return res.status(200).send({dados: clientes});

    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

module.exports = router;