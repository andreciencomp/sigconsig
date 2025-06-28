const UsuarioNaoAutorizadoException = require("../excessoes/UsuarioNaoAutorizadoException");
const ExceptionService = require("../excessoes/ExceptionService");
const HeadersUtil = require("../utils/HeadersUtil");
const JwtUtil = require("../utils/JwtUtil");

class AuthMiddleware {

    static nivelAutenticado = (req, res, next) => {
        try {
            const token = HeadersUtil.obterBearerToken(req);
            const tokenDecodificado = JwtUtil.decodificarToken(token);
            req.dadosUsuario = tokenDecodificado;
            next();
            return;

        } catch (e) {
            ExceptionService.enviarExcessao(e, res);

        }
    }

    static nivelSuper = (req, res, next) => {
        try {
            const token = HeadersUtil.obterBearerToken(req);
            const tokenDecodificado = JwtUtil.decodificarToken(token);

            if (tokenDecodificado.tipo != 'USUARIO_SUPER') {
                throw new UsuarioNaoAutorizadoException("É necessário ser usuário super para realizar esta operação.");
            }
            req.dadosUsuario = tokenDecodificado;
            next();
            return;

        } catch (e) {
            ExceptionService.enviarExcessao(e, res);

        }
    }

    static nivelAdmin = (req, res, next) => {
        try {
            const token = HeadersUtil.obterBearerToken(req);
            const tokenDecodificado = JwtUtil.decodificarToken(token);
            if (tokenDecodificado.tipo == 'USUARIO_ADMIN' || tokenDecodificado.tipo == 'USUARIO_SUPER') {
                req.dadosUsuario = tokenDecodificado;
                next();
                return;
            }
            else {
                throw new UsuarioNaoAutorizadoException("Usuário não autorizado.");
            }

        } catch (e) {
            ExceptionService.enviarExcessao(e, res);
        }
    }

    static nivelFinanceiro = (req, res, next) => {
        try {
            const token = HeadersUtil.obterBearerToken(req);
            const tokenDecodificado = JwtUtil.decodificarToken(token);

            if (tokenDecodificado.tipo == 'USUARIO_FINANCEIRO' ||
                tokenDecodificado.tipo == 'USUARIO_SUPER' || tokenDecodificado.tipo == 'USUARIO_ADMIN') {
                req.dadosUsuario = tokenDecodificado;
                next();
                return;
            }
            throw new UsuarioNaoAutorizadoException("Usuário não autorizado.");

        } catch (e) {
            ExceptionService.enviarExcessao(e, res);

        }
    }

    static nivelCadastro = (req, res, next) => {
        try {
            const token = HeadersUtil.obterBearerToken(req);
            const tokenDecodificado = JwtUtil.decodificarToken(token);

            if (tokenDecodificado.tipo == 'USUARIO_CADASTRO' || tokenDecodificado.tipo == 'USUARIO_ADMIN' || tokenDecodificado.tipo == 'USUARIO_SUPER') {
                req.dadosUsuario = tokenDecodificado;
                next();
                return;
            }
            throw new UsuarioNaoAutorizadoException("Usuário não autorizado.");

        } catch (e) {
            ExceptionService.enviarExcessao(e, res);

        }
    }
}

module.exports = AuthMiddleware;