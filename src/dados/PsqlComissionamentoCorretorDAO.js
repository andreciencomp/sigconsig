const { pool } = require('../servicos/database_service');
const Banco = require('../entidades/Banco');
const ComissionamentoCorretor = require('../entidades/ComissionamentoCorretor');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PgUtil = require('./PgUtil');
const PsqlBancoDAO = require('./PsqlBancoDAO');
const PsqlCorretorDAO = require('./PsqlCorretorDAO');
const PsqlProdutoDAO = require('./PsqlProdutoDAO');

class PsqlComissionamentoCorretorDAO{

    async obter(corretorId, bancoId, produtoId){
        try{
            const query = "select * from comissionamentos_corretor where corretor_id=$1 and banco_id=$2 and produto_id=$3";
            const resComissionamento = await pool.query(query, [corretorId, bancoId, produtoId]);
            if(resComissionamento.rows.length === 0){
                throw new EntidadeNaoEncontradaException("Comissionamento do corretor não encontrado.");
            }
            const rowComissionamento = resComissionamento.rows[0];
            const comissionamento = new ComissionamentoCorretor();
            comissionamento.id = rowComissionamento.id;
            comissionamento.percentagem = rowComissionamento.percentagem;

            const corretorDAO = new PsqlCorretorDAO();
            const corretor = await corretorDAO.obterPorId(corretorId);
            comissionamento.corretor = corretor;

            const produtoDAO = new PsqlProdutoDAO();
            const produto = await produtoDAO.obterPorId(produtoId);
            comissionamento.produto = produto;

            const bancoDAO = new PsqlBancoDAO();
            const banco = await bancoDAO.obterPorId(bancoId);
            comissionamento.banco = banco;
            return comissionamento;

        }catch(e){
            PgUtil.checkError(e);
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
            const result = await pool.query(query,[comissionamento.produto.id, comissionamento.banco.id, comissionamento.corretor.id]);
            return result.rows.length > 0;
            
        }catch(e){
            PgUtil.checkError(e);
        }
    }
}

module.exports = PsqlComissionamentoCorretorDAO;