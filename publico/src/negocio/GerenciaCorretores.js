const FachadaDados = require("../dados/FachadaDados");
const CPFService = require("./CPFService");

class GerenciaCorretores{

    async cadastrar(corretor){
        const fachada = new FachadaDados();
        corretor.cpf = CPFService.formatarParaApenasNumeros(corretor.cpf);
        return await fachada.salvarCorretor(corretor);
    }

    async listarTodos(){
        const fachadaDados = new FachadaDados();
        return await fachadaDados.listarTodosCorretores();
    }
    
}

module.exports = GerenciaCorretores;