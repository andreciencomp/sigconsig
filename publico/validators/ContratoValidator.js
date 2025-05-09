const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");
const validarProduto = require("./ProdutoValidator");
const validarCliente = require("./ClienteValidator");

function validarContrato(contrato){
    if(!contrato.produto){
        throw new DadosNulosException("O produto está nulo");
    }else if(contrato.produto.id == null){
        validarProduto(contrato.produto);
    }

    if(!contrato.cliente){
        throw new DadosNulosException("O cliente está nulo");
    }else{
        validarCliente(contrato.cliente);
    }

    if(!contrato.produto){
        throw new DadosNulosException("O produto está nulo.");
    }

    if(!contrato.corretor){
        throw new DadosNulosException("O corretor está nulo.");
    }

    if(!contrato.valor){
        throw new DadosNulosException("O valor do contrato está nulo.");
    }

    if(contrato.valor <= 0){
        throw new DadosInvalidosException("O valor tem que ser maior que zero.");
    }

}

module.exports = validarContrato;