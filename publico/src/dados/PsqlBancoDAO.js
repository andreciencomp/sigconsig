const { pool } = require('../../../servicos/database_service');
const Banco = require('../entidades/Banco');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PgUtil = require('./PgUtil');

class PsqlBancoDAO {

    async obterPorId(id) {
        try {
            const result = await pool.query("select * from bancos where id=$1", [id]);
            if (result.rows.length == 0) {
                throw new EntidadeNaoEncontradaException("Banco inexistente.");
            }
            return this.criarObjetoBanco(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        }
    }

    async existeCodigo(codigo) {
        try {
            const result = await pool.query("select id from bancos where codigo=$1", [codigo]);
            return result.rows.length > 0;

        } catch (e) {
            PgUtil.checkError(e);

        }
    }

    async existeNome(nome) {
        try {
            const result = await pool.query("select id from bancos where nome=$1", [nome]);
            return result.rows.length > 0;

        } catch (e) {
            PgUtil.checkError(e);

        }
    }

    async obterPorCodigo(codigo) {
        try {
            const result = await pool.query('select * from bancos where codigo = $1', [codigo]);
            if (result.rows.length === 0) {
                throw new EntidadeNaoEncontradaException("Banco inexistente.");
            }
            return this.criarObjetoBanco(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        }
    }

    async salvar(banco) {
        try {
            const strQuery = "insert into bancos(codigo,nome) values ($1, $2) returning * ";
            const { rows } = await pool.query(strQuery, [banco.codigo, banco.nome]);
            return this.criarObjetoBanco(rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        }
    }

    async listar() {
        try {
            const { rows } = await pool.query("select * from bancos");
            const bancos = [];
            for (let i = 0; i < rows.length; i++) {
                const banco = this.criarObjetoBanco(rows[i]);
                bancos.push(banco);
            }
            return bancos;

        } catch (e) {
            PgUtil.checkError(e);

        }
    }

    async atualizar(atributos) {
        try {
            let banco = await this.obterPorId(atributos.id);
            if (typeof (atributos.codigo) != 'undefined') {
                banco.codigo = atributos.codigo;
            }
            if (typeof (atributos.nome) != 'undefined') {
                banco.nome = atributos.nome
            }
            const result = await pool
                .query('update bancos set codigo=$1, nome=$2 where id=$3 returning *', [banco.codigo, banco.nome, banco.id]);
            return result.rows[0];

        } catch (e) {
            PgUtil.checkError(e);

        }
    }

    async deletar(id) {
        try {
            const result = await pool.query("delete from bancos where id=$1 returning * ", [id]);
            if (result.rows.length === 0) {
                throw new EntidadeNaoEncontradaException("Banco inexistente.");
            }
            return this.criarObjetoBanco(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        }
    }

    criarObjetoBanco(row) {
        const banco = new Banco();
        banco.id = row.id;
        banco.codigo = row.codigo;
        banco.nome = row.nome;
        return banco;
    }
}

module.exports = PsqlBancoDAO;