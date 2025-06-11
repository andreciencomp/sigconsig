const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");
const validarProduto = require("./ProdutoValidator");
const validarCliente = require("./ClienteValidator");

function validarCadastroContrato(contrato) {
    if (!contrato.produto) {
        throw new DadosNulosException("O produto está nulo", "produto");
    } else if (contrato.produto.id == null) {
        validarProduto(contrato.produto);
    }

    if (!contrato.cliente) {
        throw new DadosNulosException("O cliente está nulo", "cliente");
    } else {
        validarCliente(contrato.cliente);
    }

    if (!contrato.produto) {
        throw new DadosNulosException("O produto está nulo.", "produto");
    }

    if (!contrato.corretor) {
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

function validarAtualizacaoContrato(contrato) {
    if (!contrato.id) {
        throw new DadosNulosException("O ID do contrato é obrigatório", "id");
    }

    if (contrato.cliente) {

        if (!contrato.cliente.id) {
            if (!contrato.cliente.cpf) {
                throw new DadosNulosException("O CPF é obrigatório para a atualização.", "cpf");
            }
            if (!contrato.cliente.cpf.length < 11) {
                throw new DadosInvalidosException("CPF muito curto.");
            }
            
        }
    }
    return true;
}



module.exports = { validarCadastroContrato, validarAtualizacaoContrato };