const express = require('express');
const router = express.Router();
const FachadaNegocio = require('../negocio/FachadaNegocio');
const ExceptionService = require('../excessoes/ExceptionService');
const ProdutoValidator = require('../validators/ProdutoValidator');
const AuthMiddleware = require('../Middleware/AuthMiddleware');

router.get('/produtos/:id', AuthMiddleware.nivelAutenticado, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const produto = await fachada.obterProdutoPorID(req.params.id);
        return res.status(200).send(produto);

    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
})

router.post('/produtos/cadastrar', AuthMiddleware.nivelAdmin, async (req, res) => {
    try {
        ProdutoValidator.validarCadastro(req.body);
        const fachada = new FachadaNegocio();
        const produtoId = await fachada.cadastrarProduto(req.body);
        return res.status(201).send(produtoId);

    } catch (e) {
        ExceptionService.enviarExcessao(e, res);
    }
});

router.put('/produtos/atualizar', AuthMiddleware.nivelAdmin, async (req, res)=>{
    try{
        ProdutoValidator.validarAtualizacao(req.body);
        const fachada = new FachadaNegocio();
        const produtoId = await fachada.atualizarProduto(req.body);
        return res.status(200).send(produtoId);

    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

router.get('/produtos', AuthMiddleware.nivelAutenticado, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const produtos = await fachada.listarProdutos(req.query);
        return res.status(200).send(produtos);
        
    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
});

router.delete('/produtos/deletar/:id',  AuthMiddleware.nivelAdmin, async (req, res)=>{
    try{
        const fachada = new FachadaNegocio();
        const produtoId = await fachada.deletarProduto(req.params.id);
        return res.status(200).send(produtoId);
        
    }catch(e){
        ExceptionService.enviarExcessao(e, res);
    }
})

module.exports = router;