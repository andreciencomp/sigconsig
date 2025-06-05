'use strict'

const jwt = require('jsonwebtoken');
const config = require('../config');
const ExceptionService = require('./ExceptionService');
const UsuarioNaoAutorizadoException = require('../publico/src/excessoes/UsuarioNaoAutorizadoException');
const TokenInvalidoException = require('../publico/src/excessoes/TokenInvalidoException');
const HeaderNaoEncontradoException = require('../publico/src/excessoes/HeaderNaoEncontradoException');
const TokenNaoEncontradoException = require('../publico/src/excessoes/TokenNaoEncontradoException');
const MetodoAuthInvalidoException = require('../publico/src/excessoes/MetodoAuthInvalidoException');

module.exports.gerarToken = (dado) => {
    let token = jwt.sign(dado, process.env.SECURE_KEY, { expiresIn: '1d' });
    return token;
}

module.exports.decodificarToken = async (token) => {
    let dado = null;
    await jwt.verify(token, process.env.SECURE_KEY, async (err, decoded) => {
        if (err) {
            throw new TokenInvalidoException("Token inválido");
        }
        dado = decoded;
    });
    return dado;
}

/*Obtém um objeto de requisição contendo o cabeçalho de autorização
  Basic e retorna um objeto contendo o nome de usuário e senha desse cabeçalho */
module.exports.obterBasicLoginInfo = (request) => {
    if (!request.headers.authorization) {
        throw new HeaderNaoEncontradoException("O header authorization não foi encontrado.");
    }
    let credencial64 = request.headers.authorization.split(' ')[1];
    let credencial = Buffer.from(credencial64, 'base64').toString('ascii');
    const [nomeUsuario, senha] = credencial.split(':');
    return { nomeUsuario, senha };

}


module.exports.criarPayload = (token = null, dados = null, excessao = null, msg = null) => {
    return {
        token: token,
        dados: dados,
        excessao: excessao,
        msg: msg
    }
}

module.exports.obterBearerToken = (req) => {
    if (!req.headers.authorization) {
        throw new TokenNaoEncontradoException("O Token não foi encontrado.");
    }
    let [tipo, token] = req.headers.authorization.split(' ');
    if (tipo != 'Bearer') {
        throw new MetodoAuthInvalidoException("Método de autorização inválido.");
    }
    return token;
};

module.exports.usuarioSuperFiltro = async (req, res, next) => {
    try {
        let token = await this.obterBearerToken(req);
        let dado = await this.decodificarToken(token);

        if (dado.tipo != 'USUARIO_SUPER') {
            throw new UsuarioNaoAutorizadoException("É necessário ser usuário super para realizar esta operação.");
        }
        req.dadosUsuario = dado;
        next();
        return;

    } catch (e) {
        ExceptionService.checkError(e, res);

    }

};

module.exports.usuarioAdminFiltro = async (req, res, next) => {
    try {
        let token = await this.obterBearerToken(req);
        let dado = await this.decodificarToken(token);
        if (dado.tipo == 'USUARIO_ADMIN' || dado.tipo == 'USUARIO_SUPER') {
            req.dadosUsuario = dado;
            next();
            return;
        }
        else {
            throw new UsuarioNaoAutorizadoException("Você não tem autorização para realizar esta operação.");
        }
    } catch (e) {
        ExceptionService.checkError(e, res);
    }

};

module.exports.usuarioFinanceiroFiltro = async (req, res, next) => {
    try {
        let token = await this.obterBearerToken(req);
        let dado = await this.decodificarToken(token);

        if (dado.tipo == 'USUARIO_FINANCEIRO' || dado.tipo == 'USUARIO_SUPER' || dado.tipo == 'USUARIO_ADMIN') {
            req.dadosUsuario = dado;
            next();
            return;
        }
        throw new UsuarioNaoAutorizadoException("Usuário não autorizado.");

    } catch (e) {
        ExceptionService.checkError(e, res);

    }

};

module.exports.usuarioCadastroFiltro = async (req, res, next) => {
    try {
        let token = await this.obterBearerToken(req);
        let dado = await this.decodificarToken(token);

        if (dado.tipo == 'USUARIO_CADASTRO' || dado.tipo == 'USUARIO_ADMIN' ||
            dado.tipo == 'USUARIO_SUPER') {
            req.dadosUsuario = dado;
            next();
            return;
        }
        throw new UsuarioNaoAutorizadoException("Usuário não autorizado.");

    } catch (e) {
        ExceptionService.checkError(e, res);

    }

};

module.exports.usuarioAutenticadoFiltro = async (req, res, next) => {
    try {
        let token = await this.obterBearerToken(req);
        let dado = await this.decodificarToken(token);
        req.dadosUsuario = dado;
        next();
        return;

    } catch (e) {
        ExceptionService.checkError(e, res);

    }

};