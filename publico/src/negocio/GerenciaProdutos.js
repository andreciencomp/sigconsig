const FachadaDados = require('../dados/FachadaDados');
const ChaveRepetidaException = require('../excessoes/ChaveRepetidaException');
class GerenciaProdutos{

    async obterProdutoPorID(id){
        const fachada = new FachadaDados();
        return await fachada.obterProdutoPorID(id);
    }

    async cadastrar(produto){
        const fachadaDados = new FachadaDados();
        const existeProduto = await fachadaDados.existeProduto(produto);
        if(existeProduto){
            throw new ChaveRepetidaException("Este produto já foi cadastrado.");
        }
        return fachadaDados.salvarProduto(produto);
    }

    async deletar(id){
        const fachada = new FachadaDados();
        return await fachada.deletarProduto(id);
    }

    async existe(produto){
        const fachadaDados = new FachadaDados();
        return await fachadaDados.existeProduto(produto);
    }
}

module.exports = GerenciaProdutos;