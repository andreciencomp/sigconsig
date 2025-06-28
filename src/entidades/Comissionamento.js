class Comissionamento{

    constructor(id=null, produto=null, percentagem=null, banco=null,){
        this.id = id;
        this.produto = produto;
        this.percentagem = percentagem;
        this.banco = banco;
    }
}

module.exports = Comissionamento;