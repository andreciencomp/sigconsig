const Pessoa = require('./Pessoa');

class Corretor extends Pessoa{

    constructor(){
        super();
        this.codigo = 0;
        this.ativo = false;
        this.contaBancaria = null;

    }
}

module.exports = Corretor;