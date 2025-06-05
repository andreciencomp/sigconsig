class ContratoNaoLiberadoException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "CONTRATO_NAO_LIBERADO_EXCEPTION";
    }
}

module.exports = ContratoNaoLiberadoException;