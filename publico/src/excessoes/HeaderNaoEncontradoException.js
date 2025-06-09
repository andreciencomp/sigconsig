const APIException = require("./APIException");

class HeaderNaoEncontradoException extends APIException{
    constructor(mensagem){
        super(mensagem, 400);
        this.name = "HEADER_N_ENCONTRADO_EXCEPTION";
    }
}

module.exports = HeaderNaoEncontradoException;