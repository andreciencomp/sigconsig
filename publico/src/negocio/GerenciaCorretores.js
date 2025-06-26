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
        return await fachada.salvarCorretor(corretor);
    }

    async atualizarCorretor(corretor){
        const fachada = new FachadaDados();
        return await fachada.atualizarCorretor(corretor);
    }

    async listarTodos(){
        const fachada = new FachadaDados();
        return await fachada.listarTodosCorretores();
    }

    async deletarCorretor(id){
        const fachada = new FachadaDados();
        return await fachada.deletarCorretor(id);
    }
    
}

module.exports = GerenciaCorretores;