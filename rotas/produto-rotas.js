const express = require('express');
const router = express.Router();
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const validarProduto = require('../publico/validators/ProdutoValidator');
const ExceptionService = require('../servicos/ExceptionService');

router.post('/produtos/cadastrar', authService.usuarioAdminFiltro, async (req, res) => {
    try {
        validarProduto(req.body);
        let fachadaNegocio = FachadaNegocio.instancia;
        let idProduto = await fachadaNegocio.cadastrarProduto(req.body);
        return res.status(201).send(idProduto);
    } catch (e) {
        ExceptionService.checkError(e,res);
    }
});

module.exports = router;