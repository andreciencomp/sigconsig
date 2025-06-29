const express = require('express');
const roteadorBancos = express.Router();
const AuthMiddleware = require('../Middleware/AuthMiddleware');
const BancoController = require('../controllers/BancoController');

const bancoController = new BancoController();

roteadorBancos.get('/bancos/codigo/:codigo', bancoController.obterPorCodigo);

roteadorBancos.post('/bancos/cadastrar',AuthMiddleware.nivelAdmin, bancoController.cadastrar);

roteadorBancos.put('/bancos/atualizar',AuthMiddleware.nivelAdmin, bancoController.atualizar);

roteadorBancos.get('/bancos', bancoController.listar);

roteadorBancos.delete('/bancos/deletar/:id', AuthMiddleware.nivelAdmin, bancoController.deletar);

module.exports = roteadorBancos;