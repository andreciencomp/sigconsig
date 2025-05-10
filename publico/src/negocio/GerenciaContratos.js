const FachadaDados = require("../dados/FachadaDados");
const PsqlContratoDAO = require("../dados/PsqlContratoDAO");
const PsqlCorretorDAO = require("../dados/PsqlCorretorDAO");
const ComissionamentoCorretor = require("../entidades/ComissionamentoCorretor");
const Contrato = require("../entidades/Contrato");
const PagamentoComissao = require("../entidades/PagamentoComissao");
const ComissaoNaoCadastradaException = require("../excessoes/ComissaoNaoCadastradaException");
const EntidadeNaoEncontradaException = require("../excessoes/EntidadeNaoEncontrada");
const LiberacaoNaoPossivelException = require("../excessoes/LiberacaoNaoPossivelException");
const PagamentoJaCadastradoException = require("../excessoes/PagamentoJaCadastradoException");
const GerenciaComissionamento = require("./GerenciaComissionamento");

class GerenciaContratos {
    async cadastrar(contrato) {
        const fachada = FachadaDados.instancia;
        if(contrato.produto.id == null){
            const fachadaDados= new FachadaDados();
            let produtos = await fachadaDados.listarProdutosPorCriterios(
                {orgaoId:contrato.produto.orgao.id, carencia:contrato.produto.carencia, qtdParcelas:contrato.produto.qtdParcelas}
            );
            if(produtos.length == 0){
                throw new EntidadeNaoEncontradaException("O produto não foi encontrado.");
            }
            contrato.produto.id = produtos[0].id;
            contrato.status = !contrato.status ? 'CADASTRADO' : contrato.status;
        }
        return await fachada.salvarContrato(contrato);
    }

    async atualizar(contrato) {
        const fachada = FachadaDados.instancia;
        return await fachada.atualizarContrato(contrato);
    }

    async liberar(contratoId, nomeUsuario) {
        const fachadaDados = FachadaDados.instancia;
        const existePagamentoComissao = await fachadaDados.existePagamentoPorContratoId(contratoId);
        if (existePagamentoComissao) {
            throw new PagamentoJaCadastradoException("Este pagamento já está cadastrado");
        }
        const contratoDAO = new PsqlContratoDAO();
        const contrato = await contratoDAO.obterPorId(contratoId);
        switch (contrato.status) {
            case 'LIBERADO':
                throw new LiberacaoNaoPossivelException("O contrato já foi liberado");
            case 'CANCELADO':
                throw new LiberacaoNaoPossivelException("O contrato está cancelado.");

        }
        const gerenciaComissionamento = new GerenciaComissionamento();
        let pagamentoComissao = await gerenciaComissionamento.gerarPagamentoComissao(contrato);
        pagamentoComissao.cadastradoPor = nomeUsuario;
        contrato.status = "LIBERADO";
        await fachadaDados.atualizarContrato(contrato);
        return await fachadaDados.salvarPagamentoComissao(pagamentoComissao);
    }

    async liberarVarios(arrayContratoId, nomeUsuario) {
        let feedbacks = [];
        for (let i = 0; i < arrayContratoId.length; i++) {
            try{
                let res = await this.liberar(arrayContratoId[i], nomeUsuario);
                feedbacks.push({contratoId: arrayContratoId[i],pagamentoId : res.id});
            }catch(e){
                feedbacks.push({contratoId:arrayContratoId[i],excessao:e.name, msg:e.message});
            }
        }
        return feedbacks;

    }

    async listarPorCriterios(criterios){
        const fachadaDados = FachadaDados.instancia;
        return await fachadaDados.listarContratosPorCriterios(criterios);
    }
}

module.exports = GerenciaContratos;