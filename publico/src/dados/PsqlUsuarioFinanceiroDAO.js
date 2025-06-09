const UsuarioFinanceiro = require('../entidades/UsuarioFinanceiro');
const { pool } = require('../../../servicos/database_service');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PgUtil = require('./PgUtil');

class PsqlUsuarioFinanceiroDAO {

    static instancia = new PsqlUsuarioFinanceiroDAO();

    async obter(id) {
        const client = await pool.connect();
        try {
            let tipo = UsuarioFinanceiro.USUARIO_FINANCEIRO;
            let strQuery = 'select * from usuarios where nome_usuario=$1 and tipo=$2';
            const { rows } = await client.query(strQuery, [id, tipo]);
            let data = await rows[0];
            if (data) {
                let usuario = new UsuarioFinanceiro();
                usuario.id = await data.id;
                usuario.nomeUsuario = await data.nome_usuario;
                usuario.senha = await data.senha;
                return usuario;
            }
            throw new EntidadeNaoEncontradaException("Usuário Financeiro inexistente.");
        } catch (e) {
            PgUtil.checkError(e);
        } finally {
            client.release();
        }
    }

    async obterPorNome(nomeUsuario) {
        let tipo = UsuarioFinanceiro.USUARIO_FINANCEIRO;
        let strQuery = 'select * from usuarios where nome_usuario=$1 and tipo=$2';
        const { rows } = await pool.query(strQuery, [nomeUsuario, tipo]);
        let data = rows[0];
        if (data) {
            let usuario = new UsuarioFinanceiro();
            usuario.id = data.id;
            usuario.nomeUsuario = data.nome_usuario;
            usuario.senha = data.senha;
            return usuario;
        }
        return null;
    }

    async salvar(usuario) {
        let strQuery = "insert into usuarios (nome_usuario, senha, tipo) values ($1, $2, $3) returning id";
        try {
            const { rows } = await pool.query(strQuery,
                [usuario.nomeUsuario, usuario.senha, UsuarioFinanceiro.USUARIO_FINANCEIRO]);
            return rows[0].id;

        } catch (e) {
            throw PgUtil.checkError(e);
        }
    }
}

module.exports = PsqlUsuarioFinanceiroDAO;




