const { pool } = require("../../../servicos/database_service");
const PgUtil = require("./PgUtil");

class PsqlPagamentoComissaoDAO{

    async salvar(pagamentoComissao){
        const client = await pool.connect();
        try{
            const dtPagamento = new Date();
            const query = "insert into pagamentos_comissoes(corretor_id, contrato_id, percentagem_corretor, percentagem_promotora, valor_corretor, valor_promotora, " +
            "efetivado, cadastrado_por, efetivado_por, dt_pagamento) values" +
            "($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning id ";
            const cadastradoPor = pagamentoComissao.cadastradoPor && pagamentoComissao.cadastradoPor.id ? pagamentoComissao.cadastradoPor.id : null; 
            const efetivadoPor = pagamentoComissao.efetivadoPor && pagamentoComissao.efetivadoPor.id ? pagamentoComissao.efetivadoPor.id : null;
            const {rows} = await client.query(query, [pagamentoComissao.corretor.id, pagamentoComissao.contrato.id, pagamentoComissao.percentagemCorretor,
                pagamentoComissao.percentagemPromotora, pagamentoComissao.valorCorretor, pagamentoComissao.valorPromotora, pagamentoComissao.efetivado,
                cadastradoPor, efetivadoPor, dtPagamento]);
            return rows[0].id;

        }catch(e){
            throw PgUtil.checkError(e);
        }finally{
            client.release();
        }
    }

    async existePorContratoId(contratoId){
        const cli = await pool.connect()
        try{
            const query = "select id from pagamentos_comissoes where contrato_id=$1";
            const cli = await pool.connect();
            const res = await cli.query(query,[contratoId]);
            return res.rowCount > 0;
        }catch(e){
            PgUtil.checkError(e);
        }finally{
            cli.release();
        }
    }
}

module.exports = PsqlPagamentoComissaoDAO;