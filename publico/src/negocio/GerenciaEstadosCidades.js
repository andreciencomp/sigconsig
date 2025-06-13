const FachadaDados = require('../dados/FachadaDados');
const ChaveRepetidaException = require('../excessoes/ChaveRepetidaException');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const RestricaoChaveEstrangeiraException = require('../excessoes/RestricaoChaveEstrangeiraException');

class GerenciaEstadosCidades{

    async obterEstadoPorId(id){
        const fachada = new FachadaDados();
        return await fachada.obterEstadoPorId(id);
    }

    async cadastrarEstado(estado){
        const fachadaDados = new FachadaDados();
        estado.sigla = estado.sigla.toUpperCase();
        return await fachadaDados.salvarEstado(estado);
    }

    async listarEstados(){
        const fachada = new FachadaDados();
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
        const fachada = new FachadaDados();
        const cidade = await fachada.obterCidadePorId(id);
        if(!cidade){
            throw new EntidadeNaoEncontradaException("Cidade não encontrada");
        }
        return cidade;
    }

    async cadastrarCidade(cidade){
        const fachada = new FachadaDados();
        const existe = await fachada.existeCidadeNoEstadoPorNome(cidade.nome, cidade.estado.id);
        if(existe){
            throw new ChaveRepetidaException("Já existe uma cidade com este nome para este estado","nome");
        }
        return await fachada.salvarCidade(cidade);
    }

    async listarCidades(){
        const fachada = new FachadaDados();
        const cidades = await fachada.listarCidades();
        return cidades;
    }

    async listarCidadesPorEstado(estado_id){
        const fachada = new FachadaDados();
        const cidades = await fachada.listarCidadesPorEstado(estado_id);
        return cidades;
    }

    async deletarCidade(id){
        const fachada = new FachadaDados();
        return await fachada.deletarCidade(id);
    }
}

module.exports = GerenciaEstadosCidades;