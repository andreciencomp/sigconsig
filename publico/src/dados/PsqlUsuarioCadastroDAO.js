const UsuarioCadastro = require('../entidades/UsuarioCadastro');
const { pool } = require('../../../servicos/database_service');
const PgUtil = require('./PgUtil');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');


class PsqlUsuarioCadastroDAO {

    async obter(id) {
        const client = await pool.connect();
        try {
            let tipo = UsuarioCadastro.USUARIO_CADASTRO;
            let strQuery = 'select * from usuarios where nome_usuario=$1 and tipo=$2';
            const { rows } = await client.query(strQuery, [id, tipo]);
            let data = await rows[0];
            if (data) {
                let usuario = new UsuarioCadastro();
                usuario.id = await data.id;
                usuario.nomeUsuario = await data.nome_usuario;
                usuario.senha = await data.senha;
                return usuario;
            }
            throw new EntidadeNaoEncontradaException("Usuário Cadastro inexistente.");
        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            client.release();
        }
    }

    async obterPorNome(nomeUsuario) {
        let tipo = UsuarioCadastro.USUARIO_CADASTRO;
        const strQuery = 'select * from usuarios where nome_usuario=$1 and tipo=$2';
        try {
            const { rows } = await pool.query(strQuery, [nomeUsuario, tipo]);
            let data = await rows[0];
            if (data) {
                let usuario = new UsuarioSuper();
                usuario.id = data.id;
                usuario.nomeUsuario = data.nome_usuario;
                usuario.senha = data.senha;
                return usuario;
            }
            return null;
        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async salvar(usuario) {
        let strQuery = "insert into usuarios (nome_usuario, senha, tipo) values ($1, $2, $3) returning id";
        try {
            const { rows } = await pool.query(strQuery,
                [usuario.nomeUsuario, usuario.senha, UsuarioCadastro.USUARIO_CADASTRO]);
            return rows[0].id;

        } catch (e) {
            throw PgUtil.checkError(e);

        }

    }
}

module.exports = PsqlUsuarioCadastroDAO;




