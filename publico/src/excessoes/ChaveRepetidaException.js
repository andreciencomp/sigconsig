const APIException = require("./APIException");

class ChaveRepetidaException extends APIException{
    constructor(mensagem, atributo=null){
        super(mensagem, 400,atributo);
        this.name = "CHAVE_REPETIDA_EXCEPTION";
    }
}

module.exports = ChaveRepetidaException;