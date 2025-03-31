class UsuarioNaoAutorizadoException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "USUARIO_N_AUTORIZADO_EXCEPTION";
    }
}

module.exports = UsuarioNaoAutorizadoException;