const { pool } = require('../../../servicos/database_service');
const Banco = require('../entidades/Banco');
const ComissionamentoPromotora = require('../entidades/ComissionamentoPromotora');
const Produto = require('../entidades/Produto');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PgUtil = require('./PgUtil');

class PsqlComissionamentoPromotoraDAO{

    static instancia = new PsqlComissionamentoPromotoraDAO();

    async obterPorId(id){
        try{
            const queryComissionamento = "select * from comissionamentos_promotora where id=$1";
            const resComissionamento = await pool.query(queryComissionamento,[id]);
            if(resComissionamento.rowCount == 0){
                throw new EntidadeNaoEncontradaException("Comissionamento da promotora não encontrado.");
            }
            let comissionamento = new ComissionamentoPromotora();
            comissionamento.id = resComissionamento.rows[0].id;
            comissionamento.percentagem = resComissionamento.rows[0].percentagem;

            const queryBanco = "select * from bancos where id=$1";
            const resBanco = await pool.query(queryBanco,[resComissionamento.rows[0].banco_id]);
            let banco = new Banco();
            banco.id = resBanco.rows[0].id,
            banco.codigo = resBanco.rows[0].codigo;
            banco.nome = resBanco.rows[0].nome;

            const queryProduto = "select * from produtos where id=$1";
            const resProduto = await pool.query(queryProduto,[resComissionamento.rows[0].produto_id]);
            let produto = new Produto();
            produto.id = resProduto.rows[0].id;
            produto.qtdParcelas = resProduto.rows[0].qtd_parcelas;
            produto.carencia = resProduto.rows[0].carencia;
            produto.orgao = resProduto.rows[0].orgao_id;
            
            comissionamento.banco = banco;
            comissionamento.produto = produto;
            return comissionamento;

        }catch(e){
            PgUtil.checkError(e);
        }
    }

    async obterPorProdutoEBanco(produtoId, bancoId){
        try{
            const queryComissionamento = "select * from comissionamentos_promotora where produto_id=$1 and banco_id=$2";
            const resComissionamento = await pool.query(queryComissionamento,[produtoId, bancoId]);
            if(resComissionamento.rowCount == 0){
                throw new EntidadeNaoEncontradaException("Comissionamento da promotora não encontrado.");
            }
            let comissionamento = new ComissionamentoPromotora();
            comissionamento.id = resComissionamento.rows[0].id;
            comissionamento.percentagem = resComissionamento.rows[0].percentagem;

            const queryBanco = "select * from bancos where id=$1";
            const resBanco = await pool.query(queryBanco,[bancoId]);
            let banco = new Banco();
            banco.id = resBanco.rows[0].id,
            banco.codigo = resBanco.rows[0].codigo;
            banco.nome = resBanco.rows[0].nome;

            const queryProduto = "select * from produtos where id=$1";
            const resProduto = await pool.query(queryProduto,[produtoId]);
            let produto = new Produto();
            produto.id = resProduto.rows[0].id;
            produto.qtdParcelas = resProduto.rows[0].qtd_parcelas;
            produto.carencia = resProduto.rows[0].carencia;
            produto.orgao = resProduto.rows[0].orgao_id;
            
            comissionamento.banco = banco;
            comissionamento.produto = produto;
            return comissionamento;

        }catch(e){
            PgUtil.checkError(e);
        }
    }

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
            const query = "select id from comissionamentos_promotora where produto_id=$1 and banco_id=$2";
            const res = await pool.query(query,[comissionamento.produto.id, comissionamento.banco.id]);
            return res.rowCount > 0;

        }catch(e){
            console.log(e);
            PgUtil.checkError(e);
        }
    }
}

module.exports = PsqlComissionamentoPromotoraDAO;