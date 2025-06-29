const { pool } = require('../helpers/pg_helper');
const Banco = require('../entidades/Banco');
const ComissionamentoPromotora = require('../entidades/ComissionamentoPromotora');
const Orgao = require('../entidades/Orgao');
const Produto = require('../entidades/Produto');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PgUtil = require('../utils/PgUtil');

class PsqlComissionamentoPromotoraDAO {
    constructor(){
        this.strObterQuery = "select comissionamentos_promotora.id, comissionamentos_promotora.percentagem, " +
                "bancos.id as banco_id, bancos.codigo, bancos.nome as banco_nome, " +
                "produtos.id as produto_id, produtos.qtd_parcelas, produtos.carencia, " +
                "orgaos.id as orgao_id, orgaos.sigla as orgao_sigla, orgaos.nome as orgao_nome " +
                "from comissionamentos_promotora left join bancos on comissionamentos_promotora.banco_id = bancos.id " +
                "left join produtos on comissionamentos_promotora.produto_id = produtos.id " +
                "left join orgaos on produtos.orgao_id=orgaos.id " +
                "where "; 
    }
    async obterPorId(id) {
        try {
            const strQuery = this.strObterQuery + " comissionamentos_promotora.id=$1";
            const result = await pool.query(strQuery, [id]);
            if (result.rows.length === 0) {
                throw new EntidadeNaoEncontradaException("Comissionamento da promotora não encontrado.");
            }
            return this.criarObjeto(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async obterPorBancoIdEProdutoId(bancoId, produtoId) {
        try {
            const strQuery =  this.strObterQuery + "comissionamentos_promotora.banco_id=$1 and comissionamentos_promotora.produto_id=$2";
            const result = await pool.query(strQuery, [bancoId, produtoId]);
            if (result.rows.length == 0) {
                throw new EntidadeNaoEncontradaException("Comissionamento da promotora não encontrato");
            }
            return this.criarObjeto(result.rows[0]);
        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async salvar(comissionamento) {
        try {
            const query = "insert into comissionamentos_promotora( produto_id, percentagem, banco_id) values($1, $2, $3) returning id";
            let { rows } = await pool.query(query, [comissionamento.produto.id, comissionamento.percentagem, comissionamento.banco.id]);
            return rows[0];

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async existe(produtoId, bancoId) {
        try {
            const query = "select id from comissionamentos_promotora where produto_id=$1 and banco_id=$2";
            const res = await pool.query(query, [produtoId, bancoId]);
            return res.rows.length > 0;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    criarObjeto(row) {
        const comissionamento = new ComissionamentoPromotora();
        comissionamento.id = row.id;
        comissionamento.percentagem = row.percentagem;
        let banco = new Banco();
        banco.id = row.banco_id;
        banco.codigo = row.codigo;
        banco.nome = row.banco_nome;
        comissionamento.banco = banco;
        let produto = new Produto();
        produto.id = row.produto_id;
        produto.qtdParcelas = row.qtd_parcelas;
        produto.carencia = row.carencia;
        produto.orgao = new Orgao();
        produto.orgao.id = row.orgao_id;
        produto.orgao.sigla = row.orgao_sigla;
        produto.orgao.nome = row.orgao_nome;
        comissionamento.produto = produto;
        return comissionamento;
    }
}

module.exports = PsqlComissionamentoPromotoraDAO;