const express = require('express');
const roteador = express.Router();

roteador.get('/', (req, res, next)=>{
    res.status(200).send('SigConsigAPI');

});

module.exports = roteador;