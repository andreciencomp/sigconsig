const FachadaDados = require('../dados/FachadaDados');
const bcrypt = require('bcryptjs');
const UsuarioUtil = require('../utils/UsuarioUtil');
const Usuario = require('../entidades/Usuario');
const UsuarioNaoAutorizadoException = require('../excessoes/UsuarioNaoAutorizadoException');

class UsuarioService {

    async obterUsuarioPorId(id) {
        let fachada = new FachadaDados();
        const usuario = await fachada.obterUsuarioPorId(id);
        return usuario;
    }

    async cadastrarUsuario(usuario) {
        const fachada = new FachadaDados();
        const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);
        usuario.senha = senhaCriptografada;
        return await fachada.salvarUsuario(usuario);
    }

    async atualizarSenha(usuario) {
        const fachada = new FachadaDados();
        if (this.#verificarPermissoes(usuario)) {
            const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);
            return await fachada.atualizarUsuario({ id: usuario.id, senha: senhaCriptografada });
        }
        throw new UsuarioNaoAutorizadoException("O usuário não tem permissão para realizar esta operação.");
    }

    async listarUsuarios(criterios=null){
        const fachada = new FachadaDados();
        if(criterios && Object.keys(criterios).length > 0){
            criterios = {tipo: criterios.tipo};
        }
        const lista = await fachada.listarUsuarios(criterios);
        if(UsuarioUtil.usuarioAutenticadoTipo != Usuario.USUARIO_SUPER){
            const listaFiltrada = lista.filter(usuario =>{
                return usuario.tipo != Usuario.USUARIO_SUPER;
            });
            return listaFiltrada

        }
        return lista;
    }

    async #verificarPermissoes(usuario){
        const fachada = new FachadaDados();
        const usuarioCadastrado = await fachada.obterUsuarioPorId(usuario.id);
        return (UsuarioUtil.usuarioAutenticadoTipo == Usuario.USUARIO_SUPER ||
            (UsuarioUtil.usuarioAutenticadoTipo == Usuario.USUARIO_ADMIN &&
                 usuarioCadastrado.tipo == Usuario.USUARIO_ADMIN && usuarioCadastrado.id == UsuarioUtil.usuarioAutenticadoId) ||
            (UsuarioUtil.usuarioAutenticadoTipo == Usuario.USUARIO_ADMIN &&
                 (usuarioCadastrado.tipo != Usuario.USUARIO_ADMIN && usuarioCadastrado.tipo != Usuario.USUARIO_SUPER)) ||
            UsuarioUtil.usuarioAutenticadoId == usuario.id);
    }
}

module.exports = UsuarioService;