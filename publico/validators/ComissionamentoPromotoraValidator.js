const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");

function validarComissionamentoPromotora(comissionamento){
    if(comissionamento.percentagem == null){
        throw new DadosNulosException("O valor da percentagem está nulo.");
    }
    if(comissionamento.percentagem <= 0){
        throw new DadosInvalidosException("O valor da percentagem tem que ser maior que zero.");
    }
    if(!comissionamento.produto || !comissionamento.produto.id){
        throw new DadosNulosException("O produto está nulo.");
    }
    if(comissionamento.banco == null || comissionamento.banco.id == null){
        throw new DadosNulosException("O banco está nulo");
    }

}

module.exports = validarComissionamentoPromotora;