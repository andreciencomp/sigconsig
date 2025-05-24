class RestricaoChaveEstrangeiraException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = 'RESTRICAO_CHAVE_ESTRANGEIRA_EXCEPTION';
    }
}

module.exports = RestricaoChaveEstrangeiraException;