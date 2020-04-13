'use strict'

const express = require('express');
const roteadorDefault = require('./rotas/default-rotas');
const roteadorUsuario = require('./rotas/usuario-rotas');
const roteadorAuth = require('./rotas/auth-rotas');
const roteadorBanco = require('./rotas/banco-rotas');
const roteadorOrgaos = require('./rotas/orgaos-rotas');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/', roteadorDefault);
app.use('/api', roteadorUsuario);
app.use('/api',roteadorAuth);
app.use('/api', roteadorBanco);
app.use('/api', roteadorOrgaos);

module.exports = app;

