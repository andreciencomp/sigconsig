const Usuario = require("../entidades/Usuario");
const ExceptionUtil = require("../utils/ExceptionUtil");
const FachadaNegocio = require("../negocio/FachadaNegocio");
const UsuarioValidator = require("../validators/UsuarioValidator");
const UsuarioUtil = require("../utils/UsuarioUtil");
const UsuarioNaoAutorizadoException = require("../excessoes/UsuarioNaoAutorizadoException");

class UsuarioController {

    cadastrar = async (req, res) => {
        try {
            const usuario = req.body;
            console.log(usuario.tipo);
            if (usuario.tipo == Usuario.USUARIO_SUPER) {
                throw new DadosInvalidosException("Este tipo de usuário não pode ser cadastrado.");
            }
            if (usuario.tipo == Usuario.USUARIO_ADMIN && UsuarioUtil.usuarioAutenticadoTipo != Usuario.USUARIO_SUPER) {
                throw new UsuarioNaoAutorizadoException("Apenas o usuário SUPER pode realizar esta operação.");
            }
            const fachada = new FachadaNegocio();
            const usuarioId = await fachada.cadastrarUsuario(usuario);
            return res.status(201).send(usuarioId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    atualizarSenha = async (req, res) => {
        try {
            UsuarioValidator.validarAtualizacaoSenha(req.body);
            const fachada = new FachadaNegocio();
            const usuarioId = await fachada.atualizarSenha(req.body);
            return res.status(200).send(usuarioId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }

    }

    listar = async (req, res) =>{
        try{
            const criterios = req.query;
            UsuarioValidator.validarListar(criterios);
            const fachada = new FachadaNegocio();
            const usuarios = await fachada.listarUsuarios(criterios);
            return res.status(200).send(usuarios);

        }catch(e){
            ExceptionUtil.enviarExcessao(e, res);
        }
    }
}

module.exports = UsuarioController;