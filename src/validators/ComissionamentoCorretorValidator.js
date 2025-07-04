const DadosInvalidosException = require("../excessoes/DadosInvalidosException");
const DadosNulosException = require("../excessoes/DadosNulosException");

class ComissionamentoCorretorValidator {
    static validarCadastro(comissionamento) {
        if (!comissionamento.produto || comissionamento.produto.id == null) {
            throw new DadosNulosException("O produto está nulo", "produto");
        }
        if (!comissionamento.banco || comissionamento.banco.id == null) {
            throw new DadosNulosException("O banco está nulo", "banco");
        }
        if (comissionamento.percentagem == null) {
            throw new DadosNulosException("A percentagem da comissão está nula.", "percentagem");
        }
        if (comissionamento.percentagem <= 0) {
            throw new DadosInvalidosException("A percentagem da comissão tem que ser maior que zero.", "percentagem");
        }

        return true;
    }
}

module.exports = ComissionamentoCorretorValidator