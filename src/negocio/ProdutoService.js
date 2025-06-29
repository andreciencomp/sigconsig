const FachadaDados = require('../dados/FachadaDados');
const ChaveRepetidaException = require('../excessoes/ChaveRepetidaException');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');

class ProdutoService{

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

    async atualizarProduto(produto){
        const fachada = new FachadaDados();
        if(!(await fachada.existeOrgaoPorID(produto.orgao.id))){
            throw new EntidadeNaoEncontradaException("Orgão não encontrato", "orgao");
        }
        const produtoCadastrado = await fachada.obterProduto(produto);
        if(produtoCadastrado && produtoCadastrado.id != produto.id && await fachada.existeProduto(produto)){
            throw new ChaveRepetidaException("Já existe esse produto");
        }
        return await fachada.atualizarProduto(produto);
    }

    async listarProdutos(criterios=null){
        const fachada = new FachadaDados();
        return await fachada.listarProdutos(criterios);
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

module.exports = ProdutoService;