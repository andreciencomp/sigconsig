const FachadaDados = require("../dados/FachadaDados");
const PsqlContratoDAO = require("../dados/PsqlContratoDAO");
const DadosInvalidosException = require("../excessoes/DadosInvalidosException");
const EntidadeNaoEncontradaException = require("../excessoes/EntidadeNaoEncontrada");
const LiberacaoNaoPossivelException = require("../excessoes/LiberacaoNaoPossivelException");
const OperacaoNaoPermitidaException = require("../excessoes/OperacaoNaoPermitidaException");
const CPFService = require("./CPFService");

class GerenciaContratos {

    async obterPorID(id) {
        const fachada = new FachadaDados();
        return await fachada.obterContratoPorId(id);
    }

    async cadastrar(contrato) {

        const fachada = new FachadaDados();
        if (contrato.produto.id == null) {
            const fachadaDados = new FachadaDados();
            let produtos = await fachadaDados.listarProdutosPorCriterios(
                { orgaoId: contrato.produto.orgao.id, carencia: contrato.produto.carencia, qtdParcelas: contrato.produto.qtdParcelas }
            );
            if (produtos.length == 0) {
                throw new EntidadeNaoEncontradaException("O produto não foi encontrado.","produto");
            }
            contrato.produto.id = produtos[0].id;
        }

        if (contrato.cliente && contrato.cliente.cpf) {
            contrato.cliente.cpf = CPFService.formatarParaApenasNumeros(contrato.cliente.cpf);
        }
        contrato.status = 'CADASTRADO';
        return await fachada.salvarContrato(contrato);
    }

    async atualizar(contrato) {
        const fachada = new FachadaDados();
        if(contrato.cliente && contrato.cliente.cpf){
            contrato.cliente.cpf = CPFService.formatarParaApenasNumeros(contrato.cliente.cpf);
        }
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

    async liberar(contratoId, dtLiberacao) {
        const date = new Date(dtLiberacao);
        if (date.toString() == "Invalid Date") {
            throw new DadosInvalidosException("A data de liberação está inválida");
        }

        const contratoDAO = new PsqlContratoDAO();
        const contrato = await contratoDAO.obterPorId(contratoId);
        switch (contrato.status) {
            case 'LIBERADO':
                throw new LiberacaoNaoPossivelException("O contrato já foi liberado");
            case 'CANCELADO':
                throw new LiberacaoNaoPossivelException("O contrato está cancelado.");
        }
        contrato.status = "LIBERADO";
        contrato.dtLiberacao = dtLiberacao;
        const fachada = new FachadaDados();
        const contratoLiberado = await fachada.atualizarContrato(contrato, true);
        return contratoLiberado;
    }

    async liberarVarios(arrayContratoId, dtLiberacao) {
        let feedbacks = [];
        for (let i = 0; i < arrayContratoId.length; i++) {
            try {
                let res = await this.liberar(arrayContratoId[i], dtLiberacao);
                feedbacks.push({ contratoId: arrayContratoId[i], pagamentoId: res.id });
            } catch (e) {
                feedbacks.push({ contratoId: arrayContratoId[i], excessao: e.name, msg: e.message });
            }
        }
        return feedbacks;

    }

    async listarContratos(criterios=null) {
        const fachada = new FachadaDados();
        return await fachada.listarContratos(criterios);
    }

    async deletarContrato(id) {
        const fachada = new FachadaDados();
        const contrato = await fachada.obterContratoPorId(id);
        if (contrato.status != 'CADASTRADO') {
            throw new OperacaoNaoPermitidaException("Não foi possível remover. O contrato está com o status: " + contrato.status);
        }
        return await fachada.deletarContrato(id);
    }
}

module.exports = GerenciaContratos;