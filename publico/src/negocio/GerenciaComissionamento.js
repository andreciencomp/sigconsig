const ExceptionService = require("../../../servicos/ExceptionService");
const FachadaDados = require("../dados/FachadaDados");
const ChaveRepetidaException = require("../excessoes/ChaveRepetidaException");

class GerenciaComissionamento {
    async cadastrarComissionamentoPromotora(comissionamento) {
        const fachadaDados = FachadaDados.instancia;
        if (await fachadaDados.existeComissionamentoPromotora(comissionamento)) {
            throw new ChaveRepetidaException("Já existe este comissionamento para promotora");
        }
        return await fachadaDados.salvarComissionamentoPromotora(comissionamento);
    }


}

module.exports = GerenciaComissionamento;