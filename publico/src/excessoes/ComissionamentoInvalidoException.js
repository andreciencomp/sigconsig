const APIException = require("./APIException");

class ComissionamentoInvalidoException extends APIException{
    constructor(mensagem){
        super(mensagem,400);
        this.name = "COMISSIONAMENTO_INVALIDO_EXCEPTION";
    }
}

module.exports = ComissionamentoInvalidoException;