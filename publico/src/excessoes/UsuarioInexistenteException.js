class UsuarioInexistenteException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = 'USUARIO_INEXISTENTE_EXCEPTION';
    }
}

module.exports = UsuarioInexistenteException;