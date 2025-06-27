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
        return res.status(200).send(produto);

    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
})

router.post('/produtos/cadastrar', authService.usuarioAdminFiltro, async (req, res) => {
    try {
        ProdutoValidator.validarCadastro(req.body);
        const fachada = new FachadaNegocio();
        const produtoId = await fachada.cadastrarProduto(req.body);
        return res.status(201).send(produtoId);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.put('/produtos/atualizar',authService.usuarioAdminFiltro, async (req, res)=>{
    try{
        ProdutoValidator.validarAtualizacao(req.body);
        const fachada = new FachadaNegocio();
        const produtoId = await fachada.atualizarProduto(req.body);
        return res.status(200).send(produtoId);

    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

router.get('/produtos',authService.usuarioCadastroFiltro, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const produtos = await fachada.listarProdutos(req.query);
        return res.status(200).send(produtos);
        
    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

router.delete('/produtos/deletar/:id', authService.usuarioAdminFiltro, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const produtoId = await fachada.deletarProduto(req.params.id);
        return res.status(200).send(produtoId);
        
    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
})

module.exports = router;