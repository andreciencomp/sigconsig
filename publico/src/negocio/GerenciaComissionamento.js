const FachadaDados = require("../dados/FachadaDados");
const ComissionamentoCorretor = require("../entidades/ComissionamentoCorretor");
const PagamentoComissao = require("../entidades/PagamentoComissao");
const ChaveRepetidaException = require("../excessoes/ChaveRepetidaException");
const ComissaoNaoCadastradaException = require("../excessoes/ComissaoNaoCadastradaException");
const ComissionamentoInvalidoException = require("../excessoes/ComissionamentoInvalidoException");

class GerenciaComissionamento {
    async cadastrarComissionamentoPromotora(comissionamento) {
        const fachadaDados = FachadaDados.instancia;
        if (await fachadaDados.existeComissionamentoPromotora(comissionamento.produto.id, comissionamento.banco.id)) {
            throw new ChaveRepetidaException("Já existe este comissionamento para promotora");
        }
        return await fachadaDados.salvarComissionamentoPromotora(comissionamento);
    }

    async cadastrarComissionamentoCorretor(comissionamento){
        const fachadaDados = FachadaDados.instancia;
        const existeComissionamentoNaPromotora = await fachadaDados.existeComissionamentoPromotora(comissionamento.produto.id, comissionamento.banco.id);
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

    async gerarPagamentoComissao(contrato){
        const fachadaDados = FachadaDados.instancia;
        const comissionamento = new ComissionamentoCorretor();
        comissionamento.banco = contrato.banco;
        comissionamento.produto = contrato.produto;
        comissionamento.corretor = contrato.corretor;
        const existeComissionamentoPromtora = await fachadaDados.existeComissionamentoPromotora(contrato.produto.id,contrato.banco.id);
        if(!existeComissionamentoPromtora){
            throw new ComissaoNaoCadastradaException("Comissão não cadastrada na promotora");
        }
        const existeComissionamento = await fachadaDados.existeComissionamentoCorretor(comissionamento);
        if(!existeComissionamento){
            throw new ComissaoNaoCadastradaException("Comissão não cadastrada para o corretor.");
        }
        const comissionamentoPromotora = await fachadaDados.obterComissionamentoPromotora(contrato.produto.id, contrato.banco.id);
        const comissionamentoCorretor = await fachadaDados.obterComissionamentoCorretor(contrato.corretor.id, contrato.banco.id, contrato.produto.id);
        const pagamentoComissao = new PagamentoComissao();
        pagamentoComissao.contrato = contrato;
        pagamentoComissao.corretor = contrato.corretor;
        pagamentoComissao.percentagemCorretor = comissionamentoCorretor.percentagem;
        pagamentoComissao.percentagemPromotora = comissionamentoPromotora.percentagem;
        pagamentoComissao.valorCorretor = ((comissionamentoCorretor.percentagem)/100)* contrato.valor;
        pagamentoComissao.valorPromotora = ((comissionamentoPromotora.percentagem - comissionamentoCorretor.percentagem)/100) * contrato.valor;
        pagamentoComissao.efetivado = false;
        return pagamentoComissao;
        
    }


}

module.exports = GerenciaComissionamento;