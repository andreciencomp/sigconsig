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
            throw new DadosInvalidosException("O nome não pode ficar vazio.","nome");
        }
        let fachada = FachadaDados.instancia;
        if(await fachada.existeOrgaoPorSigla(sigla) == true){
            throw new ChaveRepetidaException("Já existe um orgão com esta sigla.","sigla");
        }
        if(await fachada.existeOrgaoPorNome(nome) == true){
            throw new ChaveRepetidaException("Já existe um orgão com este nome.","nome");
        }
        return await fachada.salvarOrgao(orgao);
    }

    async listarOrgaos(){
        const fachada = new FachadaDados();
        const orgaos = await fachada.listarOrgaos();
        return orgaos;
    }

    async deletarOrgao(id){
        const fachada = new FachadaDados();
        return await fachada.deletarOrgao(id);
    }
}

module.exports = GerenciaOrgaos;