const DadosInvalidosException = require("../excessoes/DadosInvalidosException");
const DadosNulosException = require("../excessoes/DadosNulosException");

class BancoValidator{

    static validarCadastro(campos){
        if (campos.id && campos.id <=0) {
            throw new DadosNulosException("O id do banco é inválido", "id");
        }
        if (!campos.codigo) {
            throw new DadosNulosException("O código está nulo", "codigo");
        }
        if(!campos.nome){
            throw new DadosNulosException("O nome está nulo.");
        }
        if (campos.nome.length < 2) {
            throw new DadosInvalidosException("Nome do banco muito curto", "nome");
        }
        return true;
    }

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