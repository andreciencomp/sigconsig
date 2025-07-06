const UsuarioNaoAutorizadoException = require("../excessoes/UsuarioNaoAutorizadoException");
const ExceptionUtil = require("../utils/ExceptionUtil");
const HeadersUtil = require("../utils/HeadersUtil");
const JwtUtil = require("../utils/JwtUtil");
const UsuarioUtil = require("../utils/UsuarioUtil");

class AuthMiddleware {

    static nivelAutenticado = (req, res, next) => {
        try {
            const token = HeadersUtil.obterBearerToken(req);
            const tokenDecodificado = JwtUtil.decodificarToken(token);
            UsuarioUtil.usuarioAutenticadoId = tokenDecodificado.id;
            UsuarioUtil.usuarioAutenticadoTipo = tokenDecodificado.tipo;
            next();
            return;

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);

        }
    }

    static nivelSuper = (req, res, next) => {
        try {
            const token = HeadersUtil.obterBearerToken(req);
            const tokenDecodificado = JwtUtil.decodificarToken(token);

            if (tokenDecodificado.tipo != 'USUARIO_SUPER') {
                throw new UsuarioNaoAutorizadoException("É necessário ser usuário super para realizar esta operação.");
            }
            UsuarioUtil.usuarioAutenticadoId = tokenDecodificado.id;
            UsuarioUtil.usuarioAutenticadoTipo = tokenDecodificado.tipo;
            next();
            return;

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);

        }
    }

    static nivelAdmin = (req, res, next) => {
        try {
            const token = HeadersUtil.obterBearerToken(req);
            const tokenDecodificado = JwtUtil.decodificarToken(token);
            if (tokenDecodificado.tipo == 'USUARIO_ADMIN' || tokenDecodificado.tipo == 'USUARIO_SUPER') {
                UsuarioUtil.usuarioAutenticadoId = tokenDecodificado.id;
                UsuarioUtil.usuarioAutenticadoTipo = tokenDecodificado.tipo;
                next();
                return;
            }
            else {
                throw new UsuarioNaoAutorizadoException("Usuário não autorizado.");
            }

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    static nivelFinanceiro = (req, res, next) => {
        try {
            const token = HeadersUtil.obterBearerToken(req);
            const tokenDecodificado = JwtUtil.decodificarToken(token);

            if (tokenDecodificado.tipo == 'USUARIO_FINANCEIRO' ||
                tokenDecodificado.tipo == 'USUARIO_SUPER' || tokenDecodificado.tipo == 'USUARIO_ADMIN') {
                UsuarioUtil.usuarioAutenticadoId = tokenDecodificado.id;
                UsuarioUtil.usuarioAutenticadoTipo = tokenDecodificado.tipo;
                next();
                return;
            }
            throw new UsuarioNaoAutorizadoException("Usuário não autorizado.");

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);

        }
    }

    static nivelCadastro = (req, res, next) => {
        try {
            const token = HeadersUtil.obterBearerToken(req);
            const tokenDecodificado = JwtUtil.decodificarToken(token);


            if (tokenDecodificado.tipo == 'USUARIO_CADASTRO' || tokenDecodificado.tipo == 'USUARIO_ADMIN' || tokenDecodificado.tipo == 'USUARIO_SUPER') {
                UsuarioUtil.usuarioAutenticadoId = tokenDecodificado.id;
                UsuarioUtil.usuarioAutenticadoTipo = tokenDecodificado.tipo;
                next();
                return;
            }
            throw new UsuarioNaoAutorizadoException("Usuário não autorizado.");

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);

        }
    }
}

module.exports = AuthMiddleware;