const FachadaDados = require("../dados/FachadaDados");

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
        return await fachadaDados.salvarCliente(cliente);
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