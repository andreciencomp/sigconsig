const { pool } = require("../../../servicos/database_service");
const UsuarioAdm = require("../entidades/UsuarioAdm");
const UsuarioCadastro = require("../entidades/UsuarioCadastro");
const UsuarioFinanceiro = require("../entidades/UsuarioFinanceiro");
const UsuarioSuper = require("../entidades/UsuarioSuper");
const EntidadeNaoEncontradaException = require("../excessoes/EntidadeNaoEncontrada");
const PgUtil = require("./PgUtil");

class PsqlUsuarioDAO {

    async obter(id) {
        const client = await pool.connect();
        try {
            let strQuery = 'select * from usuarios where id=$1';
            const { rows } = await client.query(strQuery, [id]);
            let data = await rows[0];
            if (data) {
                let usuario = null;
                switch (data.tipo) {
                    case "USUARIO_SUPER":
                        usuario = new UsuarioSuper();
                        break;
                    case "USUARIO_ADMIN":
                        usuario = new UsuarioAdm();
                        break;
                    case "USUARIO_FINANCEIRO":
                        usuario = new UsuarioFinanceiro();
                        break;
                    default:
                        usuario = new UsuarioCadastro();
                }
                usuario.id = await data.id;
                usuario.nomeUsuario = await data.nome_usuario;
                usuario.senha = await data.senha;
                return usuario;
            }
            throw new EntidadeNaoEncontradaException("Super usuário inexistente.");
        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            client.release();
        }
    }

    async obterPorNome(nomeUsuario) {
        const client = await pool.connect();
        try {
            const strQuery = 'select * from usuarios where nome_usuario=$1';
            const { rows } = await client.query(strQuery, [nomeUsuario]);
            let data = await rows[0];
            if (data) {
                let usuario = null;
                switch (data.tipo) {
                    case "USUARIO_SUPER":
                        usuario = new UsuarioSuper();
                        break;
                    case "USUARIO_ADMIN":
                        usuario = new UsuarioAdm();
                        break;
                    case "USUARIO_FINANCEIRO":
                        usuario = new UsuarioFinanceiro();
                        break;
                    default:
                        usuario = new UsuarioCadastro();
                }
                usuario.id = data.id;
                usuario.nomeUsuario = data.nome_usuario;
                usuario.senha = data.senha;
                return usuario;
            }
            throw new EntidadeNaoEncontradaException("Usuário não encontrado.");
        } catch (e) {
            PgUtil.checkError(e);
        } finally {
            client.release();
        }
    }

    async salvar(usuario) {
        const client = await pool.connect();
        try {
            let strQuery = "insert into usuarios (nome_usuario, senha, tipo) values ($1, $2, $3) returning id";
            const { rows } = await client.query(strQuery,
                [usuario.nomeUsuario, usuario.senha, UsuarioSuper.USUARIO_SUPER]);
            return rows[0].id;

        } catch (e) {
            PgUtil.checkError(e);

        } finally {
            client.release();
        }

    }
}

module.exports = PsqlUsuarioDAO;