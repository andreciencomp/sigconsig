const express = require('express');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const OrgaoController = require('../controllers/OrgaoController');
const roteador = express.Router();

const orgaoController = new OrgaoController();

roteador.get('/orgaos/:id', AuthMiddleware.nivelAutenticado, orgaoController.obterPorId);

roteador.post('/orgaos/cadastrar', AuthMiddleware.nivelAdmin, orgaoController.cadastrar);

roteador.put('/orgaos/atualizar', AuthMiddleware.nivelAdmin, orgaoController.atualizar);

roteador.get('/orgaos', AuthMiddleware.nivelAutenticado, orgaoController.listar);

roteador.delete('/orgaos/deletar/:id', AuthMiddleware.nivelAdmin, orgaoController.deletar);

module.exports = roteador;