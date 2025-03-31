const BDException = require("../excessoes/BDException");
const ChaveRepetidaException = require("../excessoes/ChaveRepetidaException");

class PgUtil{

    static checkError(e){

        switch(e.code){

            case '23505':
                throw new ChaveRepetidaException(e.detail);
            default:
                console.log(e);
                throw new BDException("Erro desconhecido no banco de dados");
        }
    }
}

module.exports = PgUtil;