const DadosNulosException = require("../excessoes/DadosNulosException");

class CidadeValidator{

    static validarCadastro(cidade){
        if(!cidade){
            throw new DadosNulosException("O objeto cidade está nulo","cidade");
        }
        if(!cidade.nome || cidade.nome.length == 0){
            throw new DadosNulosException("O nome está nulo.","nome");
        }
        if(!cidade.estado || !cidade.estado.id){
            throw new DadosNulosException("O estado está nulo.","estado");
        }
    }
}

module.exports = CidadeValidator;