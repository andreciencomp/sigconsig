class HeaderNaoEncontradoException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "HEADER_N_ENCONTRADO_EXCEPTION";
    }
}

module.exports = HeaderNaoEncontradoException;