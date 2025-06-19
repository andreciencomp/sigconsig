const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");

class OrgaoValidator{
    static validarCadastro(orgao){
        if(!orgao.sigla){
            throw new DadosNulosException("A sigla está nula.","sigla");
        }
        if(orgao.sigla.length < 2 || orgao.sigla.length == 0){
            throw new DadosInvalidosException("A sigla está muito curta");
        }
        if(!orgao.nome || orgao.nome.length == 0){
            throw new DadosNulosException("O nome está nulo.","nome");
        }
        if(orgao.nome.length < 2){
            throw new DadosInvalidosException("O nome está muito curto");
        }
    }
}

module.exports = OrgaoValidator;