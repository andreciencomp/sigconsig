const APIException = require("./APIException");

class OperacaoNaoPermitidaException extends APIException{
    constructor(message){
        super(message, 401);
        this.name = "OPERACAO_NAO_PERMITIDA_EXCEPTION";
    }
}

module.exports = OperacaoNaoPermitidaException;