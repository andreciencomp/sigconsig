class UsuarioNaoAutenticadoException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "USUARIO_N_AUTENTICADO_EXCEPTION";
    }
}

module.exports = UsuarioNaoAutenticadoException;