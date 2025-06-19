const express = require('express');
const router = express.Router();
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const ProdutoValidator = require('../publico/validators/ProdutoValidator');

router.get('/produtos/:id', authService.usuarioAutenticadoFiltro, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const produto = await fachada.obterProdutoPorID(req.params.id);
        return res.status(200).send({dados: produto});
    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
})

router.post('/produtos/cadastrar', authService.usuarioAdminFiltro, async (req, res) => {
    try {
        ProdutoValidator.validarCadastro(req.body);
        const fachada = new FachadaNegocio();
        const objetoComId = await fachada.cadastrarProduto(req.body);
        return res.status(201).send({dados:objetoComId});

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.put('/produtos/atualizar',authService.usuarioAdminFiltro, async (req, res)=>{
    try{
        ProdutoValidator.validarAtualizacao(req.body);
        const fachada = new FachadaNegocio();
        const produtoAtualizado = await fachada.atualizarProduto(req.body);
        return res.status(200).send({dados: produtoAtualizado});

    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

router.delete('/produtos/deletar/:id', authService.usuarioAdminFiltro, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const result = await fachada.deletarProduto(req.params.id);
        return res.status(200).send({dados: result});
        
    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
})

module.exports = router;