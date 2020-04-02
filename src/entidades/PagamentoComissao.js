class PagamentoComissao{

    constructor(){
        this.id = 0;
        this.valor = 0.0;
        this.efetivado = false;
        this.dtPagamento = null;
        this.contrato = null;
        this.cadastradoPor = null;
        this.efetivadoPor = null;
    }
}

module.exports = PagamentoComissao;