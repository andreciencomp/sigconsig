const FachadaDados = require("../dados/FachadaDados");
const ComissionamentoCorretor = require("../entidades/ComissionamentoCorretor");
const PagamentoComissao = require("../entidades/PagamentoComissao");
const ComissaoNaoCadastradaException = require("../excessoes/ComissaoNaoCadastradaException");
const EntidadeNaoEncontradaException = require("../excessoes/EntidadeNaoEncontrada");
const OperacaoNaoPermitidaException = require("../excessoes/OperacaoNaoPermitidaException");
const PagamentoJaCadastradoException = require("../excessoes/PagamentoJaCadastradoException");
const UsuarioUtil = require("../utils/UsuarioUtil");

class PagamentoService {

    async obterPagamentoPorId(id){
        const fachada = new FachadaDados();
        return await fachada.obterPagamentoComissaoPorId(id);
    }

    async listarTodosPagamentos() {
        const fachada = new FachadaDados();
        return await fachada.listarTodosPagamentos();
    }

    async gerarPagamentoComissao(contratoID, usuarioID) {
        const fachada = new FachadaDados();
        let contrato = await fachada.obterContratoPorId(contratoID);

        if (await fachada.existePagamentoPorContratoId(contratoID)) {
            throw new PagamentoJaCadastradoException("O pagamento de comissão para este contrato já foi gerado.");
        }
        this.validarContratoParaPagamento(contrato);

        const comissionamento = new ComissionamentoCorretor();
        comissionamento.banco = contrato.banco;
        comissionamento.produto = contrato.produto;
        comissionamento.corretor = contrato.corretor;
        const existeComissionamentoPromtora = await fachada.existeComissionamentoPromotora(contrato.produto.id, contrato.banco.id);
        if (!existeComissionamentoPromtora) {
            throw new ComissaoNaoCadastradaException("Comissão não cadastrada na promotora");
        }
        const existeComissionamento = await fachada.existeComissionamentoCorretor(comissionamento);
        if (!existeComissionamento) {
            throw new ComissaoNaoCadastradaException("Comissão não cadastrada para o corretor.");
        }
        const comissionamentoPromotora = await fachada.obterComissionamentoPromotora(contrato.produto.id, contrato.banco.id);
        const comissionamentoCorretor = await fachada.obterComissionamentoCorretor(contrato.corretor.id, contrato.banco.id, contrato.produto.id);
        const pagamentoComissao = new PagamentoComissao();
        const usuario = await fachada.obterUsuarioPorId(usuarioID);
        pagamentoComissao.cadastradoPor = usuario;
        pagamentoComissao.contrato = contrato;
        pagamentoComissao.corretor = contrato.corretor;
        pagamentoComissao.percentagemCorretor = comissionamentoCorretor.percentagem;
        pagamentoComissao.percentagemPromotora = comissionamentoPromotora.percentagem;
        pagamentoComissao.valorCorretor = ((comissionamentoCorretor.percentagem) / 100) * contrato.valor;
        pagamentoComissao.valorPromotora = ((comissionamentoPromotora.percentagem - comissionamentoCorretor.percentagem) / 100) * contrato.valor;
        pagamentoComissao.efetivado = false;
        const retorno = await fachada.salvarPagamentoComissao(pagamentoComissao);
        return retorno;
    }

    async efetivarPagamento(id){
        const fachada = new FachadaDados();
        if(!await fachada.existePagamento(id)){
            throw new EntidadeNaoEncontradaException("Pagamento inexistente.");
        }
        const pagamento = await this.obterPagamentoPorId(id);
        if(pagamento.efetivado){
            throw new OperacaoNaoPermitidaException("Este pagamento já foi efetivado.");
        }
        const camposParaAtualizar = {
            id: id,
            efetivado: true,
            dtEfetivacao: new Date(),
            efetivadoPor: {id: UsuarioUtil.usuarioAutenticadoId}
        }
        return await fachada.atualizarPagamentoComissao(camposParaAtualizar);
    }

    async deletarPagamentoComissao(id){
        const fachada = new FachadaDados();
        const pagamentoComissao = await fachada.obterPagamentoComissaoPorId(id);
        if(pagamentoComissao.efetivado){
            throw new OperacaoNaoPermitidaException("Este pagamento já foi efetivado.");
        }
        return await fachada.deletarPagamentoComissao(id);
    }

    validarContratoParaPagamento(contrato) {
        if (contrato.status && contrato.status != "LIBERADO") {
            throw new ContratoNaoLiberadoException("O contrato não está liberado.");
        }
        if (!contrato.corretor) {
            throw new DadosNulosException("O contrato está sem corretor definido.");
        }
        if (!contrato.produto) {
            throw new DadosNulosException("O contrato está sem o produto.");
        }
        if (!contrato.banco) {
            throw new DadosNulosException("O contrato está sem o banco.");
        }
    }
}

module.exports = PagamentoService;