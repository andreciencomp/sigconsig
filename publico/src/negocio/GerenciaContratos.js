const FachadaDados = require("../dados/FachadaDados");

class GerenciaContratos{
    async cadastrar(contrato){
        const fachada = FachadaDados.instancia;
        return await fachada.salvarContrato(contrato);
    }
}

module.exports = GerenciaContratos;