const ChaveRepetidaException = require("../excessoes/ChaveRepetidaException");
const DadosNulosException = require("../excessoes/DadosNulosException");
const RestricaoChaveEstrangeiraException = require("../excessoes/RestricaoChaveEstrangeiraException");

class PgUtil {

    static errorCodes = ['23502', '23505']

    static isPgError(e) {
        for (var i = 0; i < PgUtil.errorCodes.length; i++) {
            if (PgUtil.errorCodes[i] == e.code) {
                return true;
            }
        }
        return false;
    }

    static checkError(e) {
        let nomeAtributo="";
        let valorAtributo="";
        if (e.detail) {
            nomeAtributo = PgUtil.obterNomeAtributo(e.detail);
            valorAtributo = PgUtil.obterValorAtributo(e.detail);
        }
        switch (e.code) {
            case '23502':
                console.log(e);
                throw new DadosNulosException("Possui dados Nulos.",nomeAtributo);
            case '23503':
                throw new RestricaoChaveEstrangeiraException("Restrição de chave estrangeira", nomeAtributo);

            case '23505':
                throw new ChaveRepetidaException(`A chave ${nomeAtributo} = ${valorAtributo} já existe.`, nomeAtributo);

            default:
                throw e;
        }
    }

    static obterNomeAtributo(detail) {
        const regex = /\(.*\)=/;
        detail = detail.match(regex) + "";
        detail = detail.replace('(', '');
        detail = detail.replace(')', '');
        detail = detail.replace('=', '');
        return detail;
    }

    static obterValorAtributo(detail) {
        const regex = /=\(.*\)/;
        detail = detail.match(regex) + "";
        detail = detail.replace('(', '');
        detail = detail.replace(')', '');
        detail = detail.replace('=', '');
        return detail;
    }
}

module.exports = PgUtil;