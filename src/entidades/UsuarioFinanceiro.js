const Usuario = require('./Usuario');

class UsuarioFinanceiro extends Usuario{

    constructor(id=0,nome_usuario="", senha=""){
        super(id,nome_usuario, senha, Usuario.USUARIO_FINANCEIRO);
    }
}

module.exports = UsuarioFinanceiro;