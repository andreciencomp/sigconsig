const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");

class BancoValidator{

    static validarAtualizacao(campos){
        if (!campos.id) {
            throw new DadosNulosException("O id do banco é obrigatório", "id");
        }
        if (typeof (campos.nome) != 'undefined' && campos.nome == null) {
            throw new DadosNulosException("O nome está nulo", "nome");
        }
        if (campos.nome == "" || (campos.nome && campos.nome.length < 2)) {
            throw new DadosInvalidosException("Nome do banco muito curto", "nome");
        }
        return true;
    }
}

module.exports = BancoValidator