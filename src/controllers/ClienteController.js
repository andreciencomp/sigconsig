const ExceptionUtil = require("../utils/ExceptionUtil");
const FachadaNegocio = require("../negocio/FachadaNegocio");
const ClienteValidator = require("../validators/ClienteValidator");

class ClienteController {

    obterPorId = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const cliente = await fachada.obterClientePorId(req.params.id);
            return res.status(200).send(cliente);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    obterPorCPF = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const cliente = await fachada.obterClientePorCpf(req.params.cpf);
            return res.status(200).send(cliente);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    obterPorNomeLike = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const clientes = await fachada.listarClientesPorNomeLike(req.params.nomeLike);
            return res.status(200).send(clientes);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    cadastrar = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            ClienteValidator.validarCadastro(req.body);
            const clienteId = await fachada.cadastrarCliente(req.body);
            return res.status(201).send(clienteId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    atualizar = async (req, res) => {
        try {
            ClienteValidator.validarAtualizacao(req.body);
            const fachada = new FachadaNegocio();
            const clienteId = await fachada.atualizarCliente(req.body);
            return res.status(200).send(clienteId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }

    deletar = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const clienteId = await fachada.deletarCliente(req.params.id);
            return res.status(200).send(clienteId);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res)
        }
    }

    listar = async (req, res) => {
        try {
            const fachada = new FachadaNegocio();
            const clientes = await fachada.listarClientes();
            return res.status(200).send(clientes);

        } catch (e) {
            ExceptionUtil.enviarExcessao(e, res);
        }
    }
}

module.exports = ClienteController;