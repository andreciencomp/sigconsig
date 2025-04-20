const FachadaDados = require("../dados/FachadaDados");

class GerenciaContratos{
    async cadastrar(contrato){
        const fachada = FachadaDados.instancia;
        return await fachada.salvarContrato(contrato);
    }

    async atualizar(contrato){
        const fachada = FachadaDados.instancia;
        return await fachada.atualizarContrato(contrato);
    }
}

module.exports = GerenciaContratos;