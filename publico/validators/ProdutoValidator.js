const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");

class ProdutoValidator {
    static validarCadastro(produto) {
        if (!produto.carencia) {
            throw new DadosNulosException("A carência não pode ser nula.", "carencia");
        }
        if (produto.carencia <= 0) {
            throw new DadosInvalidosException("A carência tem que ser maior que zero.", "carencia");
        }
        if (!produto.qtdParcelas) {
            throw new DadosNulosException("A quantidade de parcelas não pode ser nula.", "qtdParcelas");
        }
        if (produto.qtdParcelas <= 0) {
            throw new DadosInvalidosException("A quantidade de parcelas tem que ser maior que zero.", "qtdParcelas");
        }
        if(!produto.orgao || !produto.orgao.id){
            throw new DadosNulosException("O orgão está nulo","orgao");
        }
        return true;

    }

    static validarAtualizacao(produto) {
        if (typeof (produto.carencia) != 'undefined' && !produto.carencia) {
            throw new DadosNulosException("A carência não pode ser nula.", "carencia");
        }
        if (typeof (produto.carencia) != 'undefined' && produto.carencia <= 0) {
            throw new DadosInvalidosException("A carência tem que ser maior que zero.", "carencia");
        }
        if (typeof (produto.qtdParcelas) != 'undefined' && !produto.qtdParcelas) {
            throw new DadosNulosException("A quantidade de parcelas não pode ser nula.", "qtdParcelas");
        }
        if (typeof (produto.qtdParcelas) != 'undefined' && produto.qtdParcelas <= 0) {
            throw new DadosInvalidosException("A quantidade de parcelas tem que ser maior que zero.", "qtdParcelas");
        }
        return true;
    }
}




module.exports = ProdutoValidator;