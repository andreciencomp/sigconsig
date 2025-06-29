const ExceptionService = require("../excessoes/ExceptionService");
const FachadaNegocio = require("../negocio/FachadaNegocio");
const CidadeValidator = require("../validators/CidadeValidator");

class CidadeController {
    obterPorId = async function (req, res) {
        try {
            const fachada = new FachadaNegocio();
            const cidadeId = await fachada.obterCidadePorId(req.params.id);
            return res.status(200).send(cidadeId);

        } catch (e) {
            ExceptionService.enviarExcessao(e, res);
        }
    }

    cadastrar = async (req, res) => {
        try {
            CidadeValidator.validarCadastro(req.body);
            const fachada = new FachadaNegocio();
            const cidadeId = await fachada.cadastrarCidade(req.body);
            return res.status(201).send(cidadeId);

        } catch (e) {
            ExceptionService.enviarExcessao(e, res);
        }
    }

    atualizar = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const cidadeId = await fachada.atualizarCidade(req.body);
            return res.status(200).send(cidadeId);
        } catch (e) {
            ExceptionService.enviarExcessao(e, res);
        }
    }

    listar = async function (req, res) {
        try {
            const fachada = new FachadaNegocio();
            const cidades = await fachada.listarCidades();
            return res.status(200).send(cidades);

        } catch (e) {
            ExceptionService.enviarExcessao(e, res);
        }
    }

    listarPorEstado = async function (req, res) {
        try {
            const fachada = new FachadaNegocio();
            const cidades = await fachada.listarCidadesPorEstado(req.params.estado_id);
            return res.status(200).send(cidades);

        } catch (e) {
            ExceptionService.enviarExcessao(e, res);
        }
    }

    deletar = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const cidadeId = await fachada.deletarCidade(req.params.id);
            return res.status(200).send(cidadeId);

        } catch (e) {
            ExceptionService.enviarExcessao(e, res);
        }
    }
}

module.exports = CidadeController;