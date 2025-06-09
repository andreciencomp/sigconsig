const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");

function validarComissionamentoPromotora(comissionamento){
    if(comissionamento.percentagem == null){
        throw new DadosNulosException("O valor da percentagem está nulo.","percentagem");
    }
    if(comissionamento.percentagem <= 0){
        throw new DadosInvalidosException("O valor da percentagem tem que ser maior que zero.","percentagem");
    }
    if(!comissionamento.produto || !comissionamento.produto.id){
        throw new DadosNulosException("O produto está nulo.","produto");
    }
    if(comissionamento.banco == null || comissionamento.banco.id == null){
        throw new DadosNulosException("O banco está nulo","banco");
    }

}

module.exports = validarComissionamentoPromotora;