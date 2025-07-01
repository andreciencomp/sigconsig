const ExceptionService = require("../excessoes/ExceptionService");
const FachadaNegocio = require("../negocio/FachadaNegocio");

class PagamentosComissaoController {

    gerar = async (req, res) => {
        try {
            const fachadaNegocio = new FachadaNegocio();
            const pagamentoId = await fachadaNegocio.gerarPagamentoDeComissao(req.params.contrato_id, req.dadosUsuario.id);
            return res.status(201).send(pagamentoId);
        } catch (e) {
            ExceptionService.enviarExcessao(e, res);
        }
    }

    efetivar = async (req, res)=>{
        try{
            const fachadaNegocio = new FachadaNegocio();
            const pagamentoId = await fachadaNegocio.efetivarPagamento(req.params.id);
            return res.status(201).send(pagamentoId);
            
        }catch(e){
            ExceptionService.enviarExcessao(e, res)
        }
    }

    listar = async (req, res) => {
        try {
            const fachadaNegocio = new FachadaNegocio();
            const pagamentos = await fachadaNegocio.listarTodosPagamentos();
            return res.status(200).send(pagamentos);

        } catch (e) {
            ExceptionService.enviarExcessao(e, res);
        }
    }

    deletar = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const pagamentoId = await fachada.deletarPagamentoComissao(req.params.id);
            return res.status(200).send(pagamentoId);

        } catch (e) {
            ExceptionService.enviarExcessao(e, res);
        }
    }
}

module.exports = PagamentosComissaoController;