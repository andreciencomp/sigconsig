const FachadaDados = require('../dados/FachadaDados');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const RestricaoChaveEstrangeiraException = require('../excessoes/RestricaoChaveEstrangeiraException');

class GerenciaEstadosCidades{

    async obterEstadoPorId(id){
        let fachada = FachadaDados.instancia;
        return await fachada.obterEstadoPorId();
    }

    async cadastrarEstado(estado){
        const fachadaDados = new FachadaDados();
        estado.sigla = estado.sigla.toUpperCase();
        return await fachadaDados.salvarEstado(estado);
    }

    async listarEstados(){
        let fachada = FachadaDados.instancia;
        return await fachada.listarEstados();
    }

    async deletarEstado(id){
        const fachada = new FachadaDados();
        const cidades = await fachada.listarCidadesPorEstado(id);
        if(cidades.length != 0){
            throw new RestricaoChaveEstrangeiraException("Há cidades associadas a este estado.");
        }
        return await fachada.deletarEstado(id);
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