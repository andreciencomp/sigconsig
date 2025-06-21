const FachadaDados = require("../dados/FachadaDados");
const CPFService = require("./CPFService");

class GerenciaCorretores{

    async obterCorretorPorID(id){
        const fachada = new FachadaDados();
        return await fachada.obterCorretorPorId(id);
    }

    async cadastrar(corretor){
        const fachada = new FachadaDados();
        corretor.cpf = CPFService.formatarParaApenasNumeros(corretor.cpf);
        return await fachada.salvarCorretor(corretor, true);
    }

    async listarTodos(){
        const fachadaDados = new FachadaDados();
        return await fachadaDados.listarTodosCorretores();
    }
    
}

module.exports = GerenciaCorretores;