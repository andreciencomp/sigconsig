const { pool } = require('../../../servicos/database_service');
const Banco = require('../entidades/Banco');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PgUtil = require('./PgUtil');

class PsqlBancoDAO {
    static instancia = new PsqlBancoDAO();

    async obterPorId(id, pgClient = null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const query = "select * from bancos where id=$1";
            const res = await client.query(query, [id]);
            if (res.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("Banco inexistente.");
            }
            return this.criarObjetoBanco(res.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!pgClient) {
                client.release();
            }
        }
    }

    async existeCodigo(codigo, dbClient = null) {
        const client = dbClient ? dbClient : await pool.connect();
        try {
            const result = await client.query("select id from bancos where codigo=$1", [codigo]);
            return result.rowCount > 0;

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!dbClient) {
                client.release();
            }
        }
    }

    async existeNome(nome, dbClient = null) {
        const client = dbClient ? dbClient : await pool.connect();
        try {
            const result = await client.query("select id from bancos where nome=$1", [nome]);
            return result.rowCount > 0;

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!dbClient) {
                client.release();
            }
        }
    }



    async obterPorCodigo(codigo, pgClient = null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const result = await client.query('select * from bancos where codigo = $1', [codigo]);
            if (result.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("Banco inexistente.");
            }
            return this.criarObjetoBanco(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!pgClient) {
                client.release();
            }
        }
    }

    async salvar(banco, pgClient = null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const strQuery = "insert into bancos(codigo,nome) values ($1, $2) returning * ";
            const { rows } = await client.query(strQuery, [banco.codigo, banco.nome]);
            return this.criarObjetoBanco(rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!pgClient) {
                client.release();
            }
        }
    }

    async listar(dbClient = null) {
        const client = dbClient ? dbClient : await pool.connect();
        try {
            const strQuery = "select * from bancos";
            const { rows } = await client.query(strQuery);
            const lista = [];
            for (var i = 0; i < rows.length; i++) {
                const banco = this.criarObjetoBanco(rows[i]);
                lista.push(banco);
            }
            return lista
        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!dbClient) {
                client.release();
            }
        }
    }

    async atualizar(campos, dbClient = null) {
        const client = dbClient ? dbClient : await pool.connect();
        try {
            let banco = await this.obterPorId(campos.id);
            if (typeof (campos.codigo) != 'undefined') {
                banco.codigo = campos.codigo;
            }
            if (typeof (campos.nome) != 'undefined') {
                banco.nome = campos.nome
            }
            const result = await client
                .query('update bancos set codigo=$1, nome=$2 where id=$3 returning *', [banco.codigo, banco.nome, banco.id]);
            return result.rows[0];

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!dbClient) {
                client.release();
            }

        }
    }

    async deletar(id, pgClient = null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const result = await client.query("delete from bancos where id=$1 returning * ", [id]);
            if (result.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("Banco inexistente.");
            }
            return this.criarObjetoBanco(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!pgClient) {
                client.release();
            }
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