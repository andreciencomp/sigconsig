const APIException = require("./APIException");

class UsuarioInexistenteException extends APIException{
    constructor(mensagem){
        super(mensagem, 404);
        this.name = 'USUARIO_INEXISTENTE_EXCEPTION';
    }
}

module.exports = UsuarioInexistenteException;