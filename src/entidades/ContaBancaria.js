class ContaBancaria{
    
    constructor(id=null, banco=null, numAgencia=null, numConta=null, digito=null){
        this.id = id;
        this.banco = banco;
        this.numAgencia = numAgencia;
        this.numConta = numConta;
        this.digito = digito;

    }
}

module.exports = ContaBancaria;