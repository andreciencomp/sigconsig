class ChaveRepetidaException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "CHAVE_REPETIDA_EXCEPTION";
    }
}

module.exports = ChaveRepetidaException;