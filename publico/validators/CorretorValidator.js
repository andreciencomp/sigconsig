const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");
const CPFValidator = require("./CPFValidator");
const DataValidator = require("./DataValidator");

class CorretorValidator {
    static validarCadastro(corretor) {
        if (!corretor.codigo) {
            throw new DadosNulosException("O código do corretor não pode ser nulo", "codigo");
        }
        if (isNaN(Number(corretor.codigo))) {
            throw new DadosInvalidosException("O código do corretor tem que ser um número", "codigo");
        }
        if (corretor.cpf) {
            CPFValidator.validar(corretor.cpf, "cpf");
        } else {
            throw new DadosNulosException("O CPF está nulo.", "cpf");
        }

        if (!corretor.nome) {
            throw new DadosNulosException("O nome do corretor não pode ficar em branco", "nome");
        }
        if (corretor.nome.length < 3) {
            throw new DadosInvalidosException("O nome está muito curto", "nome");
        }
        if (corretor.dtNascimento) {
            DataValidator.validar(corretor.dtNascimento, "dtNascimento");
        }
        return true;
    }
}



module.exports = CorretorValidator;