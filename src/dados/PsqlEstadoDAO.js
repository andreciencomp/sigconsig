const { pool } = require('../helpers/pg_helper')
const Estado = require('../entidades/Estado');
const PgUtil = require('../utils/PgUtil');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');

class PsqlEstadoDAO {

    async obter(id) {
        try {
            const strQuery = "select * from estados where id=$1";
            const result = await pool.query(strQuery, [id]);
            if (result.rows.length === 0) {
                throw new EntidadeNaoEncontradaException("Estado inexistente.");
            }
            return this.criarObjetoEstado(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async obterPorSigla(sigla) {
        try {
            const strQuery = "select * from estados where sigla = $1";
            const result = await pool.query(strQuery, [sigla]);
            if(result.rows.length === 0){
                throw new EntidadeNaoEncontradaException("Estado inexistente.");
            }
            return this.criarObjetoEstado(result.rows[0]);

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async existePorSigla(sigla) {
        try {
            const result = await pool.query("select sigla from estados where exists( select sigla from estados where sigla=$1)", [sigla]);
            return result.rows.length > 0;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async salvar(estado) {
        try {
            const query = "insert into estados(sigla, nome) values($1, $2) returning id ";
            const result = await pool.query(query, [estado.sigla, estado.nome]);
            return  result.rows[0];

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async atualizar(estado){
        try{
            const estadoSalvo = await this.obter(estado.id);
            const sigla = typeof(estado.sigla) != 'undefined' ? estado.sigla : estadoSalvo.sigla;
            const nome = typeof(estado.nome) != 'undefined' ? estado.nome : estadoSalvo.nome;
            const result = await pool.query("update estados set sigla=$1, nome=$2 where id=$3 returning id ",[sigla, nome, estado.id]);
            return result.rows[0];

        }catch(e){
            PgUtil.checkError(e);
        }
    }

    async listar() {
        try {
            const strQuery = 'select * from estados';
            const { rows } = await pool.query(strQuery);
            const lista = [];
            for (let i = 0; i < rows.length; i++) {
                const estado = this.criarObjetoEstado(rows[i]);
                lista.push(estado);
            }
            return lista;

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async deletar(id) {
        try {
            const strQuery = "delete from estados where id=$1 returning id ";
            const result = await pool.query(strQuery, [id]);
            if(result.rows.length == 0){
                throw new EntidadeNaoEncontradaException("Estado inexistente.");
            }
            return result.rows[0];

        } catch (e) {
            PgUtil.checkError(e);
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