const { pool } = require('../../../servicos/database_service');
const PgUtil = require('./PgUtil');

class PsqlComissionamentoPromotoraDAO{

    static instancia = new PsqlComissionamentoPromotoraDAO();

    async salvar(comissionamento){
        try{
            const query = "insert into comissionamentos_promotora( produto_id, percentagem, banco_id) values($1, $2, $3) returning id";
            let {rows} = await pool.query(query, [comissionamento.produto.id, comissionamento.percentagem, comissionamento.banco.id]);
            return rows[0];

        }catch(e){
            PgUtil.checkError(e);
        }
    }

    async existe(comissionamento){
        try{
            const query = "select id from comissionamentos_promotora where produto_id=$1 and percentagem=$2 and banco_id=$3";
            const res = await pool.query(query,[comissionamento.produto.id, comissionamento.percentagem,comissionamento.banco.id]);
            return res.rowCount > 0;

        }catch(e){
            console.log(e);
            PgUtil.checkError(e);
        }
    }
}

module.exports = PsqlComissionamentoPromotoraDAO;