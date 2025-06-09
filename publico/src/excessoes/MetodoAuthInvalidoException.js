const APIException = require("./APIException");

class MetodoAuthInvalidoException extends APIException{
    constructor(mensagem){
        super(mensagem, 400);
        this.name = "METODO_AUTH_INVALIDO_EXCEPTION";
    }
}

module.exports = MetodoAuthInvalidoException;