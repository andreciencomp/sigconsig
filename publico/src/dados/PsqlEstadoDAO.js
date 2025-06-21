const { pool } = require('../../../servicos/database_service')
const Estado = require('../entidades/Estado');
const PgUtil = require('../dados/PgUtil');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');

class PsqlEstadoDAO {

    static instancia = new PsqlEstadoDAO();

    async obter(id, pgClient = null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const strQuery = "select * from estados where id=$1";
            const result = await client.query(strQuery, [id]);
            if (result.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("Estado inexistente.");
            }
            return this.criarObjetoEstado(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!pgClient) {
                client.release();
            }
        }
    }

    async obterPorSigla(sigla, pgClient=null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const strQuery = "select * from estados where sigla = $1";
            const result = await client.query(strQuery, [sigla]);
            if(result.rowCount == 0){
                throw new EntidadeNaoEncontradaException("Estado inexistente.");
            }
            return this.criarObjetoEstado(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        } finally{
            if(!pgClient){
                client.release();
            }
        }
    }

    async existePorSigla(sigla, dbClient = null) {
        const client = dbClient ? dbClient : await pool.connect();
        try {
            const result = await client.query("select sigla from estados where exists( select sigla from estados where sigla=$1)", [sigla]);
            return result.rowCount > 0;

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            if (!dbClient) {
                client.release();
            }
        }
    }

    async salvar(estado, pgClient=null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const query = "insert into estados(sigla, nome) values($1, $2) returning * ";
            const result = await client.query(query, [estado.sigla, estado.nome]);
            return  this.criarObjetoEstado(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        } finally{
            if(!pgClient){
                client.release();
            }
            
        }
    }

    async listar() {
        const strQuery = 'select * from estados';
        try {
            const { rows } = await pool.query(strQuery);
            let lista = [];
            for (var i = 0; i < rows.length; i++) {
                let estado = new Estado();
                estado.id = rows[i].id;
                estado.sigla = rows[i].sigla;
                estado.nome = rows[i].nome;
                lista.push(estado);
            }
            return lista;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async deletar(id, pgClient=null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const strQuery = "delete from estados where id=$1 returning * ";
            const result = await client.query(strQuery, [id]);
            return this.criarObjetoEstado(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);
            
        } finally{
            if(!pgClient){
                client.release();
            }
        }
    }

    criarObjetoEstado(row) {
        const estado = new Estado();
        estado.id = row.id;
        estado.sigla = row.sigla;
        estado.nome = row.nome;
        return estado;
    }
}

module.exports = PsqlEstadoDAO;