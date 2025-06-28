const HeaderNaoEncontradoException = require("../excessoes/HeaderNaoEncontradoException");
const MetodoAuthInvalidoException = require("../excessoes/MetodoAuthInvalidoException");
const TokenNaoEncontradoException = require("../excessoes/TokenNaoEncontradoException");

class HeadersUtil {
    static obterBasicLoginInfo = (request) => {
        if (!request.headers.authorization) {
            throw new HeaderNaoEncontradoException("O header authorization não foi encontrado.");
        }
        const credencial64 = request.headers.authorization.split(' ')[1];
        const credencial = Buffer.from(credencial64, 'base64').toString('ascii');
        const [nomeUsuario, senha] = credencial.split(':');
        return { nomeUsuario, senha };
    }

    static obterBearerToken = (req) => {
        if (!req.headers.authorization) {
            throw new TokenNaoEncontradoException("O Token não foi encontrado.");
        }
        const [tipo, token] = req.headers.authorization.split(' ');
        if (tipo != 'Bearer') {
            throw new MetodoAuthInvalidoException("Método de autorização inválido.");
        }
        return token;
    };
}

module.exports = HeadersUtil