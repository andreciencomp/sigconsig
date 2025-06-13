const FachadaDados = require("../dados/FachadaDados");
const PsqlContratoDAO = require("../dados/PsqlContratoDAO");
const DadosInvalidosException = require("../excessoes/DadosInvalidosException");
const EntidadeNaoEncontradaException = require("../excessoes/EntidadeNaoEncontrada");
const LiberacaoNaoPossivelException = require("../excessoes/LiberacaoNaoPossivelException");
const OperacaoNaoPermitidaException = require("../excessoes/OperacaoNaoPermitidaException");

class GerenciaContratos {

    async obterPorID(id) {
        const fachada = new FachadaDados();
        return await fachada.obterContratoPorId(id);
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

    async liberar(contratoId, dtLiberacao) {
        const date = new Date(dtLiberacao);
        if(date.toString() == "Invalid Date"){
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
        await fachada.atualizarContrato(contrato, true);
        return "OK";
    }

    async liberarVarios(arrayContratoId,dtLiberacao) {
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

    async listarPorCriterios(criterios) {

        const fachada = new FachadaDados();
        return await fachada.listarContratosPorCriterios(this.filtrarCriterios(criterios));
    }

    filtrarCriterios(criterios) {
        if(!criterios){
            return {}
        }
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
        const fachada = new FachadaDados();
        const contrato = await fachada.obterContratoPorId(id);
        if(contrato.status != 'CADASTRADO'){
            throw new OperacaoNaoPermitidaException("Não foi possível remover. O contrato está com o status: " + contrato.status);
        }
        return await fachada.deletarContrato(id);
    }
}

module.exports = GerenciaContratos;