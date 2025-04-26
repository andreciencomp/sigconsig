const { pool } = require("../../../servicos/database_service");
const PgUtil = require("./PgUtil");

class PsqlPagamentoComissaoDAO{

    static #instancia;

    static getInstancia(){
        if(this.#instancia == null){
            this.#instancia = new PsqlPagamentoComissaoDAO();
            return this.#instancia;
        }
        return this.#instancia;
    }

    async salvar(pagamentoComissao){
        try{
            const dtPagamento = new Date();
            const query = "insert into pagamentos_comissoes(corretor_id, contrato_id, percentagem_corretor, percentagem_promotora, valor_corretor, valor_promotora," +
            "efetivado, cadastrado_por, efetivado_por, dt_pagamento) values" +
            "($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning id";
            const {rows} = await pool.query(query, [pagamentoComissao.corretor.id, pagamentoComissao.contrato.id, pagamentoComissao.percentagemCorretor,
                pagamentoComissao.percentagemPromotora, pagamentoComissao.valorCorretor, pagamentoComissao.valorPromotora, pagamentoComissao.efetivado,
                pagamentoComissao.cadastradoPor, pagamentoComissao.efetivadoPor, dtPagamento]);
            return rows[0];

        }catch(e){
            throw PgUtil.checkError(e);
        }
    }

    async existePorContratoId(contratoId){
        try{
            const query = "select id from pagamentos_comissoes where contrato_id=$1";
            const res = await pool.query(query,[contratoId]);
            return res.rowCount > 0;
        }catch(e){
            PgUtil.checkError(e);
        }
    }
}

module.exports = PsqlPagamentoComissaoDAO;