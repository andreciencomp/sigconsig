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
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.use(bodyParser.json());

app.use('/', roteadorDefault);
app.use('/api', roteadorUsuario);
app.use('/api', roteadorAuth);
app.use('/api', roteadorBanco);
app.use('/api', roteadorOrgaos);
app.use('/api', roteadorEstado);
app.use('/api', roteadorCidade);
app.use('/api', roteadorCorretor);
app.use('/api', roteadorCliente);
app.use('/api', roteadorProduto);
app.use('/api', roteadorComissionamento);
app.use('/api', roteadorContratos);

module.exports = app;

