const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");

function validarCliente(cliente){
    if(!cliente.nome){
        throw new DadosNulosException("O nome do cliente está vazio.","nome");
    }
    if(cliente.nome.length < 2){
        throw new DadosInvalidosException("O nome está muito curto.", "nome");
    }

    if(!cliente.cpf){
        throw new DadosInvalidosException("O CPF está vazio","cpf");
    }

    if(cliente.cpf.length < 11){
        throw new DadosInvalidosException("O CPF é muito curto","cpf");
    }
}

module.exports = validarCliente;