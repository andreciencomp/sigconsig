const FachadaDados = require('../dados/FachadaDados');

class GerenciaEstadosCidades{

    async obterEstadoPorId(id){
        let fachada = FachadaDados.instancia;
        return await fachada.obterEstadoPorId();

    }

    async listarEstados(){
        let fachada = FachadaDados.instancia;
        return await fachada.listarEstados();
    }
    
}



module.exports = GerenciaEstadosCidades;