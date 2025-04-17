class ComissionamentoInvalidoException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "COMISSIONAMENTO_INVALIDO_EXCEPTION";
    }
}

module.exports = ComissionamentoInvalidoException;