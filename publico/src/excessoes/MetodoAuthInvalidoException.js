class MetodoAuthInvalidoException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "METODO_AUTH_INVALIDO_EXCEPTION";
    }
}

module.exports = MetodoAuthInvalidoException;