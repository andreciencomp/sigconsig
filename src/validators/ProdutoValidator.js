const DadosInvalidosException = require("../excessoes/DadosInvalidosException");
const DadosNulosException = require("../excessoes/DadosNulosException");

class ProdutoValidator {
    static validarCadastro(produto) {
        this.validarCarencia(produto);
        this.validarQtdParcelas(produto);
        this.validarOrgao(produto);
        return true;

    }

    static validarAtualizacao(produto) {
        if (typeof (produto.carencia) != 'undefined') {
            this.validarCarencia(produto);
        }
        if (typeof (produto.qtdParcelas) != 'undefined') {
            this.validarQtdParcelas(produto);
        }
        if (typeof (produto.orgao) != 'undefined') {
           this.validarOrgao(produto);
        }
        return true;
    }

    static validarCarencia(produto){
        if (!produto.carencia) {
            throw new DadosNulosException("A carência não pode ser nula.", "carencia");
        }
        if (produto.carencia <= 0) {
            throw new DadosInvalidosException("A carência tem que ser maior que zero.", "carencia");
        }
    }

    static validarQtdParcelas(produto){
        if (!produto.qtdParcelas) {
            throw new DadosNulosException("A quantidade de parcelas não pode ser nula.", "qtdParcelas");
        }
        if (produto.qtdParcelas <= 0) {
            throw new DadosInvalidosException("A quantidade de parcelas tem que ser maior que zero.", "qtdParcelas");
        }
    }

    static validarOrgao(produto){
        if(!produto.orgao || !produto.orgao.id){
            throw new DadosNulosException("O orgão está nulo","orgao");
        }
    }
}




module.exports = ProdutoValidator;