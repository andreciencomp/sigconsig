const ExceptionUtil = require("../utils/ExceptionUtil");
const FachadaNegocio = require("../negocio/FachadaNegocio");
const HeadersUtil = require("../utils/HeadersUtil");
const JwtUtil = require("../utils/JwtUtil");

class AuthController {

    login = async (req, res) => {
        try {
            const infoLogin = HeadersUtil.obterBasicLoginInfo(req);
            const fachada = new FachadaNegocio();
            const usuario = await fachada.login(infoLogin.nomeUsuario, infoLogin.senha);
            const jwtPayload = { id: usuario.id, tipo: usuario.tipo };
            const token = JwtUtil.gerarToken(jwtPayload);
            res.status(200).send({ token: token, usuario: usuario });

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    estaAutenticado = async(req, res)=>{
        try{
            const token = HeadersUtil.obterBearerToken(req);
            JwtUtil.decodificarToken(token);
            return res.status(200).send({autenticado: true});

        }catch(TokenInvalidoException){
            return res.status(403).send({autenticado: false})
        } 
    }
}

module.exports = AuthController;