const APIException = require("./APIException");

class TokenNaoEncontradoException extends APIException{
    constructor(mensagem){
        super(mensagem, 403);
        this.name = "TOKEN_N_ENCONTRADO_EXCEPTION";
    }
}

module.exports = TokenNaoEncontradoException;