class SenhaIncorretaException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "SENHA_INCORRETA_EXCEPTION";
    }
}

module.exports = SenhaIncorretaException;