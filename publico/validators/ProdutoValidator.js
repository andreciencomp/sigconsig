const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");

function validarProduto(produto){
    if(!produto.orgao.id){
        throw new DadosNulosException("Orgão não pode ser nulo.");
    }
    if(!produto.carencia){
        throw new DadosNulosException("A carência não pode ser nula.");
    }
    if(produto.carencia <= 0){
        throw new DadosInvalidosException("A carência tem que ser maior que zero.");
    }
    if(!produto.qtdParcelas){
        throw new DadosNulosException("A quantidade de parcelas não pode ser nula.");
    }
    if(produto.qtdParcelas <= 0){
        throw new DadosInvalidosException("A quantidade de parcelas tem que ser maior que zero.");
    }

}

module.exports = validarProduto;