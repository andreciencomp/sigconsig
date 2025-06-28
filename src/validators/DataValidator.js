const DadosInvalidosException = require("../excessoes/DadosInvalidosException");

class DataValidator {
    static validar(strData, nomeAtributo = null) {
        let dia = 0;
        let mes = 0;
        let ano = 0;
        const regex1 = /[0-9]{2}-[0-9]{2}-[0-9]{4}/;
        const regex2 = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;

        if (regex1.test(strData)) {
            dia = Number.parseInt(strData.split('-')[0]);
            mes = Number.parseInt(strData.split('-')[1]);
            ano = Number.parseInt(strData.split('-')[2]);

        } else if (regex2.test(strData)) {
            dia = Number.parseInt(strData.split('-')[2]);
            mes = Number.parseInt(strData.split('-')[1]);
            ano = Number.parseInt(strData.split('-')[0]);

        } else {
            throw new DadosInvalidosException("Formato de data inválido", nomeAtributo)
        }
        
        if(dia <=0 || dia >31 ){
            throw new DadosInvalidosException("O dia está fora dos limites.",nomeAtributo);
        }
        if(mes <=0 || mes > 12){
            throw new DadosInvalidosException("O mês está fora dos limites.", nomeAtributo);
        }
        if(ano < 1900 || ano > 2100){
            throw new DadosInvalidosException("O ano está fora dos limites.", nomeAtributo);
        }
        return true;
    }
}

module.exports = DataValidator;