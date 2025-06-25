const FachadaDados = require("../dados/FachadaDados");

class GerenciaPagamentos{
    async listarTodosPagamentos(){
        const fachada = new FachadaDados();
        return await fachada.listarTodosPagamentos();
    }
}

module.exports = GerenciaPagamentos;