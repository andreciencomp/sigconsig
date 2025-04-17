const ExceptionService = require("../../../servicos/ExceptionService");
const FachadaDados = require("../dados/FachadaDados");
const ChaveRepetidaException = require("../excessoes/ChaveRepetidaException");
const ComissaoNaoCadastradaException = require("../excessoes/ComissaoNaoCadastradaException");
const ComissionamentoInvalidoException = require("../excessoes/ComissionamentoInvalidoException");

class GerenciaComissionamento {
    async cadastrarComissionamentoPromotora(comissionamento) {
        const fachadaDados = FachadaDados.instancia;
        if (await fachadaDados.existeComissionamentoPromotora(comissionamento)) {
            throw new ChaveRepetidaException("Já existe este comissionamento para promotora");
        }
        return await fachadaDados.salvarComissionamentoPromotora(comissionamento);
    }

    async cadastrarComissionamentoCorretor(comissionamento){
        const fachadaDados = FachadaDados.instancia;
        const existeComissionamentoNaPromotora = await fachadaDados.existeComissionamentoPromotora(comissionamento);
        if(!existeComissionamentoNaPromotora){
            throw new ComissaoNaoCadastradaException("Comissão não cadastrada na promotora");
        }
        const existeComissionamentoCorretor = await fachadaDados.existeComissionamentoCorretor(comissionamento);
        if(existeComissionamentoCorretor){
            throw new ChaveRepetidaException("Esta comissão já está cadastrada para este corretor.");
        }
        
        let comissionamentoPromotora = await fachadaDados.obterComissionamentoPromotora(comissionamento.produto.id, comissionamento.banco.id);
        if(comissionamento.percentagem > comissionamentoPromotora.percentagem){
            throw new ComissionamentoInvalidoException("A percetagem do corretor está maior que o da promotora");
        }
        return await fachadaDados.salvarComissionamentoCorretor(comissionamento);
    }


}

module.exports = GerenciaComissionamento;