const FachadaDados = require("../dados/FachadaDados");
const ComissionamentoCorretor = require("../entidades/ComissionamentoCorretor");
const PagamentoComissao = require("../entidades/PagamentoComissao");
const ChaveRepetidaException = require("../excessoes/ChaveRepetidaException");
const ComissaoNaoCadastradaException = require("../excessoes/ComissaoNaoCadastradaException");
const ComissionamentoInvalidoException = require("../excessoes/ComissionamentoInvalidoException");
const ContratoNaoLiberadoException = require("../excessoes/ContratoNaoLiberadoException");
const DadosNulosException = require("../excessoes/DadosNulosException");
const PagamentoJaCadastradoException = require("../excessoes/PagamentoJaCadastradoException");

class GerenciaComissionamento {

    async obterComissionamentoPromotoraPorId(id){
        const fachada = new FachadaDados();
        return fachada.obterComissionamentoPromotoraPorId(id);
    }

    async cadastrarComissionamentoPromotora(comissionamento) {
        const fachada = new FachadaDados();
        if (await fachada.existeComissionamentoPromotora(comissionamento.produto.id, comissionamento.banco.id)) {
            throw new ChaveRepetidaException("Já existe este comissionamento para promotora");
        }
        return await fachada.salvarComissionamentoPromotora(comissionamento);
    }

    async cadastrarComissionamentoCorretor(comissionamento){
        const fachada = new FachadaDados();
        const existeComissionamentoNaPromotora = await fachada.existeComissionamentoPromotora(comissionamento.produto.id, comissionamento.banco.id);
        if(!existeComissionamentoNaPromotora){
            throw new ComissaoNaoCadastradaException("Comissão não cadastrada na promotora");
        }
        const existeComissionamentoCorretor = await fachada.existeComissionamentoCorretor(comissionamento);
        if(existeComissionamentoCorretor){
            throw new ChaveRepetidaException("Esta comissão já está cadastrada para este corretor.");
        }
        
        let comissionamentoPromotora = await fachada.obterComissionamentoPromotora(comissionamento.produto.id, comissionamento.banco.id);
        if(comissionamento.percentagem > comissionamentoPromotora.percentagem){
            throw new ComissionamentoInvalidoException("A percetagem do corretor está maior que o da promotora");
        }
        return await fachada.salvarComissionamentoCorretor(comissionamento);
    }


}

module.exports = GerenciaComissionamento;