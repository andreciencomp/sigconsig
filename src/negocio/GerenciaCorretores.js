const FachadaDados = require("../dados/FachadaDados");
const CPFUtil = require("../utils/CPFUtil");

class GerenciaCorretores{

    async obterCorretorPorID(id){
        const fachada = new FachadaDados();
        return await fachada.obterCorretorPorId(id);
    }

    async cadastrar(corretor){
        const fachada = new FachadaDados();
        corretor.cpf = CPFUtil.formatarParaApenasNumeros(corretor.cpf);
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