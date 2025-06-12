const express = require('express');
const router = express.Router();
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const {validarCadastroProduto} = require('../publico/validators/ProdutoValidator');
const ExceptionService = require('../servicos/ExceptionService');

router.post('/produtos/cadastrar', authService.usuarioAdminFiltro, async (req, res) => {
    try {
        validarCadastroProduto(req.body);
        const fachada = new FachadaNegocio();
        const objetoComId = await fachada.cadastrarProduto(req.body);
        return res.status(201).send({dados:objetoComId});

    } catch (e) {
        ExceptionService.enviarExcessao(e,res);
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