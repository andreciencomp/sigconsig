const APIException = require("./APIException");

class EntidadeNaoEncontradaException extends APIException{
    constructor(mensagem, atributo=null){
        super(mensagem, 404,atributo);
        this.name = "ENTIDADE_NAO_ENCONTRADA_EXCEPTION";
    }
}

module.exports = EntidadeNaoEncontradaException;