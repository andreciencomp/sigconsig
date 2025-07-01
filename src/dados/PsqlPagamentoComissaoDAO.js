const { pool } = require("../helpers/pg_helper");
const PagamentoComissao = require("../entidades/PagamentoComissao");
const EntidadeNaoEncontradaException = require("../excessoes/EntidadeNaoEncontrada");
const PgUtil = require("../utils/PgUtil");

class PsqlPagamentoComissaoDAO {

    constructor() {
        this.querySelect = "select pagamentos_comissoes.id, contratos.id as contrato_id, contratos.valor, valor_corretor, valor_promotora, " +
            "percentagem_promotora, percentagem_corretor, efetivado, cadastrado_por, efetivado_por, dt_pagamento, corretores.id as corretor_id " +
            "from pagamentos_comissoes left join contratos on contratos.id = pagamentos_comissoes.contrato_id " +
            "left join corretores on corretores.id = pagamentos_comissoes.corretor_id where ";
    }

    async obterPorId(id) {
        try {
            const strQuery = this.querySelect + " pagamentos_comissoes.id=$1";
            const result = await pool.query(strQuery, [id]);
            if (result.rows.length === 0) {
                throw new EntidadeNaoEncontradaException("Pagamento inexistente.");
            }
            return this.criarObjeto(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async salvar(pagamentoComissao) {
        try {
            const dtPagamento = new Date();
            const strQuery = "insert into pagamentos_comissoes(corretor_id, contrato_id, percentagem_corretor, percentagem_promotora, valor_corretor, valor_promotora, " +
                "efetivado, cadastrado_por, efetivado_por, dt_pagamento) values" +
                "($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning id ";
            const cadastradoPor = pagamentoComissao.cadastradoPor && pagamentoComissao.cadastradoPor.id ? pagamentoComissao.cadastradoPor.id : null;
            const efetivadoPor = pagamentoComissao.efetivadoPor && pagamentoComissao.efetivadoPor.id ? pagamentoComissao.efetivadoPor.id : null;
            const { rows } = await pool.query(strQuery, [pagamentoComissao.corretor.id, pagamentoComissao.contrato.id, pagamentoComissao.percentagemCorretor,
            pagamentoComissao.percentagemPromotora, pagamentoComissao.valorCorretor, pagamentoComissao.valorPromotora, pagamentoComissao.efetivado,
                cadastradoPor, efetivadoPor, dtPagamento]);
            return rows[0];

        } catch (e) {
            throw PgUtil.checkError(e);

        }
    }

    async atualizar(pagamento) {
        try {
            const pagamentoCadastrado = await this.obterPorId(pagamento.id);
            const contratoId = typeof (pagamento.contrato) != 'undefined' && pagamento.contrato.id ? pagamento.contrato.id : pagamentoCadastrado.contrato.id;
            const corretorId = typeof (pagamento.contrato) != 'undefined' && pagamento.corretor.id ? pagamento.corretor.id : pagamentoCadastrado.corretor.id;
            const valorPromotora = typeof (pagamento.valorPromotora) != 'undefined' ? pagamento.valorPromotora : pagamentoCadastrado.valorPromotora;
            const valorCorretor = typeof (pagamento.valorCorretor) != 'undefined' ? pagamento.valorCorretor : pagamentoCadastrado.valorCorretor;
            const percentagemPromotora = typeof (pagamento.percentagemPromotora) != 'undefined' ? pagamento.percentagemPromotora : pagamentoCadastrado.percentagemPromotora;
            const percentagemCorretor = typeof (pagamento.percentagemCorretor) != 'undefined' ? pagamento.percentagemCorretor : pagamentoCadastrado.percentagemCorretor;
            const efetivado = typeof (pagamento.efetivado) != 'undefined' ? pagamento.efetivado : pagamentoCadastrado.efetivado;
            const efetivadoPorId = typeof(pagamento.efetivadoPor) != 'undefined' ? pagamento.efetivadoPor.id : pagamentoCadastrado.efetivadoPor.id;
            const dtPagamento = typeof (pagamento.dtPagamento) != 'undefined' ? pagamento.dtPagamento : pagamentoCadastrado.dtPagamento;

            const strQuery = 'update pagamentos_comissoes set contrato_id=$1, corretor_id=$2, valor_promotora=$3, valor_corretor=$4, percentagem_promotora=$5, ' +
                'percentagem_corretor=$6, efetivado=$7, efetivado_por=$8, dt_pagamento=$9 where id=$10 returning id';

            const result = await pool.query(strQuery,[contratoId, corretorId, valorPromotora,
                 valorCorretor, percentagemPromotora, percentagemCorretor,efetivado,efetivadoPorId, dtPagamento, pagamento.id]);
            return result.rows[0];

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async existe(id) {
        try {
            const result = await pool.query("select id from pagamentos_comissoes where id=$1", [id]);
            return result.rows.length > 0;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async existePorContratoId(contratoId) {
        try {
            const query = "select id from pagamentos_comissoes where contrato_id=$1";
            const result = await pool.query(query, [contratoId]);
            return result.rows.length > 0;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async listarTodos() {
        try {
            const pagamentos = [];
            const strQuery = this.querySelect + "true order by efetivado desc, dt_pagamento desc";
            const result = await pool.query(strQuery)
            for (let i = 0; i < result.rows.length; i++) {
                const pagamento = this.criarObjeto(result.rows[i]);
                pagamentos.push(pagamento);
            }
            return pagamentos;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async deletar(id) {
        try {
            const result = await pool.query("delete from pagamentos_comissoes where id=$1 returning id", [id]);
            if (result.rows.length === 0) {
                throw new EntidadeNaoEncontradaException("Pagamento inexistente.");
            }
            return result.rows[0];

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    criarObjeto(row) {
        const pagamentoComissao = new PagamentoComissao();
        pagamentoComissao.id = row.id;
        pagamentoComissao.contrato = { id: row.contrato_id, valor: row.valor };
        pagamentoComissao.dtPagamento = pagamentoComissao.dtPagamento ? row.dt_pagamento.toISOString().slice(0, 10) : null;
        pagamentoComissao.percentagemPromotora = row.percentagem_promotora;
        pagamentoComissao.percentagemCorretor = row.percentagem_corretor;
        pagamentoComissao.valorPromotora = row.valor_promotora;
        pagamentoComissao.valorCorretor = row.valor_corretor;
        pagamentoComissao.efetivado = row.efetivado;
        pagamentoComissao.cadastradoPor = { id: row.cadastrado_por };
        pagamentoComissao.efetivadoPor = row.efetivado_por ? { id: row.efetivado_por } : null;
        pagamentoComissao.corretor = { id: row.corretor_id };
        return pagamentoComissao;
    }
}

module.exports = PsqlPagamentoComissaoDAO;