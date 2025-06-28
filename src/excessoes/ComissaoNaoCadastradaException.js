const APIException = require("./APIException");

class ComissaoNaoCadastradaException extends APIException{
    constructor(mensagem){
        super(mensagem,400);
        this.name="COMISSAO_NAO_CADASTRADA_EXCEPTION";
    }
}

module.exports = ComissaoNaoCadastradaException;