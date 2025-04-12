const Pessoa = require('./Pessoa');

class Cliente extends Pessoa{
    constructor(id=null, cpf=null, nome=null, dtNascimento=null, endereco=null){
        super(id, cpf, nome, dtNascimento, endereco);
    }
}
module.exports = Cliente;