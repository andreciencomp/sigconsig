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
        let fachadaDados = FachadaDados.instancia;
        return await fachadaDados.salvarCliente(cliente);
    }

    async listarClientesPorNomeLike(nome){
        let fachadaDados = new FachadaDados();
        return await fachadaDados.listarClientesPorNomeLike(nome);
    }
}

module.exports = GerenciaClientes;