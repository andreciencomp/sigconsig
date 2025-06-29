const Usuario = require("../entidades/Usuario");
const ExceptionService = require("../excessoes/ExceptionService");
const FachadaNegocio = require("../negocio/FachadaNegocio");
const UsuarioValidator = require("../validators/UsuarioValidator");

class UsuarioController{

    cadastrar = async (req, res) => {
        try {
            const usuario = req.body;
            UsuarioValidator.validarCadastro(usuario);
            if(usuario.tipo == Usuario.USUARIO_SUPER){
                throw new DadosInvalidosException("Este tipo de usuário não pode ser cadastrado.");
            }
            if((usuario.tipo == Usuario.USUARIO_ADMIN && req.dadosUsuario.tipo != Usuario.USUARIO_SUPER)){
                throw new UsuarioNaoAutorizadoException("Apenas o usuário SUPER pode realizar esta operação.");
            }
            const fachada = new FachadaNegocio();
            const usuarioId = await fachada.cadastrarUsuario(usuario);
            return res.status(201).send(usuarioId);

        } catch (e) {
            ExceptionService.enviarExcessao(e, res);
        }
    }
}

module.exports = UsuarioController;