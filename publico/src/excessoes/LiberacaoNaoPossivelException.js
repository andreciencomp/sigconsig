class LiberacaoNaoPossivelException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "LIBERACAO_NAO_POSSIVEL_EXCEPTION";
    }
}

module.exports = LiberacaoNaoPossivelException;