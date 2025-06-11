const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");

function validarCadastroProduto(produto) {
    if (!produto.carencia) {
        throw new DadosNulosException("A carência não pode ser nula.","carencia");
    }
    if (produto.carencia <= 0) {
        throw new DadosInvalidosException("A carência tem que ser maior que zero.","carencia");
    }
    if (!produto.qtdParcelas) {
        throw new DadosNulosException("A quantidade de parcelas não pode ser nula.","qtdParcelas");
    }
    if (produto.qtdParcelas <= 0) {
        throw new DadosInvalidosException("A quantidade de parcelas tem que ser maior que zero.","qtdParcelas");
    }
    return true;

}

function validarAtualizacaoProduto(produto) {
    if (typeof(produto.carencia) !='undefined' && !produto.carencia) {
        throw new DadosNulosException("A carência não pode ser nula.","carencia");
    }
    if (typeof(produto.carencia) !='undefined' && produto.carencia <= 0) {
        throw new DadosInvalidosException("A carência tem que ser maior que zero.","carencia");
    }
    if (typeof(produto.qtdParcelas) !='undefined' && !produto.qtdParcelas) {
        throw new DadosNulosException("A quantidade de parcelas não pode ser nula.","qtdParcelas");
    }
    if (typeof(produto.qtdParcelas) !='undefined' && produto.qtdParcelas <= 0) {
        throw new DadosInvalidosException("A quantidade de parcelas tem que ser maior que zero.","qtdParcelas");
    }
    return true;

}


module.exports = {validarCadastroProduto, validarAtualizacaoProduto};