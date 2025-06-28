class Produto{

    constructor(id=null, qtdParcelas=null,carencia=null,orgao=null){
        this.id = id;
        this.qtdParcelas = qtdParcelas;
        this.carencia = carencia;
        this.orgao = orgao;
    }
}

module.exports = Produto;