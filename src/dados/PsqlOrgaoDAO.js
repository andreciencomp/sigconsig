const PgUtil = require('./PgUtil');
const { pool } = require('../helpers/pg_helper');
const Orgao = require('../entidades/Orgao');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const Produto = require('../entidades/Produto');

class PsqlOrgaoDAO {

    async obterPorId(id) {
        try {
            const res = await pool.query("select * from orgaos where id=$1", [id]);
            if (res.rows.length === 0) {
                throw new EntidadeNaoEncontradaException("O orgão não existe.");
            }
            return this.criarObjetoOrgao(res.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async existePorID(id){
        try{
            const result = await pool.query('select id from orgaos where id=$1',[id]);
            return result.rows.length > 0;

        }catch(e){
            PgUtil.checkError(e);

        }
    }

    async existePorSigla(sigla) {
        try {
            const { rows } = await pool.query("select sigla from orgaos where sigla = $1", [sigla]);
            return rows.length > 0;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async existePorNome(nome) {
        try {
            const { rows } = await pool.query("select nome from orgaos where nome = $1", [nome]);
            return rows.length > 0;

        } catch (e) {
            PgUtil.checkError(e);

        }
    }

    async salvar(orgao) {
        try {
            let strQuery = "insert into orgaos (sigla, nome) values ($1, $2) returning id";
            const { rows } = await pool.query(strQuery, [orgao.sigla, orgao.nome]);
            return rows[0];

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async atualizar(orgao) {
        try {
            const orgaoCadastrado = await this.obterPorId(orgao.id);
            const novaSigla = typeof (orgao.sigla) != 'undefined' ? orgao.sigla : orgaoCadastrado.sigla;
            const novoNome = typeof (orgao.nome) != 'undefined' ? orgao.nome : orgaoCadastrado.nome;
            const result = await pool.query("update orgaos set sigla=$1, nome=$2 where id=$3 returning id", [novaSigla, novoNome, orgao.id]);
            return result.rows[0];

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async listar() {
        const orgaos = [];
        try {
            const { rows } = await pool.query('select * from orgaos');
            for (let i = 0; i < rows.length; i++) {
                const orgao = this.criarObjetoOrgao(rows[i]);
                orgaos.push(orgao);
            }
            return orgaos;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async deletar(id) {
        try {
            const result = await pool.query("delete from orgaos where id=$1 returning id ", [id]);
            if (result.rows.length === 0) {
                throw new EntidadeNaoEncontradaException("Orgão não encontrato.");
            }
            return this.criarObjetoOrgao(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    criarObjetoOrgao(row) {
        const orgao = new Orgao();
        orgao.id = row.id;
        orgao.sigla = row.sigla;
        orgao.nome = row.nome;
        return orgao;
    }
}

module.exports = PsqlOrgaoDAO;