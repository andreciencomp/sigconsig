const FachadaDados = require("../dados/FachadaDados");

class GerenciaClientes{

    async obterPorId(id){
        const fachadaDados = new FachadaDados();
        return await fachadaDados.obterClientePorId(id);
    }

    async cadastrar(cliente){
        let fachadaDados = FachadaDados.instancia;
        return await fachadaDados.salvarCliente(cliente);
    }
}

module.exports = GerenciaClientes;