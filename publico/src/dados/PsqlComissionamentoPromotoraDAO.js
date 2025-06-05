const { pool } = require('../../../servicos/database_service');
const Banco = require('../entidades/Banco');
const ComissionamentoPromotora = require('../entidades/ComissionamentoPromotora');
const Orgao = require('../entidades/Orgao');
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

    async obter(bancoId, produtoId){
        try{
            const query = "select comissionamentos_promotora.id, comissionamentos_promotora.percentagem, " +
                            "bancos.id as banco_id, bancos.codigo, bancos.nome as banco_nome, "+
                            "produtos.id as produto_id, produtos.qtd_parcelas, produtos.carencia, " + 
                            "orgaos.id as orgao_id, orgaos.sigla as orgao_sigla, orgaos.nome as orgao_nome " +
                            "from comissionamentos_promotora left join bancos on comissionamentos_promotora.banco_id = bancos.id "+
                            "left join produtos on comissionamentos_promotora.produto_id = produtos.id " +
                            "left join orgaos on produtos.orgao_id=orgaos.id "+
                            "where comissionamentos_promotora.banco_id=$1 and comissionamentos_promotora.produto_id=$2";
            const res = await pool.query(query, [bancoId, produtoId]);
            if(res.rowCount == 0){
                throw new EntidadeNaoEncontradaException("Comissionamento da promotora não encontrato");
            }
            let row = res.rows[0];
            let comissionamento = new ComissionamentoPromotora();
            comissionamento.id = row.id;
            comissionamento.percentagem = row.percentagem;
            let orgao = new Orgao();
            orgao.id = row.orgao_id;
            orgao.sigla = row.orgao_sigla;
            orgao.nome = row.orgao_nome;
            let produto = new Produto();
            produto.id = row.produto_id;
            produto.qtdParcelas = row.qtd_parcelas;
            produto.carencia = row.carencia;
            produto.orgao = orgao;
            comissionamento.produto = produto;
            const banco = new Banco();
            banco.id = row.banco_id;
            banco.codigo = row.codigo;
            banco.nome = row.banco_nome;
            comissionamento.banco = banco;
            
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

    async existe(produtoId, bancoId){
        const client = await pool.connect();
        try{
            const query = "select id from comissionamentos_promotora where produto_id=$1 and banco_id=$2";
            const res = await client.query(query,[produtoId, bancoId]);
            return res.rowCount > 0;

        }catch(e){
            console.log(e);
            PgUtil.checkError(e);
        }finally{
            client.release();
        }
    }
}

module.exports = PsqlComissionamentoPromotoraDAO;