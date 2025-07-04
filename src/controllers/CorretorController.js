const FachadaNegocio = require("../negocio/FachadaNegocio");
const ExceptionUtil = require("../utils/ExceptionUtil");
const CorretorValidator = require("../validators/CorretorValidator");

class CorretorController {

    obterPorId = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const corretor = await fachada.obterCorretorPorID(req.params.id);
            return res.status(200).send(corretor);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    cadastrar = async (req, res) => {
        const fachada = new FachadaNegocio();
        try {
            CorretorValidator.validarCadastro(req.body);
            const corretorId = await fachada.cadastrarCorretor(req.body);
            return res.status(201).send(corretorId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    atualizar = async (req, res) => {
        const fachada = new FachadaNegocio();
        try {
            CorretorValidator.validarAtualizacao(req.body);
            const corretorId = await fachada.atualizarCorretor(req.body);
            return res.status(200).send(corretorId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    listar = async (req, res) => {
        const fachada = new FachadaNegocio();
        try {
            const corretores = await fachada.listarTodosCorretores();
            return res.status(200).send(corretores);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    deletar = async (req, res) => {
        const fachada = new FachadaNegocio();
        try {
            const corretorId = await fachada.deletarCorretor(req.params.id);
            return res.status(200).send(corretorId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }
}

module.exports = CorretorController;