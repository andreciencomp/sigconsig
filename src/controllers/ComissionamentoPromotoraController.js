const ExceptionService = require("../excessoes/ExceptionService");
const FachadaNegocio = require("../negocio/FachadaNegocio");
const ComissionamentoPromotoraValidator = require("../validators/ComissionamentoPromotoraValidator");

class ComissionamentoPromotoraController {
    obterPorId = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const comissionamento = await fachada.obterComissionamentoPromotoraPorId(req.params.id);
            return res.status(200).send(comissionamento);

        } catch (e) {
            ExceptionService.enviarExcessao(e, res);
        }
    }

    cadastrar = async (req, res) => {
        try {
            ComissionamentoPromotoraValidator.validarCadastro(req.body);
            const fachada = new FachadaNegocio();
            const idComissionamento = await fachada.cadastrarComissionamentoPromotora(req.body);
            return res.status(201).send(idComissionamento);

        } catch (e) {
            ExceptionService.enviarExcessao(e, res);
        }
    }
}

module.exports = ComissionamentoPromotoraController;