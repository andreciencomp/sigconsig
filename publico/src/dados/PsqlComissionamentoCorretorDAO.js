const { pool } = require('../../../servicos/database_service');
const PgUtil = require('./PgUtil');

class PsqlComissionamentoCorretorDAO{

    #construtor(){
        this.instancia = new PsqlComissionamentoCorretorDAO();
    }

    static getInstancia(){
        if(!this.instancia){
            this.instancia = new PsqlComissionamentoCorretorDAO();
            return this.instancia;
        }
        else{
            return this.instancia;
        }
    }

    async salvar(comissionamento){
        try{
            const query = "insert into comissionamentos_corretor(produto_id, percentagem, banco_id, corretor_id) values($1, $2, $3, $4) returning id";
            const{rows} = await pool.query(query, [comissionamento.produto.id,
                 comissionamento.percentagem, comissionamento.banco.id, comissionamento.corretor.id]);
            return rows[0];
            
        }catch(e){
            PgUtil.checkError(e);
        }
    }

    async existe(comissionamento){
        try{
            const query = "select id from comissionamentos_corretor where produto_id=$1 and banco_id=$2 and corretor_id=$3";
            const res = await pool.query(query,[comissionamento.produto.id, comissionamento.banco.id, comissionamento.corretor.id]);
            return res.rowCount > 0;
            
        }catch(e){
            PgUtil.checkError(e);
        }
    }
}

module.exports = PsqlComissionamentoCorretorDAO;