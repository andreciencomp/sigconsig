const APIException = require("./APIException");

class TokenInvalidoException extends APIException{
    constructor(mensagem){
        super(mensagem, 403);
        this.name = "TOKEN_INVALIDO_EXCEPTION";
    }
}

module.exports = TokenInvalidoException;