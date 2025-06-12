const FachadaDados = require("../dados/FachadaDados");

class GerenciaClientes{

    constructor(){
        this.fachadaDados = new FachadaDados();
    }

    async obterPorId(id){
        const fachadaDados = new FachadaDados();
        return await fachadaDados.obterClientePorId(id);
    }

    async obterPorCpf(cpf){
        return await this.fachadaDados.obterClientePorCpf(cpf);
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
        let fachadaDados = new FachadaDados();
        return await fachadaDados.listarClientesPorNomeLike(nome);
    }

    async deletarCliente(id){
        const fachadaDados = new FachadaDados();
        return await fachadaDados.deletarCliente(id);
    }
}

module.exports = GerenciaClientes;