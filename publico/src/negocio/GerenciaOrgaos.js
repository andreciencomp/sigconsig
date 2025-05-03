const FachadaDados = require('../dados/FachadaDados');
const Orgao = require('../entidades/Orgao');
const ChaveRepetidaException = require('../excessoes/ChaveRepetidaException');
const DadosInvalidosException = require('../excessoes/DadosInvalidosException');

class GerenciaOrgaos{


    async cadastrarOrgao(sigla, nome){
        let orgao = new Orgao();
        orgao.sigla = sigla;
        orgao.nome = nome;
        if(!nome || nome.lenght == 0){
            throw new DadosInvalidosException("O nome não pode ficar vazio.");
        }
        let fachada = FachadaDados.instancia;
        if(await fachada.existeOrgaoPorSigla(sigla) == true){
            throw new ChaveRepetidaException("Já existe um orgão com esta sigla.");
        }
        if(await fachada.existeOrgaoPorNome(nome) == true){
            throw new ChaveRepetidaException("Já existe um orgão com este nome.");
        }
        return await fachada.salvarOrgao(orgao);
    }

    async listarOrgaos(){
        let fachada = FachadaDados.instancia;
        let orgaos = await fachada.listarOrgaos();
        return orgaos;
    }
}

module.exports = GerenciaOrgaos;