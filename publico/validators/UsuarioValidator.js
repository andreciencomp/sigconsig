const Usuario = require("../src/entidades/Usuario");
const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");

function ValidarUsuario(usuario){
    if(!usuario){
        throw new DadosNulosException("O usuário está nulo.");
    }
    if(!usuario.tipo){
        throw new DadosNulosException("O tipo está nulo","tipo");
    }
    if(usuario.tipo != Usuario.USUARIO_SUPER && usuario.tipo != Usuario.USUARIO_ADMIN && usuario.tipo != Usuario.USUARIO_FINANCEIRO && usuario.tipo != Usuario.USUARIO_CADASTRO){
        throw new DadosInvalidosException("Tipo de usuário inválido","tipo");
    }
    if(!usuario.nomeUsuario || usuario.nomeUsuario == ""){
        throw new DadosNulosException("O nome do usuário está nulo", "nomeUsuario");
    }
    if(!usuario.senha || usuario.senha == ""){
        throw new DadosNulosException("A senha do usuário está nula","senha");
    }
}

module.exports = ValidarUsuario;