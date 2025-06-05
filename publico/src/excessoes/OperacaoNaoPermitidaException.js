class OperacaoNaoPermitidaException extends Error{
    constructor(message){
        super(message);
        this.name = "OPERACAO_NAO_PERMITIDA_EXCEPTION";
    }
}

module.exports = OperacaoNaoPermitidaException;