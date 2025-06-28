const Usuario = require('./Usuario');

class UsuarioSuper extends Usuario{

    constructor(id=0, nome_usuario="", senha=""){
        super(id, nome_usuario, senha, Usuario.USUARIO_SUPER);
    }
}

module.exports = UsuarioSuper;