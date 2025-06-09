const { pool } = require('../../../servicos/database_service');
const Banco = require('../entidades/Banco');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PgUtil = require('./PgUtil');

class PsqlBancoDAO {
    static instancia = new PsqlBancoDAO();

    async obterPorId(id) {
        try {
            const query = "select * from bancos where id=$1";
            const res = await pool.query(query, [id]);
            if (res.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("O banco não existe.");
            }
            let banco = new Banco();
            banco.id = res.rows[0].id;
            banco.codigo = res.rows[0].codigo;
            banco.nome = res.rows[0].nome;
            return banco;
        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async obterPorCodigo(codigo) {
        try {
            const result = await pool.query('select * from bancos where codigo = $1', [codigo]);
            if (result.rowCount == 0) {
                throw new EntidadeNaoEncontradaException("Banco inexistente.");
            }
            let data = await result.rows[0];
            let banco = new Banco();
            banco.id = data.id;
            banco.codigo = data.codigo;
            banco.nome = data.nome;
            return banco;

        } catch (e) {
            PgUtil.checkError(e);

        }
    }

    async salvar(banco) {

        let strQuery = "insert into bancos(codigo,nome) values ($1, $2) returning id";
        try {
            const { rows } = await pool.query(strQuery, [banco.codigo, banco.nome]);
            return rows[0];

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async listar() {

        let strQuery = "select * from bancos";
        try {
            const { rows } = await pool.query(strQuery);
            let lista = [];
            for (var i = 0; i < (await rows.length); i++) {
                let banco = new Banco();
                banco.id = await rows[i].id;
                banco.codigo = await rows[i].codigo;
                banco.nome = await rows[i].nome;
                lista.push(banco);
            }
            return lista
        } catch (e) {
            console.log(e);
            throw 'BD_EXCEPTION';
        }
    }

    async deletar(id) {
        try {
            const result = await pool.query("delete from bancos where id=$1 returning id", [id]);
            if (result.rows[0]) {
                return id;
            }
            else {
                throw new EntidadeNaoEncontradaException("Este banco não existe.");
            }
        } catch (e) {
            PgUtil.checkError(e);
        }
    }
}

module.exports = PsqlBancoDAO;