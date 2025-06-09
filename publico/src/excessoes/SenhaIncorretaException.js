const APIException = require("./APIException");

class SenhaIncorretaException extends APIException{
    constructor(mensagem){
        super(mensagem, 403);
        this.name = "SENHA_INCORRETA_EXCEPTION";

    }
}

module.exports = SenhaIncorretaException;