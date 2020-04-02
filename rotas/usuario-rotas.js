const express = require('express');
const roteador = express.Router();
const Usuario = require('../src/entidades/Usuario')
const FachadaNegocio = require('../src/negocio/FachadaNegocio');

roteador.post('/usuario/cadastrar', (req, res, next)=>{
    let fachada = new FachadaNegocio();
    let u =  new Usuario("Andre","1234","ADM");
    let j =  JSON.stringify(u);

    res.status(200).send(Usuario.USUARIO_ADM+"s"+ j);


    
});

module.exports = roteador;