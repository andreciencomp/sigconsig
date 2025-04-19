const express = require('express');
const router = express.Router();
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');
const validarContrato = require('../publico/validators/ContratoValidator');

router.post('/contratos/cadastrar', authService.usuarioCadastroFiltro, async (req, res) => {
    try {
        validarContrato(req.body);
        let fachadaNegocio = FachadaNegocio.instancia;
        let resposta = await fachadaNegocio.cadastrarContrato(req.body);
        return res.status(201).send({dados:resposta});
    } catch (e) {
        ExceptionService.checkError(e, res);
    }

});

module.exports = router;