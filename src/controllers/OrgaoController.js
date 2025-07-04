const ExceptionUtil = require("../utils/ExceptionUtil");
const FachadaNegocio = require("../negocio/FachadaNegocio");
const OrgaoValidator = require("../validators/OrgaoValidator");

class OrgaoController {
    obterPorId = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const orgao = await fachada.obterOrgaoPorID(req.params.id);
            return res.status(200).send(orgao);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    cadastrar = async (req, res) => {
        try {
            OrgaoValidator.validarCadastro(req.body);
            const fachada = new FachadaNegocio();
            const orgaoId = await fachada.cadastrarOrgao(req.body);
            return res.status(201).send(orgaoId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    atualizar = async (req, res) => {
        try {
            OrgaoValidator.validarAtualizacao(req.body);
            const fachada = new FachadaNegocio();
            const orgaoId = await fachada.atualizarOrgao(req.body);
            return res.status(201).send(orgaoId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    listar = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const orgaos = await fachada.listarOrgaos();
            return res.status(200).send(orgaos);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    deletar = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const orgaoId = await fachada.deletarOrgao(req.params.id);
            return res.status(200).send(orgaoId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }
}

module.exports = OrgaoController