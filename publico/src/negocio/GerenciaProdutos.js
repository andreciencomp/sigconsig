const FachadaDados = require('../dados/FachadaDados');
const ChaveRepetidaException = require('../excessoes/ChaveRepetidaException');
class GerenciaProdutos{
    async cadastrar(produto){
        const fachadaDados = FachadaDados.instancia;
        const existeProduto = await fachadaDados.existeProduto(produto);
        if(existeProduto){
            throw new ChaveRepetidaException("Um produto com este orgão, carência e quantidade de parcelas já foi cadastrado.");
        }
        return fachadaDados.salvarProduto(produto);
    }
}

module.exports = GerenciaProdutos;