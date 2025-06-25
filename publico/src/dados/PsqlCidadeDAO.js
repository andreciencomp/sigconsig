const { pool } = require('../../../servicos/database_service');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PgUtil = require('./PgUtil');
const Cidade = require('../entidades/Cidade');
const PsqlEstadoDAO = require('./PsqlEstadoDAO');
const Estado = require('../entidades/Estado');

class PsqlCidadeDao {
    constructor() {
        this.queryObter = 'select cidades.id, cidades.nome as cidade_nome,  estados.id as estado_id, estados.sigla, '
            + ' estados.nome as estado_nome from cidades left join estados on cidades.estado_id = estados.id  where ';
    }

    async obterPorId(id) {
        try {
            const strQuery = this.queryObter + "cidades.id=$1";
            const { rows } = await pool.query(strQuery, [id]);
            if (rows.length == 0) {
                throw new EntidadeNaoEncontradaException("Cidade não encontrada.");
            }
            return this.criarObjetoCidade(rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        }
    }

    async existePorID(id, dbClient = null) {
        const client = dbClient ? dbClient : await pool.connect();
        try {
            const result = await client.query("select id from cidades where id=$1", [id]);
            return result.rowCount > 0;

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!dbClient) {
                client.release();
            }
        }
    }

    async existeNoEstadoPorNome(nome, estadoID, pgClient = null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            let strQuery = "select * from cidades where nome=$1 and estado_id=$2";
            const result = await client.query(strQuery, [nome, estadoID]);
            return (result.rowCount > 0);

        } catch (e) {
            PgUtil.checkError(e);
        } finally {
            if (!pgClient) {
                client.release();
            }
        }
    }

    async salvar(cidade, pgClient = null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const strQuery = "insert into cidades(nome, estado_id) values ($1, $2) returning * ";
            const result = await client.query(strQuery, [cidade.nome, cidade.estado.id]);
            return await this.criarObjetoCidade(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!pgClient) {
                client.release();
            }
        }
    }

    async atualizar(cidade, dbClient = null) {
        const client = dbClient ? dbClient : await pool.connect();
        try {
            const cidadeCadastrada = await this.obterPorId(cidade.id, client);
            const novoNome = typeof (cidade.id) != 'undefined' ? cidade.nome : cidadeCadastrada.nome;
            const estadoID = typeof (cidade.estado) != 'undefined' ? cidade.estado.id : (cidadeCadastrada.estado ? cidadeCadastrada.estado.id : null);
            const result = await client.query("update cidades set nome=$1, estado_id=$2 where id=$3 returning * ", [novoNome, estadoID, cidade.id]);
            return this.criarObjetoCidade(result.rows[0]);

        } catch (e) {

        } finally {
            if (!dbClient) {
                client.release();
            }
        }
    }

    async listarTodos(dbClient = null) {
        const client = dbClient ? dbClient : await pool.connect();
        try {
            const strQuery =  'select * from cidades';
            let cidades = [];
            const { rows } = await client.query(strQuery);
            for (var i = 0; i < rows.length; i++) {
                const cidade = this.criarObjetoCidade(rows[i]);
                cidades.push(cidade);
            }
            return cidades;

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!dbClient) {
                client.release();
            }
        }
    }

    async listarPorEstado(estado_id, dbClient = null) {
        const client = dbClient ? dbClient : await pool.connect();
        try {
            const strQuery = 'select * from cidades where estado_id = $1';
            let cidades = []
            const { rows } = await client.query(strQuery, [estado_id]);
            for (let i = 0; i < rows.length; i++) {
                const cidade = await this.criarObjetoCidade(rows[i]);
                cidades.push(cidade);
            }
            return cidades;

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
            const result = await client.query("delete from cidades where id=$1 returning * ", [id]);
            if (result.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("Cidade inexistente.");
            }
            return await this.criarObjetoCidade(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!pgClient) {
                client.release();
            }
        }
    }

    criarObjetoCidade(row) {
        const cidade = new Cidade();
        cidade.id = row.id;
        cidade.nome = row.cidade_nome;
        const estado = new Estado();
        estado.id = row.estado_id;
        estado.sigla = row.sigla;
        estado.nome = row.estado_nome;
        cidade.estado = estado;
        return cidade;
    }
}

module.exports = PsqlCidadeDao;