const UsuarioAdm = require('../entidades/UsuarioAdm');
const { pool } = require('../../../servicos/database_service');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const PgUtil = require('./PgUtil');

class PsqlUsuarioAdmDAO {

    static instancia = new PsqlUsuarioAdmDAO();

    async obter(id) {
        const client = await pool.connect();
        try {
            let tipo = UsuarioAdm.USUARIO_ADMIN;
            let strQuery = 'select * from usuarios where nome_usuario=$1 and tipo=$2';
            const { rows } = await client.query(strQuery, [id, tipo]);
            let data = await rows[0];
            if (data) {
                let usuario = new UsuarioAdm();
                usuario.id = await data.id;
                usuario.nomeUsuario = await data.nome_usuario;
                usuario.senha = await data.senha;
                return usuario;
            }
            throw new EntidadeNaoEncontradaException("Usuário Administrador não encontrado");
        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            client.release();
        }
    }

    async obterPorNome(nomeUsuario) {
        let tipo = UsuarioAdm.USUARIO_ADMIN;
        let strQuery = 'select * from usuarios where nome_usuario=$1 and tipo=$2';
        const { rows } = await pool.query(strQuery, [nomeUsuario, tipo]);
        let data = rows[0];
        if (data) {
            let usuario = new UsuarioAdm();
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
                [usuario.nomeUsuario, usuario.senha, UsuarioAdm.USUARIO_ADMIN]);
            return rows[0].id;

        } catch (e) {
            PgUtil.checkError(e);

        }
    }
}

module.exports = PsqlUsuarioAdmDAO;




