const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");

function validarComissionamentoCorretor(comissionamento){
    if(!comissionamento.produto || comissionamento.produto.id == null){
        throw new DadosNulosException("O produto está nulo");
    }
    if(!comissionamento.banco || comissionamento.banco.id == null ){
        throw new DadosNulosException("O banco está nulo");
    }
    if(comissionamento.percentagem == null){
        throw new DadosNulosException("A percentagem da comissão está nula.");
    }
    if(comissionamento.percentagem <= 0){
        throw new DadosInvalidosException("A percentagem da comissão tem que ser maior que zero.");
    }
}