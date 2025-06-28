const DadosInvalidosException = require("../excessoes/DadosInvalidosException");
const DadosNulosException = require("../excessoes/DadosNulosException");

class EstadoValidator{

    static validarCadastro(estado){
        this.validarSigla(estado);
        this.validarNome(estado);
        return true;
    }

    static validarAtualizacao(estado){
        if(!estado.id){
            throw new DadosNulosException("O id não pode ser nulo");
        }
        if(typeof(estado.sigla) != 'undefined'){
            this.validarSigla(estado);
        }
        if(typeof(estado.nome) != 'undefined'){
            this.validarNome(estado);
        }
    }

    static validarSigla(estado){
        if(!estado.sigla || estado.sigla == ""){
            throw new DadosNulosException("A sigla está nula","sigla");
        }
        if(estado.sigla.length != 2){
            throw new DadosInvalidosException("A sigla tem que ter dois caracteres","sigla");
        }
    }

    static validarNome(estado){
        if(!estado.nome || estado.nome == ""){
            throw new DadosInvalidosException("O nome é obrigatório","nome");
        }
        if(estado.nome.length < 3){
            throw new DadosInvalidosException("O nome está muito curto.","nome");
        }
    }
}

module.exports = EstadoValidator;