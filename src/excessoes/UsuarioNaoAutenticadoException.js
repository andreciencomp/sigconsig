const APIException = require("./APIException");

class UsuarioNaoAutenticadoException extends APIException{
    constructor(mensagem){
        super(mensagem, 404);
        this.name = "USUARIO_N_AUTENTICADO_EXCEPTION";
    }
}

module.exports = UsuarioNaoAutenticadoException;