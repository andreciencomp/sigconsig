const FachadaDados = require('../dados/FachadaDados');
const SenhaIncorretaException = require('../excessoes/SenhaIncorretaException');
const bcrypt = require('bcryptjs');

class GerenciaUsuarios {

    async obterUsuarioPorId(id) {
        let fachada = new FachadaDados();
        const usuario = await fachada.obterUsuarioPorId(id);
        return usuario;
    }

    async login(nomeUsuario, senha) {
        const fachada = new FachadaDados();
        const usuario = await fachada.obterUsuarioPorNome(nomeUsuario);
        if (await bcrypt.compare(senha, usuario.senha)) {
            usuario.senha = '';
            return usuario;
        }else{
            throw new SenhaIncorretaException("A senha está incorreta");
        }
    }

    async cadastrarUsuario(usuario) {
        const fachada = new FachadaDados();
        const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);
        usuario.senha = senhaCriptografada;
        return await fachada.salvarUsuario(usuario);
    }
}

module.exports = GerenciaUsuarios;