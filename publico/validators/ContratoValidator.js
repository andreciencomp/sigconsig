const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");
const ProdutoValidator = require("./ProdutoValidator");
const ClienteValidator = require("./ClienteValidator");
const DataValidator = require("./DataValidator");

class ContratoValidator {
    static validarCadastro(contrato) {
        if (!contrato.produto) {
            throw new DadosNulosException("O produto está nulo", "produto");
        } else if (contrato.produto.id == null) {
            ProdutoValidator.validarCadastro(contrato.produto);
        }

        DataValidator.validarData(contrato.data);

        if (!contrato.cliente) {
            throw new DadosNulosException("O cliente está nulo", "cliente");
        } else {
            ClienteValidator.validarCadastro(contrato.cliente);
        }

        if (!contrato.corretor || !contrato.corretor.id) {
            throw new DadosNulosException("O corretor está nulo.", "corretor");
        }

        if (!contrato.valor) {
            throw new DadosNulosException("O valor do contrato está nulo.", "valor");
        }

        if (contrato.valor <= 0) {
            throw new DadosInvalidosException("O valor tem que ser maior que zero.", "valor");
        }
        return true;

    }

}





module.exports = ContratoValidator;