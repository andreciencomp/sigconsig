const APIException = require("./APIException");

class ContratoNaoLiberadoException extends APIException{
    constructor(mensagem){
        super(mensagem, 400);
        this.name = "CONTRATO_NAO_LIBERADO_EXCEPTION";
    }
}

module.exports = ContratoNaoLiberadoException;