const ExceptionUtil = require("../utils/ExceptionUtil");
const FachadaNegocio = require("../negocio/FachadaNegocio");
const ProdutoValidator = require("../validators/ProdutoValidator");

class ProdutoController {
    obterPorId = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const produto = await fachada.obterProdutoPorID(req.params.id);
            return res.status(200).send(produto);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    cadastrar = async (req, res) => {
        try {
            ProdutoValidator.validarCadastro(req.body);
            const fachada = new FachadaNegocio();
            const produtoId = await fachada.cadastrarProduto(req.body);
            return res.status(201).send(produtoId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    atualizar = async (req, res) => {
        try {
            ProdutoValidator.validarAtualizacao(req.body);
            const fachada = new FachadaNegocio();
            const produtoId = await fachada.atualizarProduto(req.body);
            return res.status(200).send(produtoId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    listar = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const produtos = await fachada.listarProdutos(req.query);
            return res.status(200).send(produtos);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    deletar = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const produtoId = await fachada.deletarProduto(req.params.id);
            return res.status(200).send(produtoId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }
}

module.exports = ProdutoController;