'use strict'

const express = require('express');
const roteadorDefault = require('./routes/default-rotas');
const roteadorUsuario = require('./routes/usuario-rotas');
const roteadorAuth = require('./routes/auth-rotas');
const roteadorBanco = require('./routes/banco-rotas');
const roteadorOrgaos = require('./routes/orgaos-rotas');
const roteadorEstado = require('./routes/estado-rotas');
const roteadorCidade = require('./routes/cidade-rotas');
const roteadorCorretor = require('./routes/corretor-rotas');
const roteadorCliente = require('./routes/cliente-rotas');
const roteadorProduto = require('./routes/produto-rotas');
const roteadorComissionamento = require('./routes/comissionamento-rotas');
const roteadorContratos = require('./routes/contratos-rotas');
const roteadorPagamentoComissao = require('./routes/pagamentos-comissoes');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.use(bodyParser.json());

app.use('/', roteadorDefault);
app.use('/', roteadorUsuario);
app.use('/', roteadorAuth);
app.use('/', roteadorBanco);
app.use('/', roteadorOrgaos);
app.use('/', roteadorEstado);
app.use('/', roteadorCidade);
app.use('/', roteadorCorretor);
app.use('/', roteadorCliente);
app.use('/', roteadorProduto);
app.use('/', roteadorComissionamento);
app.use('/', roteadorContratos);
app.use('/', roteadorPagamentoComissao);

module.exports = app;

