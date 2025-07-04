const ExceptionUtil = require("../utils/ExceptionUtil");
const FachadaNegocio = require("../negocio/FachadaNegocio");
const ContratoValidator = require("../validators/ContratoValidator");

class ContratoController {

    obterPorId = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const contrato = await fachada.obterContratoPorID(req.params.id);
            return res.status(200).send(contrato);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    cadastrar = async (req, res) => {
        try {
            ContratoValidator.validarCadastro(req.body);
            const fachada = new FachadaNegocio();
            const contratoId = await fachada.cadastrarContrato(req.body);
            return res.status(201).send(contratoId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    atualizar = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const contratoId = await fachada.atualizarContrato(req.body);
            return res.status(200).send(contratoId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    liberar = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const contratoId = await fachada.liberarContrato(req.params.id, req.body.dtLiberacao);
            return res.status(200).send(contratoId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    liberarVarios = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const feedbacks = await fachada.liberarVariosContratos(req.body, req.dadosUsuario.id);
            return res.status(200).send(feedbacks);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    listar = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const contratos = await fachada.listarContratos(req.query);
            return res.status(200).send(contratos);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    deletar = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const contratoId = await fachada.deletarContrato(req.params.id);
            return res.status(200).send(contratoId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }
}

module.exports = ContratoController;