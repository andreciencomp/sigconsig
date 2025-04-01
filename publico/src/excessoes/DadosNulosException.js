class DadosNulosException extends Error{
    constructor(mensagem){
        super(mensagem);
        this.name = "DADOS_NULOS_EXCEPTION";
    }
}

module.exports = DadosNulosException;