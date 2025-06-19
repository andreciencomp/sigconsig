const DadosInvalidosException = require("../src/excessoes/DadosInvalidosException");

class CPFValidator{
    static validar(strCPF, nomeAtributo=null){
        if(strCPF.length < 11 ){
            throw new DadosInvalidosException("CPF muito curto","cpf");
        }
        if(strCPF.length > 14){
            throw new DadosInvalidosException("CPF muito longo","cpf");
        }
        const regex1 = /^[0-9]{11}$/;
        const regex2=/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/;
        const cpfValido =  regex1.test(strCPF) || regex2.test(strCPF);
        if(!cpfValido){
            throw new DadosInvalidosException("Formato de CPF inválido",nomeAtributo);
        }
        return true;
        
    }
}

module.exports = CPFValidator;