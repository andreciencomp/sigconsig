const FachadaDados = require("../dados/FachadaDados");

class GerenciaCorretores{

    async cadastrar(corretor){
        const fachadaDados = FachadaDados.instancia;
        return await fachadaDados.salvarCorretor(corretor);
    }

    async listarTodos(){
        const fachadaDados = FachadaDados.instancia;
        return await fachadaDados.listarTodosCorretores();
    }
    
}

module.exports = GerenciaCorretores;