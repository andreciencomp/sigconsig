class PagamentoJaCadastradoException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "PAGAMENTO_JA_CADASTRADO_EXCEPTION";
    }
}

module.exports = PagamentoJaCadastradoException;