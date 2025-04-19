class Contrato{
    
    constructor(id=null, numero=null,produto=null,data=null,cliente=null,
        endereco=null,dtLiberacao=null,status='CADASTRADO', corretor=null){
            
        this.id = id;
        this.numero = numero;
        this.produto = produto;
        this.data = data;
        this.cliente = cliente;
        this.dtLiberacao = dtLiberacao;
        this.endereco = endereco;
        this.status = status;
        this.corretor = corretor;
    }
}

module.exports = Contrato;