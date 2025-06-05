const FachadaDados = require('../dados/FachadaDados');
const ChaveRepetidaException = require('../excessoes/ChaveRepetidaException');
class GerenciaProdutos{
    async cadastrar(produto){
        const fachadaDados = FachadaDados.instancia;
        const existeProduto = await fachadaDados.existeProduto(produto);
        if(existeProduto){
            throw new ChaveRepetidaException("Este produto já foi cadastrado.");
        }
        return fachadaDados.salvarProduto(produto);
    }

    async existe(produto){
        const fachadaDados = new FachadaDados();
        return await fachadaDados.existeProduto(produto);
    }
}

module.exports = GerenciaProdutos;