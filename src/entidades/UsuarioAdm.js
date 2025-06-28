const Usuario = require('./Usuario');
class UsuarioAdm extends Usuario{
    
    constructor(id=0,nome_usuario="", senha=""){
        super(id,nome_usuario, senha, Usuario.USUARIO_ADMIN);
    }

}

module.exports = UsuarioAdm;