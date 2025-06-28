class Pessoa{
    
    constructor(id=null, cpf=null, nome=null, dtNascimento=null, endereco=null){
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.dtNascimento = dtNascimento;
        this.endereco = endereco;
    }
}

module.exports = Pessoa;