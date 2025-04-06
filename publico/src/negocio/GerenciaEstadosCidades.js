const FachadaDados = require('../dados/FachadaDados');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');

class GerenciaEstadosCidades{

    async obterEstadoPorId(id){
        let fachada = FachadaDados.instancia;
        return await fachada.obterEstadoPorId();
    }

    async listarEstados(){
        let fachada = FachadaDados.instancia;
        return await fachada.listarEstados();
    }

    async obterCidadePorId(id){
        let fachada = FachadaDados.instancia;
        let cidade = await fachada.obterCidadePorId(id);
        if(!cidade){
            throw new EntidadeNaoEncontradaException("Entidade não encontrada");
        }
        return cidade;
    }

    async listarCidades(){
        let fachada = FachadaDados.instancia;
        let cidades = await fachada.listarCidades();
        return cidades;
    }

    async listarCidadesPorEstado(estado_id){
        let fachada = FachadaDados.instancia;
        let cidades = await fachada.listarCidadesPorEstado(estado_id);
        return cidades;
    }
    
}



module.exports = GerenciaEstadosCidades;