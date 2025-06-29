const express = require('express');
const AuthMiddleware = require('../Middleware/AuthMiddleware');
const router = express.Router();
const CidadeController = require('../controllers/CidadeController');

const cidadeControler = new CidadeController();

router.get('/cidades/:id', AuthMiddleware.nivelAutenticado, cidadeControler.obterPorId);

router.post('/cidades/cadastrar', AuthMiddleware.nivelAdmin, cidadeControler.cadastrar);

router.put('/cidades/atualizar', AuthMiddleware.nivelAdmin, cidadeControler.atualizar);

router.get('/cidades', AuthMiddleware.nivelAutenticado, cidadeControler.listar);

router.get('/cidades/estado/:estado_id', AuthMiddleware.nivelAutenticado, cidadeControler.listarPorEstado);

router.delete('/cidades/deletar/:id', AuthMiddleware.nivelAdmin, cidadeControler.deletar);

module.exports = router;    