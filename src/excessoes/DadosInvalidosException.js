const APIException = require("./APIException");

class DadosInvalidosException extends APIException{
    constructor(mensagem,atributo=null){
        super(mensagem, 400,atributo);
        this.name = "DADOS_INVALIDOS_EXCEPTION";
    }
}

module.exports = DadosInvalidosException;