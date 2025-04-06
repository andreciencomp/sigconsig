class EntidadeNaoEncontradaException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "ENTIDADE_NAO_ENCONTRADA_EXCEPTION";
    }
}

module.exports = EntidadeNaoEncontradaException;