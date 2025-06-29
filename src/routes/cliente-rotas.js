const express = require('express');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const ClienteController = require('../controllers/ClienteController');
const router = express.Router();

const clienteController = new ClienteController();

router.get('/clientes/:id', AuthMiddleware.nivelCadastro, clienteController.obterPorId);

router.get('/clientes/cpf/:cpf',  AuthMiddleware.nivelCadastro, clienteController.obterPorCPF);

router.get('/clientes/nome/:nomeLike',  AuthMiddleware.nivelCadastro, clienteController.obterPorNomeLike);

router.post('/clientes/cadastrar',  AuthMiddleware.nivelCadastro, clienteController.cadastrar);

router.put('/clientes/atualizar', AuthMiddleware.nivelCadastro, clienteController.atualizar);

router.delete('/clientes/deletar/:id',  AuthMiddleware.nivelCadastro, clienteController.deletar)

router.get('/clientes', AuthMiddleware.nivelAutenticado, clienteController.listar);

module.exports = router;