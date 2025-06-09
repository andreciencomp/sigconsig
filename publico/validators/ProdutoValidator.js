const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");

function validarProduto(produto) {
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

}

module.exports = validarProduto;