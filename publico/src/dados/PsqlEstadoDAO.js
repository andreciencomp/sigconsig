const { pool } = require('../../../servicos/database_service')
const Estado = require('../entidades/Estado');
const PgUtil = require('../dados/PgUtil');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');

class PsqlEstadoDAO {

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

    async atualizar(estado, pgClient=null){
        const client = pgClient ? pgClient : await pool.connect();
        try{
            const estadoSalvo = await this.obter(estado.id);
            const sigla = typeof(estado.sigla) != 'undefined' ? estado.sigla : estadoSalvo.sigla;
            const nome = typeof(estado.nome) != 'undefined' ? estado.nome : estadoSalvo.nome;
            const result = await client.query("update estados set sigla=$1, nome=$2 where id=$3 returning * ",[sigla, nome, estado.id]);
            return this.criarObjetoEstado(result.rows[0]);

        }catch(e){
            PgUtil.checkError(e);

        }finally{
            if(!pgClient){
                client.release();
            }
        }
    }

    async listar(pgClient=null) {
        const client = pgClient ? pgClient : await pool.connect();
        try {
            const strQuery = 'select * from estados';
            const { rows } = await client.query(strQuery);
            let lista = [];
            for (let i = 0; i < rows.length; i++) {
                const estado = this.criarObjetoEstado(rows[i]);
                lista.push(estado);
            }
            return lista;

        } catch (e) {
            PgUtil.checkError(e);
        } finally{
            if(!pgClient){
                client.release();
            }
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