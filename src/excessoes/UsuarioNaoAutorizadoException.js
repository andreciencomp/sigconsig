const APIException = require("./APIException");

class UsuarioNaoAutorizadoException extends APIException{
    constructor(mensagem){
        super(mensagem, 401);
        this.name = "USUARIO_N_AUTORIZADO_EXCEPTION";
    }
}

module.exports = UsuarioNaoAutorizadoException;