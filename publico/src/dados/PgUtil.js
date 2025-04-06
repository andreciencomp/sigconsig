const BDException = require("../excessoes/BDException");
const ChaveRepetidaException = require("../excessoes/ChaveRepetidaException");
const DadosNulosException = require("../excessoes/DadosNulosException");

class PgUtil{

    static errorCodes = ['23502','23505']
    

    static isPgError(e){
        for(var i=0;i < PgUtil.errorCodes.length ; i++){
            if(PgUtil.errorCodes[i] == e.code){
                return true;
            }
        }
        return false;
    }

    static checkError(e){

        switch(e.code){

            case '23502':
                throw new DadosNulosException("Possui dados Nulos.");

            case '23505':
                throw new ChaveRepetidaException(e.detail);

            default:
                console.log(e);
                throw new BDException("Erro desconhecido no banco de dados.");
        }
    }
}

module.exports = PgUtil;