const express = require('express');
const roteador = express.Router();
const Usuario = require('../src/entidades/Usuario');

roteador.get('/', (req, res, next)=>{
    usr = new Usuario('andre','wer',123);
    res.status(200).send('SigConsigAPI');

});

module.exports = roteador;