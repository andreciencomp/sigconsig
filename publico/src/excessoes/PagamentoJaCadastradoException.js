const APIException = require("./APIException");

class PagamentoJaCadastradoException extends APIException{
    constructor(mensagem){
        super(mensagem, 400);
        this.name = "PAGAMENTO_JA_CADASTRADO_EXCEPTION";
    }
}

module.exports = PagamentoJaCadastradoException;