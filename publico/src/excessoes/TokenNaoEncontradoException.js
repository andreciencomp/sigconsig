class TokenNaoEncontradoException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "TOKEN_N_ENCONTRADO_EXCEPTION";
    }
}

module.exports = TokenNaoEncontradoException;