class Usuario {
    static USUARIO_SUPER = "USUARIO_SUPER";
    static USUARIO_ADMIN = "USUARIO_ADMIN";
    static USUARIO_CADASTRO = "USUARIO_CADASTRO";
    static USUARIO_FINANCEIRO = "USUARIO_FINANCEIRO";

    constructor(id=0,nomeUsuario="", senha="", tipo=""){
        this.id = id;
        this.nomeUsuario = nomeUsuario;
        this.senha = senha;
        this.tipo = tipo;
        
    }
}



module.exports = Usuario;

