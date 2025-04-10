const express = require('express');
const router = express.Router();
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');

router.post('/corretores/cadastrar', authService.usuarioAdminFiltro, async (req, res) => {

    let fachada = FachadaNegocio.instancia;
    try {
        let resposta = await fachada.cadastrarCorretor(req.body);
        return res.status(201).send({ dados: resposta });

    } catch (e) {
        ExceptionService.checkError(e, res);
    }
});

module.exports = router;