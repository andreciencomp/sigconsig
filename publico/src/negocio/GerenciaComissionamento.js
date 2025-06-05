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

    async gerarPagamentoComissao(contratoID, usuarioID){
        
        const fachadaDados = new FachadaDados();
        let contrato = await fachadaDados.obterContratoPorId(contratoID);
        if(contrato.comissaoPaga){
            throw new PagamentoJaCadastradoException("O pagamento de comissão para este contrato já foi gerado.");
        }
        this.validarContratoParaPagamento(contrato);
        
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
        const usuario = await fachadaDados.obterUsuarioPorId(usuarioID);
        pagamentoComissao.cadastradoPor = usuario;
        pagamentoComissao.contrato = contrato;
        pagamentoComissao.corretor = contrato.corretor;
        pagamentoComissao.percentagemCorretor = comissionamentoCorretor.percentagem;
        pagamentoComissao.percentagemPromotora = comissionamentoPromotora.percentagem;
        pagamentoComissao.valorCorretor = ((comissionamentoCorretor.percentagem)/100)* contrato.valor;
        pagamentoComissao.valorPromotora = ((comissionamentoPromotora.percentagem - comissionamentoCorretor.percentagem)/100) * contrato.valor;
        pagamentoComissao.efetivado = false;
        const retorno =  await fachadaDados.salvarPagamentoComissao(pagamentoComissao);
        await fachadaDados.atualizarContrato({id:contrato.id, comissaoPaga:true});
        return retorno;
    }

    validarContratoParaPagamento(contrato){
        if(contrato.status && contrato.status != "LIBERADO"){
            throw new ContratoNaoLiberadoException("O contrato não está liberado.");
        }
        if(!contrato.corretor){
            throw new DadosNulosException("O contrato está sem corretor definido.");
        }
        if(!contrato.produto){
            throw new DadosNulosException("O contrato está sem o produto.");
        }
        if(!contrato.banco){
            throw new DadosNulosException("O contrato está sem o banco.");
        }
    }


}

module.exports = GerenciaComissionamento;