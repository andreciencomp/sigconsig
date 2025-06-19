const FachadaDados = require('../dados/FachadaDados');
const ChaveRepetidaException = require('../excessoes/ChaveRepetidaException');

class GerenciaOrgaos{

    async obterOrgaoPorID(id){
        const fachada = new FachadaDados();
        return await fachada.obterOrgaoPorID(id);
    }

    async cadastrarOrgao(orgao){
        const fachada = new FachadaDados();
        if(await fachada.existeOrgaoPorSigla(orgao.sigla)){
            throw new ChaveRepetidaException("Já existe um orgão com esta sigla.","sigla");
        }
        if(await fachada.existeOrgaoPorNome(orgao.nome)){
            throw new ChaveRepetidaException("Já existe um orgão com este nome.","nome");
        }
        return await fachada.salvarOrgao(orgao);
    }

    async atualizarOrgao(orgao){
        const fachada = new FachadaDados();
        const orgaoCadastrado = await fachada.obterOrgaoPorID(orgao.id);
        const jaExisteSigla = await fachada.existeOrgaoPorSigla(orgao.sigla);
        const jaExisteNome = await fachada.existeOrgaoPorNome(orgao.nome);
        if(orgaoCadastrado.sigla != orgao.sigla && jaExisteSigla){
            throw new ChaveRepetidaException("Já existe um orgão com esta sigla.","sigla");
        }
        if(orgaoCadastrado.nome != orgao.nome && jaExisteNome){
            throw new ChaveRepetidaException("Já existe um orgão com este nome.","nome");
        }
        return await fachada.atualizarOrgao(orgao);
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