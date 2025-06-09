const FachadaDados = require('../dados/FachadaDados');
const UsuarioAdm = require('../entidades/UsuarioAdm');
const UsuarioFinanceiro = require('../entidades/UsuarioFinanceiro');
const UsuarioCadastro = require('../entidades/UsuarioCadastro');
const DadosInvalidosException = require('../excessoes/DadosInvalidosException');
const SenhaIncorretaException = require('../excessoes/SenhaIncorretaException');
const UsuarioInexistenteException = require('../excessoes/UsuarioInexistenteException');
const bcrypt = require('bcryptjs');

class GerenciaUsuarios {

    async obterUsuarioPorId(id) {
        let fachada = FachadaDados.getInstancia;
        let usuario = await fachada.obterUsuarioPorId(id);
        return usuario;
    }

    async login(nomeUsuario, senha) {
        let fachada = new FachadaDados();
        let usuario = await fachada.obterUsuarioPorNome(nomeUsuario);
        if (await bcrypt.compare(senha, usuario.senha)) {
            usuario.senha = '';
            return usuario;
        }else{
            throw new SenhaIncorretaException("A senha está incorreta");
        }
    }

    async cadastrarUsuario(usuario) {
        let dao = new FachadaDados();
        let senhaCriptografada = await bcrypt.hash(usuario.senha, 10);
        if (usuario.tipo == 'USUARIO_ADMIN') {
            let usuarioAdm = new UsuarioAdm();
            usuarioAdm.nomeUsuario = usuario.nomeUsuario;
            usuarioAdm.senha = senhaCriptografada;
            usuarioAdm.tipo = usuario.tipo;
            return await dao.salvarUsuarioAdmin(usuarioAdm);
        }
        else if (usuario.tipo == 'USUARIO_FINANCEIRO') {
            let usuarioFinanceiro = new UsuarioFinanceiro();
            usuarioFinanceiro.nomeUsuario = usuario.nomeUsuario;
            usuarioFinanceiro.senha = senhaCriptografada;
            usuarioFinanceiro.tipo = usuario.tipo;
            return await dao.salvarUsuarioFinanceiro(usuarioFinanceiro);

        }
        else if (usuario.tipo == 'USUARIO_CADASTRO') {
            let usuarioCadastro = new UsuarioCadastro();
            usuarioCadastro.nomeUsuario = usuario.nomeUsuario;
            usuarioCadastro.senha = senhaCriptografada;
            usuarioCadastro.tipo = usuario.tipo;
            return await dao.salvarUsuarioCadastro(usuarioCadastro);

        } else {
            throw new DadosInvalidosException("Tipo de usuário inválido","tipo");
        }

    }



}

module.exports = GerenciaUsuarios;