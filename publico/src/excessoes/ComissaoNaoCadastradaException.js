class ComissaoNaoCadastradaException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name="COMISSAO_NAO_CADASTRADA_EXCEPTION";
    }
}

module.exports = ComissaoNaoCadastradaException;