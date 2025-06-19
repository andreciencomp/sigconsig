const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");
const DataValidator = require("./DataValidator");
const CPFValidator = require("./CPFValidator")

class ClienteValidator {
    static validarCadastro(cliente) {
        this.validarNome(cliente);
        
        this.validarCPF(cliente);
        
        if (cliente.dtNascimento) {
            DataValidator.validar(cliente.dtNascimento, "dtNascimento");
        }

        return true;
    }

    static validarAtualizacao(cliente){
        if(typeof(cliente.nome) != 'undefined'){
            this.validarNome(cliente);
        }
        if(typeof(cliente.cpf) != 'undefined'){
            this.validarCPF(cliente);
        }
        if(typeof(cliente.dtNascimento) != 'undefined'){
            DataValidator.validar(cliente.dtNascimento,"dtNascimento");
        }
        return true;
    }

    static validarNome(cliente){
        if (!cliente.nome) {
            throw new DadosNulosException("O nome do cliente está vazio.", "nome");
        }
        if (cliente.nome.length < 2) {
            throw new DadosInvalidosException("O nome está muito curto.", "nome");
        }
    }

    static validarCPF(cliente){
        if(!cliente.cpf){
            throw new DadosNulosException("O CPF está nulo." , "cpf");
        }
        CPFValidator.validar(cliente.cpf);
    }
}

module.exports = ClienteValidator;