const FachadaDados = require("../dados/FachadaDados");

class GerenciaClientes{

    async cadastrar(cliente){
        let fachadaDados = FachadaDados.instancia;
        return await fachadaDados.salvarCliente(cliente);
    }
}

module.exports = GerenciaClientes;