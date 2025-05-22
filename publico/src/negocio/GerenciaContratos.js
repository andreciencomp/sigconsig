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

    async obterPorID(id) {
        const fachadaDados = new FachadaDados();
        return await fachadaDados.obterContratoPorId(id);
    }

    async cadastrar(contrato) {
        const fachada = FachadaDados.instancia;
        if (contrato.produto.id == null) {
            const fachadaDados = new FachadaDados();
            let produtos = await fachadaDados.listarProdutosPorCriterios(
                { orgaoId: contrato.produto.orgao.id, carencia: contrato.produto.carencia, qtdParcelas: contrato.produto.qtdParcelas }
            );
            if (produtos.length == 0) {
                throw new EntidadeNaoEncontradaException("O produto não foi encontrado.");
            }
            contrato.produto.id = produtos[0].id;
            contrato.status = !contrato.status ? 'CADASTRADO' : contrato.status;
        }
        return await fachada.salvarContrato(contrato);
    }

    async atualizar(contrato) {
        const fachada = FachadaDados.instancia;
        if (contrato.produto) {
            const existeProduto = await fachada.existeProduto(contrato.produto);
            if (!existeProduto) {
                throw new EntidadeNaoEncontradaException("O produto não foi encontrato");
            }
            const novoProduto = (await fachada.listarProdutosPorCriterios(contrato.produto))[0];

            contrato.produto = novoProduto;
        }

        return await fachada.atualizarContrato(contrato, true);
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
            try {
                let res = await this.liberar(arrayContratoId[i], nomeUsuario);
                feedbacks.push({ contratoId: arrayContratoId[i], pagamentoId: res.id });
            } catch (e) {
                feedbacks.push({ contratoId: arrayContratoId[i], excessao: e.name, msg: e.message });
            }
        }
        return feedbacks;

    }

    async listarPorCriterios(criterios) {

        const fachadaDados = FachadaDados.instancia;
        return await fachadaDados.listarContratosPorCriterios(this.filtrarCriterios(criterios));
    }

    filtrarCriterios(criterios) {
        let novosCriterios = {};
        if (criterios['numero']) {
            novosCriterios.numero = criterios.numero;
        }
        if (criterios['cpf']) {
            novosCriterios.cpf = criterios.cpf;
        }
        if (criterios.clienteId) {
            novosCriterios.clienteId = criterios.clienteId;
        }
        if (criterios['clienteNome']) {
            novosCriterios.clienteNome = criterios.clienteNome;
        }
        if (criterios['dataInicial']) {
            novosCriterios.dataInicial = criterios.dataInicial;
        }
        if (criterios['dataFinal']) {
            novosCriterios.dataFinal = criterios.dataFinal;
        }
        if (criterios['dtLiberacaoInicial']) {
            novosCriterios.dtLiberacaoInicial = criterios.dtLiberacaoInicial;
        }
        if (criterios['dtLiberacaoFinal']) {
            novosCriterios.dtLiberacaoFinal = criterios.dtLiberacaoFinal;
        }
        if (criterios['valorMinimo']) {
            novosCriterios.valorMinimo = criterios.valorMinimo;
        }
        if (criterios['valorMaximo']) {
            novosCriterios.valorMaximo = criterios.valorMaximo;
        }
        if (criterios['corretorId']) {
            novosCriterios.corretorId = criterios.corretorId;
        }
        if (criterios['bancoId']) {
            novosCriterios.bancoId = criterios.bancoId;
        }
        if (criterios['orgaoId']) {
            novosCriterios.orgaoId = criterios.orgaoId;
        }
        if (criterios['status']) {
            novosCriterios.status = criterios.status;
        }

        return novosCriterios;

    }

    async deletarContrato(id){
        const fachadaDados = new FachadaDados();
        return await fachadaDados.deletarContrato(id);
    }
}

module.exports = GerenciaContratos;