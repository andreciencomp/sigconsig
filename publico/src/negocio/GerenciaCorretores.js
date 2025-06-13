const FachadaDados = require("../dados/FachadaDados");

class GerenciaCorretores{

    async cadastrar(corretor){
        const fachada = new FachadaDados();
        return await fachada.salvarCorretor(corretor);
    }

    async listarTodos(){
        const fachadaDados = new FachadaDados();
        return await fachadaDados.listarTodosCorretores();
    }
    
}

module.exports = GerenciaCorretores;