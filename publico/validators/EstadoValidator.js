const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");

class EstadoValidator{

    static validarCadastro(estado){
        if(!estado){
            throw new DadosNulosException("O objeto estado está nulo.");
        }
        if(!estado.sigla || estado.sigla == ""){
            throw new DadosNulosException("A sigla é obrigatória","sigla");
        }
        if(estado.sigla.length != 2){
            throw new DadosInvalidosException("A sigla tem que ter dois caracteres","sigla");
        }
        if(!estado.nome || estado.nome == ""){
            throw new DadosInvalidosException("O nome é obrigatório","nome");
        }
    }
}

module.exports = EstadoValidator;