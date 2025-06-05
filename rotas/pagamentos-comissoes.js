const express = require('express');
const authService = require('../servicos/auth_service');
const FachadaNegocio = require('../publico/src/negocio/FachadaNegocio');
const ExceptionService = require('../servicos/ExceptionService');

const router = express.Router();


router.post('/pagamentos_comissoes/pagar/:id', authService.usuarioFinanceiroFiltro, async (req, res) => {
    try {
        const fachadaNegocio = new FachadaNegocio();
        const resultado = await fachadaNegocio.gerarPagamentoDeComissao(req.params.id, req.dadosUsuario.id);
        return res.status(201).send({ dados: resultado });
    } catch (e) {
        ExceptionService.checkError(e, res);
    }
})

module.exports = router;