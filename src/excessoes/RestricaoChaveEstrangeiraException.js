const APIException = require("./APIException");

class RestricaoChaveEstrangeiraException extends APIException{
    constructor(mensagem,nomeAtributo=null){
        super(mensagem, 400, nomeAtributo);
        this.name = 'RESTRICAO_CHAVE_ESTRANGEIRA_EXCEPTION';
    }
}

module.exports = RestricaoChaveEstrangeiraException;