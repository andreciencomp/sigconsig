const ExceptionService = require("../excessoes/ExceptionService");
const FachadaNegocio = require("../negocio/FachadaNegocio");
const ComissionamentoCorretorValidator = require("../validators/ComissionamentoCorretorValidator");

class ComissionamentoCorretorController {

    cadastrar = async (req, res) => {
        try {
            ComissionamentoCorretorValidator.validarCadastro(req.body);
            const fachada = new FachadaNegocio();
            const idComissionamento = await fachada.cadastrarComissionamentoCorretor(req.body);
            return res.status(201).send(idComissionamento);

        } catch (e) {
            ExceptionService.enviarExcessao(e, res);
        }
    }
}

module.exports = ComissionamentoCorretorController;