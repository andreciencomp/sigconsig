const FachadaDados = require('../dados/FachadaDados');
const bcrypt = require('bcryptjs');

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
}

module.exports = UsuarioService;