const FachadaDados = require('../dados/FachadaDados');
const Orgao = require('../entidades/Orgao');

class GerenciaOrgaos{


    async cadastrarOrgao(sigla, nome){
        let orgao = new Orgao();
        orgao.sigla = sigla;
        orgao.nome = nome;
        let fachada = FachadaDados.instancia;
        await fachada.salvarOrgao(orgao);

        
    }

}

module.exports = GerenciaOrgaos;