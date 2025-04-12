const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");

function validarCorretor(corretor){
    if(!corretor.codigo){
        throw new DadosNulosException("O código do corretor não pode ser nulo");
    }
    if(isNaN(Number(corretor.codigo))){
        throw new DadosInvalidosException("O código do corretor tem que ser um número");
    }

    if(!corretor.cpf){
        throw new DadosNulosException("O CPF não pode ficar em branco.");
    }
    if(corretor.cpf.length < 11){
        throw new DadosInvalidosException("O CPF está muito curto.");
    }

    if(!corretor.nome){
        throw new DadosNulosException("O nome do corretor não pode ficar em branco");
    }
    if(corretor.nome.length < 3){
        throw new DadosInvalidosException("O nome está muito curto");
    }
}

module.exports = validarCorretor;