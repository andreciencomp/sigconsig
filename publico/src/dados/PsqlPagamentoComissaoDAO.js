const { pool } = require("../../../servicos/database_service");
const PagamentoComissao = require("../entidades/PagamentoComissao");
const EntidadeNaoEncontradaException = require("../excessoes/EntidadeNaoEncontrada");
const PgUtil = require("./PgUtil");

class PsqlPagamentoComissaoDAO{

    constructor(){
        this.querySelect = "select pagamentos_comissoes.id, contratos.id as contrato_id, contratos.valor, valor_corretor, valor_promotora, " +
                "percentagem_promotora, percentagem_corretor, efetivado, cadastrado_por, efetivado_por, dt_pagamento, corretores.id as corretor_id " +
                "from pagamentos_comissoes left join contratos on contratos.id = pagamentos_comissoes.contrato_id " + 
                "left join corretores on corretores.id = pagamentos_comissoes.corretor_id where ";
    }

    async obterPorId(id){
        try{
            const strQuery = this.querySelect + " pagamentos_comissoes.id=$1";
            const result = await pool.query(strQuery,[id]);
            if(result.rowCount == 0 ){
                throw new EntidadeNaoEncontradaException("Pagamento inexistente.");
            }
            return this.criarObjeto(result.rows[0]);

        }catch(e){
            PgUtil.checkError(e);
        }
    }

    async salvar(pagamentoComissao){
        const client = await pool.connect();
        try{
            const dtPagamento = new Date();
            const strQuery = "insert into pagamentos_comissoes(corretor_id, contrato_id, percentagem_corretor, percentagem_promotora, valor_corretor, valor_promotora, " +
            "efetivado, cadastrado_por, efetivado_por, dt_pagamento) values" +
            "($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning id ";
            const cadastradoPor = pagamentoComissao.cadastradoPor && pagamentoComissao.cadastradoPor.id ? pagamentoComissao.cadastradoPor.id : null; 
            const efetivadoPor = pagamentoComissao.efetivadoPor && pagamentoComissao.efetivadoPor.id ? pagamentoComissao.efetivadoPor.id : null;
            const {rows} = await client.query(strQuery, [pagamentoComissao.corretor.id, pagamentoComissao.contrato.id, pagamentoComissao.percentagemCorretor,
                pagamentoComissao.percentagemPromotora, pagamentoComissao.valorCorretor, pagamentoComissao.valorPromotora, pagamentoComissao.efetivado,
                cadastradoPor, efetivadoPor, dtPagamento]);
            return rows[0];

        }catch(e){
            throw PgUtil.checkError(e);

        }finally{
            client.release();
        }
    }

    async existePorContratoId(contratoId){
        try{
            const query = "select id from pagamentos_comissoes where contrato_id=$1";
            const result = await pool.query(query,[contratoId]);
            return result.rowCount > 0;
            
        }catch(e){
            PgUtil.checkError(e);

        }
    }

    async listarTodos(){
        try{
            const pagamentos = [];
            const strQuery = this.querySelect + "true order by efetivado desc";
            const result = await pool.query(strQuery)
            for(let i=0; i < result.rowCount; i++){
                const pagamento = this.criarObjeto(result.rows[i]);
                pagamentos.push(pagamento);
            }
            return pagamentos;

        }catch(e){
            PgUtil.checkError(e);
        }
    }

    criarObjeto(row){
        const pagamentoComissao = new PagamentoComissao();
        console.log(row)
        pagamentoComissao.id = row.id;
        pagamentoComissao.contrato = {id: row.contrato_id, valor: row.valor};
        pagamentoComissao.dtPagamento = row.dt_pagamento.toISOString().slice(0,10);
        pagamentoComissao.percentagemPromotora = row.percentagem_promotora;
        pagamentoComissao.percentagemCorretor = row.percentagem_corretor;
        pagamentoComissao.valorPromotora = row.valor_promotora;
        pagamentoComissao.valorCorretor = row.valor_corretor;
        pagamentoComissao.efetivado = row.efetivado;
        pagamentoComissao.cadastradoPor = {id: row.cadastrado_por};
        pagamentoComissao.efetivadoPor = row.efetivado_por ? {id: row.efetivado_por} : null;
        pagamentoComissao.corretor = {id: row.corretor_id};
        return pagamentoComissao;



    }
}

module.exports = PsqlPagamentoComissaoDAO;