const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");
const CPFValidator = require("./CPFValidator");
const DataValidator = require("./DataValidator");

class CorretorValidator {
    static validarCadastro(corretor) {
        this.validarCodigo(corretor);

        this.validarCPF(corretor);

        this.validarNome(corretor);

        if (corretor.dtNascimento) {
            DataValidator.validar(corretor.dtNascimento, "dtNascimento");
        }
        return true;
    }

    static validarAtualizacao(corretor) {
        if (typeof (corretor.codigo) != 'undefined') {
            this.validarCodigo(corretor)
        }

        if (typeof (corretor.cpf) != 'undefined') {
            this.validarCPF(corretor);
        }

        if (typeof (corretor.nome) != 'undefined') {
            this.validarNome(corretor);
        }

        if (typeof (corretor.dtNascimento) != 'undefined') {
            DataValidator.validar(corretor.dtNascimento, "dtNascimento");
        }

    }

    static validarCodigo(corretor) {
        if (!corretor.codigo) {
            throw new DadosNulosException("O código do corretor está nulo", "codigo");
        }

        if (isNaN(Number(corretor.codigo))) {
            throw new DadosInvalidosException("O código do corretor tem que ser um número", "codigo");
        }

        if (corretor.codigo <= 0) {
            throw new DadosInvalidosException("O código do corretor tem que ser maior que zero.", "codigo");
        }
    }

    static validarNome(corretor) {
        if (!corretor.nome) {
            throw new DadosNulosException("O nome do corretor está com valor nulo", "nome");
        }
        if (corretor.nome.length < 3) {
            throw new DadosInvalidosException("O nome está muito curto", "nome");
        }
    }

    static validarCPF(corretor) {
        if (corretor.cpf) {
            CPFValidator.validar(corretor.cpf, "cpf");
        } else {
            throw new DadosNulosException("O CPF está nulo.", "cpf");
        }
    }
}



module.exports = CorretorValidator;