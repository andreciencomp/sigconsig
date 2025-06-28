const { pool } = require('../servicos/database_service');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PgUtil = require('./PgUtil');
const Cidade = require('../entidades/Cidade');
const Estado = require('../entidades/Estado');

class PsqlCidadeDao {
    constructor() {
        this.querySelect = 'select cidades.id, cidades.nome as cidade_nome,  estados.id as estado_id, estados.sigla, '
            + ' estados.nome as estado_nome from cidades left join estados on cidades.estado_id = estados.id  where ';
    }

    async obterPorId(id) {
        try {
            const strQuery = this.querySelect + "cidades.id=$1";
            const { rows } = await pool.query(strQuery, [id]);
            if (rows.length == 0) {
                throw new EntidadeNaoEncontradaException("Cidade inexistente.");
            }
            return this.criarObjetoCidade(rows[0]);

        } catch (e) {
            PgUtil.checkError(e);

        }
    }

    async existePorID(id) {
        try {
            const result = await pool.query("select id from cidades where id=$1", [id]);
            return result.rows.length > 0;

        } catch (e) {
            PgUtil.checkError(e);

        }
    }

    async existeNoEstadoPorNome(nome, estadoID) {
        try {
            const strQuery = "select * from cidades where nome=$1 and estado_id=$2";
            const result = await pool.query(strQuery, [nome, estadoID]);
            return (result.rows.length > 0);

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async salvar(cidade) {
        try {
            const strQuery = "insert into cidades(nome, estado_id) values ($1, $2) returning id ";
            const result = await pool.query(strQuery, [cidade.nome, cidade.estado.id]);
            return result.rows[0];

        } catch (e) {
            PgUtil.checkError(e);

        }
    }

    async atualizar(cidade) {
        try {
            const cidadeCadastrada = await this.obterPorId(cidade.id);
            const novoNome = typeof (cidade.nome) != 'undefined' ? cidade.nome : cidadeCadastrada.nome;
            const estadoID = typeof (cidade.estado) != 'undefined' ? cidade.estado.id : (cidadeCadastrada.estado ? cidadeCadastrada.estado.id : null);
            const result = await pool.query("update cidades set nome=$1, estado_id=$2 where id=$3 returning id ", [novoNome, estadoID, cidade.id]);
            return result.rows[0];

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async listarTodos() {
        try {
            const strQuery = this.querySelect + "true";
            const cidades = [];
            const { rows } = await pool.query(strQuery);
            for (let i = 0; i < rows.length; i++) {
                const cidade = this.criarObjetoCidade(rows[i]);
                cidades.push(cidade);
            }
            return cidades;

        } catch (e) {
            PgUtil.checkError(e);

        }
    }

    async listarPorEstado(estado_id) {
        try {
            const strQuery = this.querySelect + 'estado_id = $1';
            const cidades = []
            const { rows } = await pool.query(strQuery, [estado_id]);
            for (let i = 0; i < rows.length; i++) {
                const cidade = this.criarObjetoCidade(rows[i]);
                cidades.push(cidade);
            }
            return cidades;

        } catch (e) {
            PgUtil.checkError(e);

        }
    }

    async deletar(id) {
        try {
            const result = await pool.query("delete from cidades where id=$1 returning id ", [id]);
            if (result.rows.length === 0) {
                throw new EntidadeNaoEncontradaException("Cidade inexistente.");
            }
            return await result.rows[0];

        } catch (e) {
            PgUtil.checkError(e);

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