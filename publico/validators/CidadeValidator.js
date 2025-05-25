const DadosNulosException = require("../src/excessoes/DadosNulosException");

class CidadeValidator extends Error{

    static validarCadastro(cidade){
        if(!cidade){
            throw new DadosNulosException("O objeto cidade está nulo");
        }
        if(!cidade.nome || cidade.nome.length == 0){
            throw new DadosNulosException("O nome está nulo.");
        }
        if(!cidade.estado || !cidade.estado.id){
            throw new DadosNulosException("O estado está nulo.");
        }
    }
}

module.exports = CidadeValidator;