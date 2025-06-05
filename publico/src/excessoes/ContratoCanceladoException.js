class ContratoCanceladoException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.mensagem = mensagem;
        this.name = "CONTRATO_CANCELADO_EXCEPITON";
    }
}

module.exports = ContratoCanceladoException;