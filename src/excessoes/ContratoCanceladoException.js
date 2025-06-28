const APIException = require("./APIException");

class ContratoCanceladoException extends APIException{
    constructor(mensagem){
        super(mensagem,400);
        this.mensagem = mensagem;
        this.name = "CONTRATO_CANCELADO_EXCEPITON";
    }
}

module.exports = ContratoCanceladoException;