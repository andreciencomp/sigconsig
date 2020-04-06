'use strict'

const express = require('express');
const roteadorDefault = require('./rotas/default-rotas');
const roteadorUsuario = require('./rotas/usuario-rotas');
const roteadorAuth = require('./rotas/auth-rotas');
const roteadorBanco = require('./rotas/banco-rotas');
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

module.exports = app;

