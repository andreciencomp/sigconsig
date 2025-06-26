const FachadaDados = require('../dados/FachadaDados');
const UsuarioAdm = require('../entidades/UsuarioAdm');
const UsuarioFinanceiro = require('../entidades/UsuarioFinanceiro');
const UsuarioCadastro = require('../entidades/UsuarioCadastro');
const DadosInvalidosException = require('../excessoes/DadosInvalidosException');
const SenhaIncorretaException = require('../excessoes/SenhaIncorretaException');
const bcrypt = require('bcryptjs');

class GerenciaUsuarios {

    async obterUsuarioPorId(id) {
        let fachada = new FachadaDados();
        const usuario = await fachada.obterUsuarioPorId(id);
        return usuario;
    }

    async login(nomeUsuario, senha) {
        const fachada = new FachadaDados();
        const usuario = await fachada.obterUsuarioPorNome(nomeUsuario);
        if (await bcrypt.compare(senha, usuario.senha)) {
            usuario.senha = '';
            return usuario;
        }else{
            throw new SenhaIncorretaException("A senha está incorreta");
        }
    }

    async cadastrarUsuario(usuario) {
        const fachada = new FachadaDados();
        const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);
        if (usuario.tipo == 'USUARIO_ADMIN') {
            const usuarioAdm = new UsuarioAdm();
            usuarioAdm.nomeUsuario = usuario.nomeUsuario;
            usuarioAdm.senha = senhaCriptografada;
            usuarioAdm.tipo = usuario.tipo;
            return await fachada.salvarUsuarioAdmin(usuarioAdm);
        }
        else if (usuario.tipo == 'USUARIO_FINANCEIRO') {
            const usuarioFinanceiro = new UsuarioFinanceiro();
            usuarioFinanceiro.nomeUsuario = usuario.nomeUsuario;
            usuarioFinanceiro.senha = senhaCriptografada;
            usuarioFinanceiro.tipo = usuario.tipo;
            return await fachada.salvarUsuarioFinanceiro(usuarioFinanceiro);

        }
        else if (usuario.tipo == 'USUARIO_CADASTRO') {
            const usuarioCadastro = new UsuarioCadastro();
            usuarioCadastro.nomeUsuario = usuario.nomeUsuario;
            usuarioCadastro.senha = senhaCriptografada;
            usuarioCadastro.tipo = usuario.tipo;
            return await fachada.salvarUsuarioCadastro(usuarioCadastro);

        } else {
            throw new DadosInvalidosException("Tipo de usuário inválido","tipo");
        }
    }
}

module.exports = GerenciaUsuarios;