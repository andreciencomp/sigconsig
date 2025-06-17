const APIException = require("./APIException");

class DadosNulosException extends APIException{
    constructor(mensagem,atributo=null){
        super(mensagem, 400, atributo);
        this.name = "DADOS_NULOS_EXCEPTION";
    }
}

module.exports = DadosNulosException;