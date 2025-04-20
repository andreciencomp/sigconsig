class Endereco{

    constructor(id=null, rua=null, numero=null, bairro=null,
        cep=null, telefone=null, estado=null, cidade=null){
            this.id = id;
            this.rua = rua;
            this.numero = numero;
            this.bairro = bairro;
            this.cep = cep;
            this.telefone = telefone;
            this.estado = estado;
            this.cidade = cidade;
        }
}

module.exports = Endereco;