const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");
const DataValidator = require("./DataValidator");

function validarCorretor(corretor){
    if(!corretor.codigo){
        throw new DadosNulosException("O código do corretor não pode ser nulo","codigo");
    }
    if(isNaN(Number(corretor.codigo))){
        throw new DadosInvalidosException("O código do corretor tem que ser um número","codigo");
    }

    if(!corretor.cpf){
        throw new DadosNulosException("O CPF não pode ficar em branco.","cpf");
    }
    if(corretor.cpf.length < 11){
        throw new DadosInvalidosException("O CPF está muito curto.","cpf");
    }

    if(!corretor.nome){
        throw new DadosNulosException("O nome do corretor não pode ficar em branco","nome");
    }
    if(corretor.nome.length < 3){
        throw new DadosInvalidosException("O nome está muito curto","nome");
    }
    if(corretor.dtNascimento){
        DataValidator.validarData(corretor.dtNascimento, "dtNascimento");
    }
    return true;
}

module.exports = validarCorretor;