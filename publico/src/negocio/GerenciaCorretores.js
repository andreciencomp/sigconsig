const FachadaDados = require("../dados/FachadaDados");

class GerenciaCorretores{

    async cadastrar(corretor){
        const fachadaDados = FachadaDados.instancia;
        return await fachadaDados.salvarCorretor(corretor);
    }
    
}

module.exports = GerenciaCorretores;