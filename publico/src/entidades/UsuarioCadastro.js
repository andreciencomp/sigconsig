const Usuario = require('./Usuario');

class UsuarioCadastro extends Usuario{

    constructor(id=0,nome_usuario='', senha = ''){
        super(id,nome_usuario,senha,Usuario.USUARIO_CADASTRO);
    }
}

module.exports = UsuarioCadastro;