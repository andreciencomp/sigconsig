class TokenInvalidoException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "TOKEN_INVALIDO_EXCEPTION";
    }
}

module.exports = TokenInvalidoException;