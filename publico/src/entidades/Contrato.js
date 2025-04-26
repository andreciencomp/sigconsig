class Contrato{
    
    constructor(id=null, numero=null,produto=null, banco=null, data=null, valor=null, cliente=null,
        endereco=null, dtLiberacao=null,status=null, corretor=null){
            
        this.id = id;
        this.numero = numero;
        this.produto = produto;
        this.banco = banco;
        this.data = data;
        this.valor = valor;
        this.cliente = cliente;
        this.dtLiberacao = dtLiberacao;
        this.endereco = endereco;
        this.status = status;
        this.corretor = corretor;
    }
}

module.exports = Contrato;