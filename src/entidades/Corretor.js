const Pessoa = require('./Pessoa');

class Corretor extends Pessoa{

    constructor(id=null, codigo = null, cpf=null, nome=null, dtNascimento=null, endereco=null, contaBancaria=null, ativo=true){
        super(id, cpf, nome, dtNascimento, endereco);
        this.codigo = codigo;
        this.ativo = ativo;
        this.contaBancaria = contaBancaria;
    }
}

module.exports = Corretor;