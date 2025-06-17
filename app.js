'use strict'

const express = require('express');
const roteadorDefault = require('./rotas/default-rotas');
const roteadorUsuario = require('./rotas/usuario-rotas');
const roteadorAuth = require('./rotas/auth-rotas');
const roteadorBanco = require('./rotas/banco-rotas');
const roteadorOrgaos = require('./rotas/orgaos-rotas');
const roteadorEstado = require('./rotas/estado-rotas');
const roteadorCidade = require('./rotas/cidade-rotas');
const roteadorCorretor = require('./rotas/corretor-rotas');
const roteadorCliente = require('./rotas/cliente-rotas');
const roteadorProduto = require('./rotas/produto-rotas');
const roteadorComissionamento = require('./rotas/comissionamento-rotas');
const roteadorContratos = require('./rotas/contratos-rotas');
const roteadorPagamentoComissao = require('./rotas/pagamentos-comissoes');
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

