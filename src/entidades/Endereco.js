class Endereco{

    constructor(id=0, rua="", numero=0, bairro="",
        cep="", telefone="", estado=null, cidade=null){
            this.id = 0;
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