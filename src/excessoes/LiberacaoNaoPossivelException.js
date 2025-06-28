const APIException = require("./APIException");

class LiberacaoNaoPossivelException extends APIException{
    constructor(mensagem){
        super(mensagem, 400);
        this.name = "LIBERACAO_NAO_POSSIVEL_EXCEPTION";
    }
}

module.exports = LiberacaoNaoPossivelException;