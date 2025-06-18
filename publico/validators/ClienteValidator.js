const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");
const DataValidator = require("./DataValidator");
const CPFValidator = require("./CPFValidator")

class ClienteValidator {
    static validarCadastro(cliente) {
        if (!cliente.nome) {
            throw new DadosNulosException("O nome do cliente está vazio.", "nome");
        }
        if (cliente.nome.length < 2) {
            throw new DadosInvalidosException("O nome está muito curto.", "nome");
        }

        if(cliente.cpf){
            CPFValidator.validar(cliente.cpf);
        }else{
            throw new DadosNulosException("O CPF está nulo.","cpf");
        }

        if (cliente.dtNascimento) {
            DataValidator.validarData(cliente.dtNascimento, "dtNascimento");
        }

        return true;
    }
}

module.exports = ClienteValidator;