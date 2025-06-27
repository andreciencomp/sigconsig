const FachadaDados = require('../dados/FachadaDados');
const SenhaIncorretaException = require('../excessoes/SenhaIncorretaException');
const bcrypt = require('bcryptjs');

class AuthService {
    async login(nomeUsuario, senha) {
        const fachada = new FachadaDados();
        const usuario = await fachada.obterUsuarioPorNome(nomeUsuario);
        if (await bcrypt.compare(senha, usuario.senha)) {
            usuario.senha = '';
            return usuario;
        } else {
            throw new SenhaIncorretaException("A senha está incorreta");
        }
    }
}

module.exports = AuthService;