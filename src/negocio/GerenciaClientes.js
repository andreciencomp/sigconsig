const FachadaDados = require("../dados/FachadaDados");
const CPFUtil = require("../utils/CPFUtil");

class GerenciaClientes{

    async obterPorId(id){
        const fachada = new FachadaDados();
        return await fachada.obterClientePorId(id);
    }

    async obterPorCpf(cpf){
        const fachada = new FachadaDados();
        return await fachada.obterClientePorCpf(cpf);
    }

    async cadastrar(cliente){
        const fachadaDados = new FachadaDados();
        cliente.cpf = CPFUtil.formatarParaApenasNumeros(cliente.cpf);
        return await fachadaDados.salvarCliente(cliente);
    }

    async atualizarCliente(cliente){
        const fachada = new FachadaDados();
        cliente.cpf = typeof(cliente.cpf)!= 'undefined' ? CPFUtil.formatarParaApenasNumeros(cliente.cpf) : cliente.cpf;
        return await fachada.atualizarCliente(cliente,true);
    }

    async listarClientes(){
        const fachada = new FachadaDados();
        return await fachada.listarClientes();
    }

    async listarClientesPorNomeLike(nome){
        const fachada = new FachadaDados();
        return await fachada.listarClientesPorNomeLike(nome);
    }

    async deletarCliente(id){
        const fachadaDados = new FachadaDados();
        return await fachadaDados.deletarCliente(id);
    }
}

module.exports = GerenciaClientes;