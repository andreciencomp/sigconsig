const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");

class DataValidator{
    static validarData(strData, nomeAtributo=null){
        if(new Date(strData).toString() === 'Invalid Date'){
            throw new DadosInvalidosException("Formato de data inválido",nomeAtributo);
        }
        return true;
    }
}

module.exports = DataValidator;