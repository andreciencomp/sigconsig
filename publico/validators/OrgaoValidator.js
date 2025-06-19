const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");
const DadosNulosException = require("../src/excessoes/DadosNulosException");

class OrgaoValidator {
    static validarCadastro(orgao) {
        this.validarSigla(orgao);
        this.validarNome(orgao);
        
        return true;
    }

    static validarAtualizacao(orgao) {
        if (typeof (orgao.id) == 'undefined' || orgao.id == null) {
            throw new DadosNulosException("O id é obrigatório", "id");
        }
        if (typeof (orgao.sigla) != 'undefined') {
            this.validarSigla(orgao);
        }
        if (typeof (orgao.nome) != 'undefined') {
            this.validarNome(orgao);
        }
    }

    static validarSigla(orgao) {
        if (!orgao.sigla) {
            throw new DadosNulosException("A sigla está nula.", "sigla");
        }
        if (orgao.sigla.length < 2 || orgao.sigla.length == 0) {
            throw new DadosInvalidosException("A sigla está muito curta");
        }
    }

    static validarNome(orgao) {
        if (!orgao.nome || orgao.nome.length == 0) {
            throw new DadosNulosException("O nome está nulo.", "nome");
        }
        if (orgao.nome.length < 2) {
            throw new DadosInvalidosException("O nome está muito curto");
        }
    }
}

module.exports = OrgaoValidator;