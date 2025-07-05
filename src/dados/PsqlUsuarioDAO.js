const { pool } = require("../helpers/pg_helper");
const UsuarioAdm = require("../entidades/UsuarioAdm");
const UsuarioCadastro = require("../entidades/UsuarioCadastro");
const UsuarioFinanceiro = require("../entidades/UsuarioFinanceiro");
const UsuarioSuper = require("../entidades/UsuarioSuper");
const EntidadeNaoEncontradaException = require("../excessoes/EntidadeNaoEncontrada");
const PgUtil = require("../utils/PgUtil");

class PsqlUsuarioDAO {

    async obter(id) {
        try {
            const { rows } = await pool.query('select * from usuarios where id=$1', [id]);
            if (rows.length === 0) {
                throw new EntidadeNaoEncontradaException("Usuário inexistente.");
            }
            let usuario = null;
            const data = rows[0];
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

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async obterPorNome(nomeUsuario) {
        try {
            const { rows } = await pool.query("select * from usuarios where nome_usuario=$1", [nomeUsuario]);
            if (rows.length === 0) {
                throw new EntidadeNaoEncontradaException("Usuário inexistente.");
            }
            let usuario = null;
            const data = rows[0];
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

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async existeUsuarioPorId(id){
        try{
            const result = await pool.query("select id from usuarios where id=$1",[id]);
            return result.rows.length > 0;

        }catch(e){
            PgUtil.checkError(e);
        }
    }

    async salvar(usuario) {
        try {
            let strQuery = "insert into usuarios (nome_usuario, senha, tipo) values ($1, $2, $3) returning id";
            const { rows } = await pool.query(strQuery,
                [usuario.nomeUsuario, usuario.senha, usuario.tipo]);
            return rows[0];

        } catch (e) {
            PgUtil.checkError(e);
        }
    }

    async atualizar(usuario){
        try{
            const usuarioCadastrado = await this.obter(usuario.id);
            const nomeUsuario = typeof(usuario.nomeUsuario) != 'undefined' ? usuario.nomeUsuario : usuarioCadastrado.nomeUsuario;
            const senha = typeof(usuario.senha) != 'undefined' ? usuario.senha : usuarioCadastrado.senha;
            const tipo = typeof(usuario.tipo) != 'undefined' ? usuario.tipo : usuarioCadastrado.tipo;
            const strQuery = "update usuarios set nome_usuario=$1, senha=$2, tipo=$3 where id=$4 returning id"; 
            const result = await pool.query(strQuery,[nomeUsuario, senha, tipo, usuario.id]);
            return result.rows[0];
            
        }catch(e){
            PgUtil.checkError(e);
        }
    }
}

module.exports = PsqlUsuarioDAO;