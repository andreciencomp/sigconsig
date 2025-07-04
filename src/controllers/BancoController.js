const ExceptionUtil = require("../utils/ExceptionUtil");
const FachadaNegocio = require("../negocio/FachadaNegocio");
const BancoValidator = require("../validators/BancoValidator");

class BancoController {
    obterPorCodigo = async (req, res, next) => {
        try {
            const fachada = new FachadaNegocio();
            const banco = await fachada.obterBancoPorCodigo(req.params.codigo);
            return res.status(200).send(banco);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    cadastrar = async (req, res, next) => {
        try {
            BancoValidator.validarCadastro(req.body);
            const fachada = new FachadaNegocio();
            const bancoId = await fachada.cadastrarBanco(req.body);
            res.status(201).send(bancoId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    atualizar = async (req, res) => {
        try {
            BancoValidator.validarAtualizacao(req.body);
            const fachada = new FachadaNegocio();
            const bancoId = await fachada.atualizarBanco(req.body);
            return res.status(200).send(bancoId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    listar = async (req, res, next) => {
        try {
            const fachada = new FachadaNegocio();
            const bancos = await fachada.listarBancos();
            return res.status(200).send(bancos);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);

        }
    }

    deletar = async (req, res) => {
        try {
            const fachadaNegocio = new FachadaNegocio();
            const bancoId = await fachadaNegocio.deletarBanco(req.params.id);
            return res.status(200).send(bancoId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }
}

module.exports = BancoController;