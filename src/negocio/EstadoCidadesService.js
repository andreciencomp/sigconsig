const FachadaDados = require('../dados/FachadaDados');
const ChaveRepetidaException = require('../excessoes/ChaveRepetidaException');
const EntidadeNaoEncontradaException = require('../excessoes/EntidadeNaoEncontrada');
const RestricaoChaveEstrangeiraException = require('../excessoes/RestricaoChaveEstrangeiraException');

class EstadosCidadesService{

    async obterEstadoPorId(id){
        const fachada = new FachadaDados();
        return await fachada.obterEstadoPorId(id);
    }

    async cadastrarEstado(estado){
        const fachadaDados = new FachadaDados();
        estado.sigla = estado.sigla.toUpperCase();
        return await fachadaDados.salvarEstado(estado);
    }

    async atualizarEstado(estado){
        const fachada = new FachadaDados();
        const jaExistente = await fachada.existeEstadoPorSigla(estado.sigla);
        const estadoSalvo = await fachada.obterEstadoPorId(estado.id);
        if(estado.sigla != estadoSalvo.sigla && jaExistente){
            throw new ChaveRepetidaException("Este estado já está cadastrado.");
        }
        if(typeof(estado.sigla) != 'undefined'){
            estado.sigla = estado.sigla ? estado.sigla.toUpperCase() : null;
        }
        
        return await fachada.atualizarEstado(estado);

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

    async atualizarCidade(cidade){
        const fachada = new FachadaDados();
        if(!await fachada.existeCidadePorID(cidade.id)){
            throw new EntidadeNaoEncontradaException("Esta cidade não existe.");
        }

        if(typeof(cidade.estado) != 'undefined'){
            const existeNomeCidade = await fachada.existeCidadeNoEstadoPorNome(cidade.nome, cidade.estado.id);
            const cidadeCadastrada = await fachada.obterCidadePorId(cidade.id);
            if(cidade.id != cidadeCadastrada .id && existeNomeCidade){
                throw new ChaveRepetidaException("Já existe uma cidade com este nome para este estado","nome");
            }
        }
        return await fachada.atualizarCidade(cidade);
        
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

module.exports = EstadosCidadesService;