const PgUtil = require('./PgUtil');
const { pool } = require('../../../servicos/database_service');

class PsqlProdutoDAO{
    static instancia = new PsqlProdutoDAO;

    async salvar(produto){
        try{
            const query = "insert into produtos(orgao_id, carencia, qtd_parcelas) values ($1, $2, $3) returning id";
            const {rows} = await pool.query(query,[produto.orgao.id, produto.carencia, produto.qtdParcelas]); 
            return rows[0];
        }catch(e){
            PgUtil.checkError(e);
        }
    }

    async existe(produto){
        try{
            const query = "select id from produtos where orgao_id=$1 and carencia=$2 and qtd_parcelas=$3";
            const resultado = await pool.query(query,[produto.orgao.id, produto.carencia, produto.qtdParcelas]);
            return resultado.rowCount > 0;
        }catch(e){
            PgUtil.checkError(e);
        }
    }
}

module.exports = PsqlProdutoDAO;