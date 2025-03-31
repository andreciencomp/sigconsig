class DadosInvalidosException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "DADOS_INVALIDOS_EXCEPTION";
    }
}

module.exports = DadosInvalidosException;