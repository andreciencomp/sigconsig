const ExceptionUtil = require("../utils/ExceptionUtil");
const FachadaNegocio = require("../negocio/FachadaNegocio");
const EstadoValidator = require("../validators/EstadoValidator");

class EstadoController {

    obterPorId = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const estado = await fachada.obterEstadoPorID(req.params.id);
            return res.status(200).send(estado);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    cadastrar = async (req, res) => {
        try {
            EstadoValidator.validarCadastro(req.body);
            const fachada = new FachadaNegocio();
            const estadoId = await fachada.cadastrarEstado(req.body);
            return res.status(201).send(estadoId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    atualizar = async (req, res) => {
        try {
            EstadoValidator.validarAtualizacao(req.body);
            const fachada = new FachadaNegocio();
            const estadoId = await fachada.atualizarEstado(req.body);
            return res.status(200).send(estadoId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    listar = async function (req, res) {
        try {
            const fachada = new FachadaNegocio();
            const estados = await fachada.listarEstados();
            return res.status(200).send(estados);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    deletar = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const estadoId = await fachada.deletarEstado(req.params.id);
            return res.status(200).send(estadoId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }
}

module.exports = EstadoController;